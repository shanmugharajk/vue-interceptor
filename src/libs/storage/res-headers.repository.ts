import { Repository } from "./repository";
import type { IModifyHeader } from "./types";

class ResHeadersRepository extends Repository<IModifyHeader> {
  constructor() {
    super("resHeaders");
  }
}

export const resHeadersRepository = new ResHeadersRepository();
