import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "app/providers/store";

import { Loader } from "shared/ui/loader";

export const Protected = ({ allowedRoles }) => {
  const location = useLocation();
  const { user_data } = useAppSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let uid = JSON.parse(window.localStorage.getItem("UID")) || "";
    let logged_in = JSON.parse(window.localStorage.getItem("LOGGED_IN")) || "";
    let { token } = JSON.parse(window.localStorage.getItem("USER_AUTH")) || {};
    
    if (token && uid && logged_in) {
      try {
        let tokenExpiration = jwtDecode(token).exp;
        let dateNow = Math.floor(new Date().getTime() / 1000);

        if (tokenExpiration < dateNow) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [user_data]);

  if (isAuthenticated === null) return <Loader />;

  if (isAuthenticated && user_data.username) {
    if (user_data?.roles?.find((role) => allowedRoles?.includes(role))) {
      return <Outlet />;
    } else {
      return <Navigate to={"/404"} state={{ from: location }} />;
    }
  } else if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return <Loader />;
};
