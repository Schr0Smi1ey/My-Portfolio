import axios from "axios";
import { API_BASE_URL } from "./constants";

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

export const secureApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const attachSecureInterceptor = (onUnauthorized) => {
  const id = secureApi.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        onUnauthorized();
      }
      return Promise.reject(error);
    },
  );
  return id;
};

export const ejectSecureInterceptor = (id) => {
  secureApi.interceptors.response.eject(id);
};
