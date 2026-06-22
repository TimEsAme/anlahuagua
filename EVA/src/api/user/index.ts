// 用户信息
import request from "@/utils/request";
import type {
  LoginFormData,
  LoginResponseData,
  UserInfoResponseData,
} from "./type";

enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

// 登录
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data);

// 获取用户信息
export const reqUserInfo = (data: any) =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL, data);

// 退出登录
export const reqLogout = (data: any) =>
  request.post<any, any>(API.LOGOUT_URL, data);
