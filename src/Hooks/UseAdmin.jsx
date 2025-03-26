import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import UseSecureAxios from "./UseSecureAxios";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";

const useAdmin = () => {
  const secureAxios = UseSecureAxios();
  const { user, loading } = useContext(AuthContext);
  const { data: isAdmin, isFetching: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/isAdmin`, {
        params: { email: user?.email },
      });
      return res.data?.isAdmin;
    },
    enabled: !!user?.email && !loading,
  });

  return [isAdmin ?? false, isAdminLoading || loading];
};

export default useAdmin;
