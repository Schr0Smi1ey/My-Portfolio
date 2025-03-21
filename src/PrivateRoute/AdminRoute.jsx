import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useAdmin from "../Hooks/useAdmin";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#198068" size={50} />
      </div>
    );
  }
  console.log("AdminRoute children:", children);
  console.log("User:", user);
  console.log("isAdmin:", isAdmin);

  if (user && isAdmin) {
    return children ? children : <Navigate to="/" />;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
