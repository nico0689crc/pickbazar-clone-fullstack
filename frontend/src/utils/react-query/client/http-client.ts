import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_HOST_DOMAIN}/api`,
});

export class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    const response = await Axios.get<T>(url, { params, ...config });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, { ...options, ...config });
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data, config);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url, config);
    return response.data;
  }
}
