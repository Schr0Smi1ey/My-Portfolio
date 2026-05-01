import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast, Flip } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  publicApi,
  secureApi,
  attachSecureInterceptor,
  ejectSecureInterceptor,
} from "../api";
import {
  DEFAULT_PREFERENCES,
  PREFERENCES_KEY,
  THEMES,
  THEME_KEY,
  TOAST_CONFIG,
} from "../constants";
import { syncAuthSession } from "../utils/authSession";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const hexToRgb = (hex) => {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
};

const createCursorIcon = (color) => {
  const svg = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M8 4L24 18L15.5 19.2L12 28L8 4Z" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 8 4`;
};

const readPreferences = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(PREFERENCES_KEY));
    return { ...DEFAULT_PREFERENCES, ...(saved || {}) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || THEMES.LIGHT,
  );
  const [preferences, setPreferences] = useState(readPreferences);
  const interceptorRef = useRef(null);
  const preferencesRef = useRef(preferences);

  const Toast = useCallback((message, type = "info") => {
    const fn = toast[type] ?? toast.info;
    fn(message, {
      ...TOAST_CONFIG,
      transition: Flip,
      toastClassName: "rounded-lg bg-[#f5f5f5] text-black",
      bodyClassName: "font-medium",
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    theme === THEMES.DARK
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", preferences.primaryColor);
    root.style.setProperty(
      "--color-primary-rgb",
      hexToRgb(preferences.primaryColor),
    );
    root.style.setProperty(
      "--cursor-icon",
      createCursorIcon(preferences.primaryColor),
    );
    root.style.setProperty("--site-font-family", preferences.fontFamily);
    root.classList.toggle("reduce-site-motion", preferences.motion === "calm");
    root.classList.toggle("glass-disabled", !preferences.glass);
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    preferencesRef.current = preferences;
  }, [preferences]);

  useEffect(() => {
    let active = true;

    publicApi
      .get("/preferences")
      .then(({ data }) => {
        if (!active || !data?.preferences) return;
        setPreferences({ ...DEFAULT_PREFERENCES, ...data.preferences });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const savePreferences = useCallback((next) => {
    secureApi.put("/preferences", next).catch(() => {
      Toast("Failed to save preferences.", "error");
    });
  }, [Toast]);

  const updatePreferences = useCallback((next) => {
    const merged = { ...preferencesRef.current, ...next };
    preferencesRef.current = merged;
    setPreferences(merged);
    savePreferences(merged);
  }, [savePreferences]);

  const resetPreferences = useCallback(() => {
    preferencesRef.current = DEFAULT_PREFERENCES;
    setPreferences(DEFAULT_PREFERENCES);
    savePreferences(DEFAULT_PREFERENCES);
  }, [savePreferences]);

  useEffect(() => {
    const handleUnauthorized = () => {
      signOut(auth).catch(() => {});
      setUser(null);
      window.location.replace("/login");
    };
    interceptorRef.current = attachSecureInterceptor(handleUnauthorized);
    return () => {
      if (interceptorRef.current !== null) {
        ejectSecureInterceptor(interceptorRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      try {
        await syncAuthSession(firebaseUser, publicApi);
        setUser(firebaseUser ?? null);
      } catch {
        setUser(null);
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  const createUser = async (email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);
    return cred;
  };

  const signInUser = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (!cred.user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }
    setLoading(true);
    try {
      await syncAuthSession(cred.user, publicApi);
      setUser(cred.user);
      setLoading(false);
      return cred;
    } catch (error) {
      setUser(null);
      setLoading(false);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await syncAuthSession(cred.user, publicApi);
      setUser(cred.user);
      setLoading(false);
      return cred;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const updateUserProfile = async (name, photoURL) => {
    await updateProfile(auth.currentUser, { displayName: name, photoURL });
    setUser({ ...auth.currentUser, displayName: name, photoURL });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        theme,
        setTheme,
        toggleTheme,
        preferences,
        updatePreferences,
        resetPreferences,
        Toast,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        resetPassword,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export default AuthProvider;
