import { RuleType } from '../storage';

export const ruleTypesMap: { [k in string]: RuleType } = {
  'Url Redirect': RuleType.REDIRECT,
  'Modify Header': RuleType.MODIFY_HEADERS
};

export const getRuleTypesLabelData = () => Object.keys(ruleTypesMap);

export const getRuleLabelTextByType = (ruleType: RuleType) => {
  let val;

  getRuleTypesLabelData().forEach((key: string) => {
    if (ruleTypesMap[key] === ruleType) {
      val = key;
      return;
    }
  });

  return val;
};
