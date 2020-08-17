import Dexie from 'dexie';

class Db extends Dexie {
  [k: string]: unknown;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules: Dexie.Table<any, string>;

  constructor() {
    super('Intercept');
    this.version(1).stores({
      rules: '++id, type'
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.rules = this.table('rules');
  }
}

export const db = new Db();
