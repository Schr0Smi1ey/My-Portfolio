const DEVELOPMENT_API_BASE_URL = "http://localhost:5000";
const PRODUCTION_API_BASE_URL = "https://schr0smi1ey.vercel.app";

const isLoopbackUrl = (value) =>
  /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/i.test(
    value,
  );

export const resolveApiBaseUrl = (env = {}, isProduction = false) => {
  const configured = env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");

  if (configured && !(isProduction && isLoopbackUrl(configured))) {
    return configured;
  }

  return isProduction ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;
};
