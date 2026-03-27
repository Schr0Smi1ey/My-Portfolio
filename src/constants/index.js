// ─── API ─────────────────────────────────────────────────────────────────────
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// ─── Cloudinary ───────────────────────────────────────────────────────────────
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET;
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

// ─── Medium ───────────────────────────────────────────────────────────────────
export const MEDIUM_USERNAME = import.meta.env.VITE_MEDIUM_USERNAME;
export const MEDIUM_RSS_URL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

// ─── GitHub ───────────────────────────────────────────────────────────────────
export const GITHUB_USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME || "Schr0Smi1ey";
export const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
export const GITHUB_REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

// ─── Theme ────────────────────────────────────────────────────────────────────
export const THEME_KEY = "portfolio-theme";
export const THEMES = { LIGHT: "light", DARK: "dark" };

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  PROJECT_DETAILS: "/projects/:id",
  BLOGS: "/blogs",
  DISCUSS: "/discuss",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  DASHBOARD_MESSAGES: "/dashboard/messages",
  DASHBOARD_ADD_PROJECT: "/dashboard/add-project",
  DASHBOARD_STATUS: "/dashboard/status",
};

// ─── Social links ─────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  linkedin: "https://www.linkedin.com/in/sarafat-karim",
  facebook: "https://www.facebook.com/share/19zK3X1Ro6/",
  twitter: "https://twitter.com/sarafat_karim",
};

// ─── Personal info ────────────────────────────────────────────────────────────
export const OWNER = {
  name: "Sarafat Karim",
  handle: "Schr0Smi1ey",
  email: "Sarafatkarim555@gmail.com",
  phone: "+880 1719-430433",
  whatsapp: "https://wa.me/8801719430433",
  resumeUrl: "/Data/Sarafat-Resume.pdf",
  title: "Junior Full-Stack Developer",
  github: GITHUB_USERNAME,
};

// ─── Nav items ────────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Blogs", path: "/blogs" },
  { label: "Discuss", path: "/discuss" },
];

// ─── File upload constraints ──────────────────────────────────────────────────
export const MAX_FILE_SIZE_MB = 20;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = "image/*,application/pdf";

// ─── Toast config ─────────────────────────────────────────────────────────────
export const TOAST_CONFIG = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

// ─── Availability status options ─────────────────────────────────────────────
export const STATUS_OPTIONS = [
  { value: "available", label: "Available for hire", color: "green" },
  { value: "open", label: "Open to offers", color: "blue" },
  { value: "busy", label: "Currently busy", color: "yellow" },
  { value: "unavailable", label: "Not available", color: "red" },
];

// ─── Project filter tech options ──────────────────────────────────────────────
export const TECH_FILTERS = [
  "All",
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Firebase",
  "Tailwind CSS",
  "TypeScript",
];
