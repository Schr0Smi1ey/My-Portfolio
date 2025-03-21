import { useContext } from "react";
import PropTypes from "prop-types";
import { PuffLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  console.log(loading);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PuffLoader color="#198068" size={50} />
      </div>
    );
  }

  console.log(user);
  if (user) {
    return children;
  }
  return (
    <Navigate to="/login-karim" replace state={{ from: location.pathname }} />
  );
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
