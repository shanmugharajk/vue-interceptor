import { Repository } from "./repository";
import type { IRedirectUrl } from "./types";

class RedirectUrlsRepository extends Repository<IRedirectUrl> {
  constructor() {
    super("redirectUrls");
  }
}

export const redirectUrlsRepository = new RedirectUrlsRepository();
