import { Rule } from '../storage';

export enum Action {
  SAVE_RULE,
  DELETE_RULE,
  TOGGLE_STATUS
}

export type Message = {
  action: Action;
  data: Rule;
};
