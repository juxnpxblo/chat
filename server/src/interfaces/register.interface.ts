export interface NewUser {
  username: string;
  password: string;
}

export interface CodedObject {
  code: string;
}

export function hasCode(obj: any): obj is CodedObject {
  return obj.code;
}
