import React from "react";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { publicPaths, privatePaths } from "config/routes";
import PrivateRoute from "core/PrivateRoute";
import PublicRoute from "core/PublicRoute";
import LinearProgress from "@mui/material/LinearProgress";
import Layout from "components/Layout";
import SignupPage from "pages/SignUpPage";

const LoginPage = lazy(() => import("pages/LoginPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const ProductListPage = lazy(() => import("pages/ProductListing"));
const ProductDetailPage = lazy(() => import("pages/ProductDetails"));

const publicRoutes = [
  {
    path: publicPaths.login,
    Component: <LoginPage open={true} handleClose={() => {}} />,
  },
  {
    path: publicPaths.home,
    Component: <HomePage />,
  },
  {
    path: publicPaths.productList,
    Component: <ProductListPage />,
  },
  {
    path: publicPaths.productDetail,
    Component: <ProductDetailPage />,
  },
  {
    path: publicPaths.signUp,
    Component: <SignupPage open={true} handleClose={() => {}} />,
  },
];

const privateRoutes = [];

const App = () => {
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PublicRoute>{route.Component}</PublicRoute>}
            />
          ))}

          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  {route.Component}
                </PrivateRoute>
              }
            />
          ))}

          <Route
            path="*"
            element={<Navigate to={publicPaths.home} replace />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default observer(App);
