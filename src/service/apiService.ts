import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async get<T>(url: string)  {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "An error occurred.");
    }
  },

  async post<T>(url: string, body: T) {
    try {
      const response = await api.post(url, body);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "An error occurred.");
    }
  },

  async put<T>(url: string, body: T) {
    try {
      const response = await api.put(url, body);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "An error occurred.");
    }
  },

  async delete(url: string, headers = {}) {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "An error occurred.");
    }
  },
};
