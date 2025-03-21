import { createContext, useEffect, useState } from "react";
import UseCustomAxios from "../../Hooks/UseCustomAxios";
import { auth } from "../../API/firebase.init";
import PropTypes from "prop-types";
import { toast, Flip } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);
  const CustomAxios = UseCustomAxios();

  // Toast Helper Function
  const Toast = (message, type = "info") => {
    if (!toast[type]) type = "info";
    toast[type](message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
      toastClassName: "rounded-lg bg-[#f5f5f5] text-black w-96",
      bodyClassName: "font-medium text-lg",
    });
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        setUser(user);
        const currentUser = { email: user.email };
        await CustomAxios.post("/jwt", currentUser, { withCredentials: true });
      } else {
        setUser(null);
        await CustomAxios.post("/logout", {}, { withCredentials: true });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [CustomAxios]);

  const createUser = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    return userCredential;
  };

  const signOutUser = async () => {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!userCredential.user.emailVerified) {
      await signOutUser();
      Toast("Please verify your email before logging in!", "error");
      throw new Error("Email not verified");
    }
    return userCredential;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const resetPassword = async (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserProfile = async (name, photoURL) => {
    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
    setUser({ ...auth.currentUser, displayName: name, photoURL: photoURL });
    setLoading(false);
  };

  const authInfo = {
    user,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
    setUser,
    updateUserProfile,
    loading,
    setLoading,
    Toast,
    resetPassword,
    theme,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
