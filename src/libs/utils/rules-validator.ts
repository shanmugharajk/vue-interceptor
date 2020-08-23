import { isEmpty } from './misc';
import { Redirect, ModifyHeader, RuleType } from '../storage';

const validateRedirectRules = function(rules: Redirect[]) {
  for (const rule of rules) {
    if (!rule.url || !rule.to) {
      return false;
    }
  }

  return true;
};

const validateModifyHeaderRules = function(rules: ModifyHeader[]) {
  for (const rule of rules) {
    if (!rule.url || isEmpty(rule.headers) || !rule.action) {
      return false;
    }
  }

  return true;
};

export const validateRules = function(
  ruleType: RuleType,
  rules?: Redirect[] | ModifyHeader[] | undefined
) {
  if (isEmpty(rules)) {
    return false;
  }

  if (ruleType === RuleType.MODIFY_HEADERS) {
    return validateModifyHeaderRules(rules as ModifyHeader[]);
  }

  return validateRedirectRules(rules as Redirect[]);
};
