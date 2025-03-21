import axios from "axios";

const CustomAxios = axios.create({
  // baseURL: "https://schr0smi1ey.vercel.app",
  baseURL: "http://localhost:5000",
});
const UseCustomAxios = () => {
  return CustomAxios;
};

export default UseCustomAxios;
