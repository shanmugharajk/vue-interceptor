export interface RedirectRulesMap {
  [fromUrl: string]: string;
}

export interface ModifyHeaderRulesMap {
  [url: string]: {
    key: string;
    value: string | number;
  };
}
