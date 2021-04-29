import { Repository } from "./repository";
import type { IModifyHeader } from "./types";

class ReqHeadersRepository extends Repository<IModifyHeader> {
  constructor() {
    super("reqHeaders");
  }
}

export const reqHeadersRepository = new ReqHeadersRepository();
