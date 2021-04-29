import Dexie from "dexie";

import type { IRedirectUrl, IModifyHeader } from "./types";

class Db extends Dexie {
  [k: string]: unknown;

  redirectUrls: Dexie.Table<IRedirectUrl, string>;
  reqHeaders: Dexie.Table<IModifyHeader, string>;
  resHeaders: Dexie.Table<IModifyHeader, string>;

  constructor() {
    super("Interceptor");
    this.version(1).stores({
      redirectUrls: "++id",
      reqHeaders: "++id",
      resHeaders: "++id",
    });
    this.redirectUrls = this.table("redirectUrls");
    this.reqHeaders = this.table("reqHeaders");
    this.resHeaders = this.table("resHeaders");
  }
}

export const db = new Db();
