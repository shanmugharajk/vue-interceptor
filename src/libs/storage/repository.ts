import Dexie from "dexie";

import { db } from "./db";

export class Repository<T> {
  constructor(private tableKey: string) {}

  private close() {
    if (db.isOpen()) {
      db.close();
    }
  }

  async save(data: T, key?: string): Promise<void> {
    try {
      await db.open();
      await (db[this.tableKey] as Dexie.Table<T, string>).add(data, key);
    } catch (error) {
      console.error("save", error);
      throw error;
    } finally {
      this.close();
    }
  }

  async upsert(data: T): Promise<void> {
    try {
      await db.open();
      await (db[this.tableKey] as Dexie.Table<T, string>).put(data);
    } catch (error) {
      console.error("upsert", error);
      throw error;
    } finally {
      this.close();
    }
  }

  async fetchAll(): Promise<T[]> {
    try {
      await db.open();
      return await (db[this.tableKey] as Dexie.Table<T, string>).toArray();
    } catch (error) {
      console.error("fetchAll", error);
      return [];
    } finally {
      this.close();
    }
  }

  async fetchById(id: string): Promise<T | undefined> {
    try {
      await db.open();
      return await (db[this.tableKey] as Dexie.Table<T, string>)
        .where("id")
        .equals(id)
        .first();
    } catch (error) {
      console.error("fetchById", error.message);
      throw error;
    } finally {
      this.close();
    }
  }

  async updateById(id: string, changes: T): Promise<number> {
    try {
      await db.open();
      return await (db[this.tableKey] as Dexie.Table<T, string>)
        .where("id")
        .equals(id)
        .modify(changes);
    } catch (error) {
      console.error("updateById", error);
      throw error;
    } finally {
      this.close();
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await db.open();
      return await (db[this.tableKey] as Dexie.Table<T, string>).delete(id);
    } catch (error) {
      console.error("deleteById", error);
      throw error;
    } finally {
      this.close();
    }
  }
}
