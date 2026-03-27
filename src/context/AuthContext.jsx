import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
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
import { publicApi, attachSecureInterceptor, ejectSecureInterceptor } from "../api";
import { THEMES, THEME_KEY, TOAST_CONFIG } from "../constants";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme]   = useState(() => localStorage.getItem(THEME_KEY) || THEMES.LIGHT);
  const interceptorRef       = useRef(null);

  // ─── Toast helper ─────────────────────────────────────────────────────────
  const Toast = useCallback((message, type = "info") => {
    const fn = toast[type] ?? toast.info;
    fn(message, {
      ...TOAST_CONFIG,
      transition: Flip,
      toastClassName: "rounded-lg bg-[#f5f5f5] text-black",
      bodyClassName: "font-medium",
    });
  }, []);

  // ─── Theme ────────────────────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    theme === THEMES.DARK ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // ─── Attach secure interceptor once ───────────────────────────────────────
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

  // ─── Auth state listener ──────────────────────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setUser(firebaseUser ?? null);
      try {
        if (firebaseUser?.email) {
          await publicApi.post("/jwt", { email: firebaseUser.email }, { withCredentials: true });
        } else {
          await publicApi.post("/logout", {}, { withCredentials: true });
        }
      } catch {
        // JWT endpoint failure — not fatal for UX
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  // ─── Auth methods ─────────────────────────────────────────────────────────
  const createUser = async (email, password) => {
    setLoading(true);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(cred.user);
    return cred;
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (!cred.user.emailVerified) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in.");
    }
    return cred;
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
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
        toggleTheme,
        Toast,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        resetPassword,
        updateUserProfile,
        setLoading,
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
