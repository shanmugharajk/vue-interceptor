export enum RuleType {
  REDIRECT = 'REDIRECT',
  MODIFY_HEADERS = 'MODIFY_HEADERS'
}

export type Rules = Redirect[] | ModifyHeader[];

export interface Redirect {
  from: string;
  to: string;
}

export interface ModifyHeader {
  url: string;
  key: string;
  value: string | number;
  isRequest: boolean;
}

export interface Rule {
  id: string;
  description?: string;
  ruleType: RuleType;
  ruleTypeLableText: string;
  rules: Rules;
  isActive: boolean;
}
