export interface IUrl {
  from: string;
  to: string;
}

export type HeaderType = "request" | "response";

export interface IHeader {
  type: HeaderType;
  key: string;
  value: string;
}

// == dexie table interfaces ==
export interface IRedirectUrl {
  id: string;
  url: IUrl;
  isActive?: boolean;
}

export interface IModifyHeader {
  id: string;
  header: IHeader;
  isActive?: boolean;
}
