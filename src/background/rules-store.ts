import { Rule } from '@/libs';
import { RedirectRulesMap } from './types';
import { rulesRepository } from '../libs/storage/rules-repository';

class RuleStore {
  allRules: Rule[] = [];
  redirectRules: RedirectRulesMap = {};

  async init() {
    this.allRules = await this.fetchAll();
    this.allRules.forEach(rule => {
      console.log(rule);
    });
  }

  async fetchAll() {
    return await rulesRepository.fetchAll();
  }
}

export const ruleStore = new RuleStore();
