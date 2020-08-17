import { Redirect, ModifyHeader, RuleType } from '../storage';

const validateRedirectRules = function(rules: Redirect[]) {
  for (const rule of rules) {
    if (!rule.from || !rule.to) {
      return false;
    }
  }

  return true;
};

export const validateRules = function(
  ruleType: RuleType,
  rules?: Redirect[] | ModifyHeader[] | undefined
) {
  if (ruleType === RuleType.MODIFY_HEADERS) {
    // TODO: Ignoring for now.
    return true;
  }

  if (!rules || rules.length === 0) {
    return false;
  }

  return validateRedirectRules(rules as Redirect[]);
};
