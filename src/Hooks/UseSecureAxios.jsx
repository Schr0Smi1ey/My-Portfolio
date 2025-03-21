import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://schr0smi1ey.vercel.app",
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const UseSecureAxios = () => {
  const { signOutUser, Toast } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          signOutUser()
            .then(() => navigate("/login-karim", { replace: true }))
            .catch((err) => Toast(err.message, "error"));
        }
        return Promise.reject(error);
      }
    );
  });
  return axiosInstance;
};

export default UseSecureAxios;
