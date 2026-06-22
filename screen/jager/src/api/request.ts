import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import axios from "axios";
import eventEmitter from "./eventEmitter";
import type { ResultData } from "./interface";

/**
 * 封装 axios 请求类
 */
class Request {
  // axios 实例
  private service: AxiosInstance;

  /**
   * 构造函数
   * @param config axios 初始化配置
   */
  constructor(config: AxiosRequestConfig) {
    /**
     * 创建 axios 实例
     */
    this.service = axios.create(config);

    /**
     * 请求拦截器
     */
    this.service.interceptors.request.use(
      /**
       * 请求成功拦截
       * 在请求发送之前做一些处理
       *
       * 比如：
       * 1. 携带 token
       * 2. 修改请求头
       * 3. 开启 loading
       */
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
        return config;
      },

      /**
       * 请求失败拦截
       */
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /**
     * 响应拦截器
     */
    this.service.interceptors.response.use(
      /**
       * 请求成功
       *
       * Axios 返回的数据结构：
       * {
       *   data,
       *   status,
       *   headers,
       *   config
       * }
       *
       * 这里直接把 data 解构返回
       */
      (res: AxiosResponse) => {
        const { data } = res;

        if (data.code === RequestEnums.LOGINTIMEOUT) {
          eventEmitter.emit("API:SESSION_EXPIRED");
          return Promise.reject(data);
        }
        if (data.code !== RequestEnums.SUCCESS) {
          eventEmitter.emit("API:INVALID");
          return Promise.reject(data);
        }
        return data;
      },

      /**
       * 请求失败
       *
       * 可以统一处理：
       * 1. 401 登录过期
       * 2. 500 服务器错误
       * 3. 网络错误
       */
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );
  }

  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params });
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params });
  }
}

/**
 * 请求状态码枚举
 */
enum RequestEnums {
  TIMEOUT = 10000, // 请求超时时间

  FAIL = 500, // 服务器错误

  INVALID = 400, // 参数错误

  LOGINTIMEOUT = 401, // 登录失效

  SUCCESS = 200, // 请求成功
}

/**
 * axios 默认配置
 */
const config: AxiosRequestConfig = {
  // 接口公共路径
  baseURL: "/api",

  // 请求超时时间
  timeout: RequestEnums.TIMEOUT as number,

  // 跨域时是否携带 cookie
  withCredentials: true,
};

/**
 * 创建请求实例
 */
const request = new Request(config);

/**
 * 导出请求实例
 */
export default request;
