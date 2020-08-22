import minimatch from 'minimatch';
import { Rule, RuleType, Redirect } from '@/libs';
import { RedirectRulesMap } from './types';
import { rulesRepository } from '../libs/storage/rules-repository';

class RuleStore {
  allRules: Rule[] = [];
  redirectRulesMap: RedirectRulesMap = {};

  async init() {
    this.allRules = await this.fetchAll();

    this.allRules.forEach(rule => {
      switch (rule.ruleType) {
        case RuleType.REDIRECT:
          this.updateRedirectRuleMap(rule);
          break;

        default:
          break;
      }
    });
  }

  async fetchAll() {
    return await rulesRepository.fetchAll();
  }

  updateRedirectRuleMap(rule: Rule) {
    const rules = rule.rules as Redirect[];

    if (rule.isActive) {
      rules.forEach(redirectRule => {
        this.redirectRulesMap[redirectRule.from] = redirectRule.to;
      });
    } else {
      rules.forEach(redirectRule => {
        delete this.redirectRulesMap[redirectRule.from];
      });
    }
  }

  fetchRedirectUrl(url: string) {
    if (this.redirectRulesMap[url]) {
      this.redirectRulesMap[url];
    }

    for (const fromUrl in this.redirectRulesMap) {
      const toUrl = this.redirectRulesMap[fromUrl];

      if (minimatch(fromUrl, url)) {
        return toUrl;
      }
    }
  }
}

export const ruleStore = new RuleStore();
