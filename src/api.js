import axios from "axios";
import { API_BASE_URL } from "./constants";

// ─── Public instance (no credentials) ────────────────────────────────────────
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

// ─── Secure instance (JWT cookie) ────────────────────────────────────────────
export const secureApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach the 401/403 response interceptor once.
 * Call this from AuthProvider after signOutUser is available.
 * Returns the interceptor ID so it can be ejected if needed.
 */
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
