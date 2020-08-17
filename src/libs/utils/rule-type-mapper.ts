import { RuleType } from '../storage';

export const ruleTypesMap: { [k in string]: RuleType } = {
  'Url Redirect': RuleType.REDIRECT,
  'Modify Header': RuleType.MODIFY_HEADERS
};

export const getRuleTypes = () => Object.keys(ruleTypesMap);
