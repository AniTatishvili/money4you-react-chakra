import React from "react";

import { useDispatch } from "react-redux";
import { saveUserDataInGlobalState } from "./providers/store/slices/authSlice";

import { useLocation } from "react-router-dom";
import { RouterConfig } from "./routes/RouterConfig";

import { Loader } from "shared/ui/loader";

import { useGetLaravelUserDataMutation } from "./providers/store/api/profile";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [getUserData, { isLoading, isError }] = useGetLaravelUserDataMutation();

  const auth = window !== undefined ? JSON.parse(window.localStorage.getItem("USER_AUTH")) : null;
  const uid = window !== undefined ? JSON.parse(window.localStorage.getItem("UID")) : null;
  const logged_in = window !== undefined ? JSON.parse(window.localStorage.getItem("UID")) : null;

  const getUserProfileData = async () => {
    if (auth || uid || logged_in) {
      await getUserData()
        .unwrap()
        .then((res) => {
          if (!res.success || isError) {
            JSON.stringify(window.localStorage.setItem("LOGGED_IN", false));
            window.localStorage.removeItem("UID");
            window.localStorage.removeItem("USER_AUTH");
            console.log(isError);
          } else {
            dispatch(saveUserDataInGlobalState({ ...res.user }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    getUserProfileData();
  }, []);

  if (isLoading && !location.pathname.includes("signup")) return <Loader />;

  return <RouterConfig />;
}
