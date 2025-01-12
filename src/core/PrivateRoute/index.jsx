import { Navigate } from "react-router-dom";
import { privatePaths, publicPaths } from "config/routes";
import Layout from "components/Layout";

const PrivateRoute = ({ children, setRole }) => {
  // if (!localStorage.getItem("userId")) {
  //   return <Navigate to={publicPaths.login} replace />;
  // }
  return <Navigate to={privatePaths.customer.profile} replace />;

  // return <Layout setRole={setRole}>{children}</Layout>;
};

export default PrivateRoute;
