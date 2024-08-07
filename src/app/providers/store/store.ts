import { configureStore } from "@reduxjs/toolkit";

// slices
import articlesList from "app/providers/store/slices/articlesListSlice";
import tokenStatus from "app/providers/store/slices/auth/validateTokenSlice";
import auth from "app/providers/store/slices/authSlice";
import customer_details from "app/providers/store/slices/dashboards/seller/customer-details-slice";
import projectsList from "app/providers/store/slices/projectsListSlice";
import signup from "app/providers/store/slices/signup";
import jobseeker_auth_slice from "./slices/auth/jobseeker-auth-slice";
import journalist_auth_slice from "./slices/auth/journalist-auth-slice";
import kyc_images from "./slices/auth/kyc-images-slice";
import investor_slice from "./slices/dashboards/investor/investor-slice";
import user_profile_slice from "./slices/profiles/user-profile-slice";
import update_number from "./slices/profiles/user-update-number-slice";
import tooltipSlice from "./slices/tutorial/tutorial-slice";
import widgets_status from "./slices/widgets/widgets-status-slice";

// api
import { dashboardsAPI, editProfileAPI, forgotPasswordAPI, signinAPI, signupAPI } from "./api";
import { otpAPI, registerKycAPI } from "./api/auth";
import { registerAPI } from "./api/auth/register";
import { activateJournalistAPI, getRefOrdersAPI, getUserOrdersAPI, usersByIdAPI, usersByRoleAPI, usersByUsernameAPI } from "./api/dashboard";
import { laravelUserDataApi } from "./api/profile";

export const store = configureStore({
  reducer: {
    // slices
    // signup
    journalist_auth_slice,
    jobseeker_auth_slice,

    auth,
    projectsList,
    articlesList,
    signup,
    tokenStatus,
    widgets_status,
    user_profile_slice,
    customer_details,
    kyc_images,
    update_number,
    investor_slice,
    tooltipSlice,

    // api
    [signupAPI.reducerPath]: signupAPI.reducer,
    [signinAPI.reducerPath]: signinAPI.reducer,
    [editProfileAPI.reducerPath]: editProfileAPI.reducer,
    [forgotPasswordAPI.reducerPath]: forgotPasswordAPI.reducer,
    [dashboardsAPI.reducerPath]: dashboardsAPI.reducer,
    [getRefOrdersAPI.reducerPath]: getRefOrdersAPI.reducer,
    [usersByRoleAPI.reducerPath]: usersByRoleAPI.reducer,
    [usersByIdAPI.reducerPath]: usersByIdAPI.reducer,
    [usersByUsernameAPI.reducerPath]: usersByUsernameAPI.reducer,
    [activateJournalistAPI.reducerPath]: activateJournalistAPI.reducer,
    [getUserOrdersAPI.reducerPath]: getUserOrdersAPI.reducer,
    [otpAPI.reducerPath]: otpAPI.reducer,
    [registerKycAPI.reducerPath]: registerKycAPI.reducer,
    [laravelUserDataApi.reducerPath]: laravelUserDataApi.reducer,
    [registerAPI.reducerPath]: registerAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      signupAPI.middleware,
      signinAPI.middleware,
      editProfileAPI.middleware,
      forgotPasswordAPI.middleware,
      dashboardsAPI.middleware,
      getRefOrdersAPI.middleware,
      usersByRoleAPI.middleware,
      usersByIdAPI.middleware,
      usersByUsernameAPI.middleware,
      activateJournalistAPI.middleware,
      getUserOrdersAPI.middleware,
      otpAPI.middleware,
      registerKycAPI.middleware,
      registerAPI.middleware,
      laravelUserDataApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
