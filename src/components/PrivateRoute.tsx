import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return true ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
