// // 请求参数

export interface LoginFormData {
  username: string;
  password: string;
}

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export type TokenType = {
  token: string;
};

export interface LoginResponseData extends ResponseData {
  data: TokenType;
}

export interface UserInfoResponseData extends ResponseData {
  data: {
    avatar: string;
    username: string;
    buttons: string[];
    roles: string[];
    routes: string[];
    button: string[];
  };
}
