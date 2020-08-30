import minimatch from 'minimatch';
import { ModifyHeader, Redirect, Rule, RuleType } from '@/libs';

import { rulesRepository } from '../libs/storage/rules-repository';

type RedirectMap = Record<string, string>;

type HeadersMap = Record<string, Omit<ModifyHeader, 'url'>>;

class RulesStore {
  allRules: Rule[] = [];
  redirect: RedirectMap = {};
  reqHeaders: HeadersMap = {};
  resHeaders: HeadersMap = {};

  async init() {
    this.allRules = await rulesRepository.fetchAll();
    this.allRules.forEach(this.updateRule);
  }

  fetchRedirect(url: string) {
    if (this.redirect[url]) {
      this.redirect[url];
    }

    for (const key in this.redirect) {
      const val = this.redirect[key];

      if (minimatch(key, url)) {
        return val;
      }
    }
  }

  fetchHeader(url: string, isRequest = true) {
    const lookUp = isRequest ? this.reqHeaders : this.resHeaders;

    if (lookUp[url]) {
      lookUp[url];
    }

    for (const key in lookUp) {
      const val = lookUp[key];

      if (minimatch(key, url)) {
        return val;
      }
    }
  }

  updateRule = (ruleGroup: Rule) => {
    const { isActive, ruleType, rules } = ruleGroup;

    if (isActive) {
      rules.forEach((rule: Redirect | ModifyHeader) => {
        this.updateStore(ruleType, rule);
      });
    } else {
      rules.forEach((rule: Redirect | ModifyHeader) => {
        this.deleteStore(ruleType, rule);
      });
    }
  };

  private updateStore = (ruleType: RuleType, rule: Redirect | ModifyHeader) => {
    const { url, ...rest } = rule;

    switch (ruleType) {
      case RuleType.REDIRECT:
        this.redirect[url] = (rest as Redirect).to;
        break;

      case RuleType.MODIFY_HEADERS:
        if ((rest as ModifyHeader).isRequest) {
          this.reqHeaders[url] = rest as ModifyHeader;
        } else {
          this.resHeaders[url] = rest as ModifyHeader;
        }
        break;

      default:
        break;
    }
  };

  private deleteStore = (ruleType: RuleType, rule: Redirect | ModifyHeader) => {
    const { url, ...rest } = rule;

    switch (ruleType) {
      case RuleType.REDIRECT:
        delete this.redirect[url];
        break;

      case RuleType.MODIFY_HEADERS:
        if ((rest as ModifyHeader).isRequest) {
          delete this.reqHeaders[url];
        } else {
          delete this.resHeaders[url];
        }
        break;

      default:
        break;
    }
  };
}

export const rulesStore = new RulesStore();
