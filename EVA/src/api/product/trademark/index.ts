import request from "@/utils/request";
import type { Trademark, TrademarkResponseData } from "./type";

// import type {
//   LoginFormData,
//   LoginResponseData,
//   UserInfoResponseData,
// } from "./type";

enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  SAVETRADEMARK_URL = "/admin/cdoprtu/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
}

// 分页数据
export const getBaseTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  );

//   添加和修改
export const addorupdateTrademark = (data: Trademark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    return request.post<any, any>(API.SAVETRADEMARK_URL, data);
  }
};
