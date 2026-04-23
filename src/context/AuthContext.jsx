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
  attachSecureInterceptor,
  ejectSecureInterceptor,
} from "../api";
import { THEMES, THEME_KEY, TOAST_CONFIG } from "../constants";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || THEMES.LIGHT,
  );
  const interceptorRef = useRef(null);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const Toast = useCallback((message, type = "info") => {
    const fn = toast[type] ?? toast.info;
    fn(message, {
      ...TOAST_CONFIG,
      transition: Flip,
      toastClassName: "rounded-lg bg-[#f5f5f5] text-black",
      bodyClassName: "font-medium",
    });
  }, []);

  // ── Theme ──────────────────────────────────────────────────────────────────
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

  // ── Secure interceptor (registered once) ──────────────────────────────────
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

  // ── Auth state listener ────────────────────────────────────────────────────
  // THE FIX: await the /jwt call BEFORE calling setLoading(false).
  //
  // Previous code fired /jwt without awaiting it, then immediately called
  // setLoading(false). PrivateRoute would evaluate, useAdmin would fire
  // GET /isAdmin, but the cookie didn't exist yet → 401 → interceptor
  // → window.location.replace("/login") → the "bounce" bug.
  //
  // Now the sequence is guaranteed:
  //   1. setUser(firebaseUser)         — user state is correct
  //   2. await POST /jwt               — cookie is written
  //   3. setLoading(false)             — only NOW routes can evaluate
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      // Step 1 — sync user immediately so the rest of the app has it
      setUser(firebaseUser ?? null);

      // Step 2 — write / clear JWT cookie and WAIT for it
      try {
        if (firebaseUser?.email) {
          const idToken = await firebaseUser.getIdToken();
          await publicApi.post(
            "/jwt",
            { idToken },
            { withCredentials: true },
          );
        } else {
          await publicApi.post("/logout", {}, { withCredentials: true });
        }
      } catch {
        // JWT failure is non-fatal for UX — cookie may already exist
        // (e.g. page refresh with valid existing cookie)
      }

      // Step 3 — auth is fully resolved, routes may now evaluate
      setLoading(false);
    });

    return unsub;
  }, []);

  // ── Auth methods ───────────────────────────────────────────────────────────
  // IMPORTANT: none of these touch `loading`.
  // loading is owned entirely by onAuthStateChanged above.
  // The listener fires automatically after every sign-in / sign-out.

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
    return cred;
  };

  // No setTimeout, no browserPopupRedirectResolver hack, no redirect fallback.
  // signInWithPopup resolves → onAuthStateChanged fires → JWT awaited → done.
  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const signOutUser = async () => {
    await signOut(auth);
    // onAuthStateChanged fires automatically and clears user + cookie
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
