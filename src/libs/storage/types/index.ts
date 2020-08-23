export enum RuleType {
  REDIRECT = 'REDIRECT',
  MODIFY_HEADERS = 'MODIFY_HEADERS'
}

export type Rules = Redirect[] | ModifyHeader[];

export interface Redirect {
  url: string;
  to: string;
}

export type HeaderValues = { [key: string]: string | undefined };

export type HeaderAction = 'add' | 'update' | 'remove';

export interface ModifyHeader {
  headers: HeaderValues;
  action: HeaderAction;
  isRequest: boolean;
  url: string;
}

export interface Rule {
  id: string;
  description?: string;
  ruleType: RuleType;
  ruleTypeLableText: string;
  rules: Rules;
  isActive: boolean;
}
