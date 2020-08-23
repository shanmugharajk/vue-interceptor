import minimatch from 'minimatch';
import { ModifyHeader, Redirect, Rule, RuleType } from '@/libs';

import { rulesRepository } from '../libs/storage/rules-repository';

interface RulesMap {
  [url: string]: string | Omit<ModifyHeader, 'url'>;
}

class RulesStore {
  allRules: Rule[] = [];
  rulesMap: RulesMap = {};

  async init() {
    this.allRules = await rulesRepository.fetchAll();
    this.allRules.forEach(this.updateRule);
  }

  fetchRule<T extends string | ModifyHeader>(url: string) {
    if (this.rulesMap[url]) {
      this.rulesMap[url];
    }

    for (const key in this.rulesMap) {
      const val = this.rulesMap[key];

      if (minimatch(key, url)) {
        return val as T;
      }
    }
  }

  updateRule(ruleGroup: Rule) {
    const { isActive, ruleType, rules } = ruleGroup;

    if (isActive) {
      rules.forEach(({ url, ...rest }: Redirect | ModifyHeader) => {
        this.rulesMap[url] =
          ruleType === RuleType.REDIRECT
            ? (rest as Redirect).to
            : { ...(rest as ModifyHeader) };
      });
    } else {
      rules.forEach((rule: Redirect | ModifyHeader) => {
        delete this.rulesMap[rule.url];
      });
    }
  }
}

export const rulesStore = new RulesStore();
