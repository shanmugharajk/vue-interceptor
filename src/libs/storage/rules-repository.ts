import { Repository } from './repository';
import { Rule } from './types';

class RulesRepository extends Repository<Rule> {
  constructor() {
    super('rules');
  }
}

export const rulesRepository = new RulesRepository();
