import React from "react";
import { Route, Routes } from "react-router-dom";

// global/ect.
import { PageMainLayout } from "entities/layouts/PageMainLayout";
import { Home } from "pages/home";
import { Protected } from "./Protected";
import { Redirect } from "./Redirect";

// login/signup/ect.
import { EmailConfirmationPage, EmailVerificationPage } from "pages/auth";
import { ConfirmNewPassword } from "pages/auth/forgot-password/confirm-new-password";
import { ForgotPassword } from "pages/auth/forgot-password/forgot-password";
import { Login } from "pages/auth/login";
import { Pin } from "pages/auth/pin";
import { Signup } from "pages/auth/signup";
import { SignupJobseeker } from "pages/auth/signup-jobseeker";
import { SignupJournalist } from "pages/auth/signup-journalist";

// profiles/dashboards.
import { ChiefSeller, Investor, PressSpeaker, Seller } from "pages/dashboards";
import { Profile } from "pages/profile";

// 404
import NotFoundPage from "pages/NotFoundPage";

// routing.
export function RouterConfig() {
  return (
    <Routes>
      <Route element={<PageMainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* USERS: SETTINGS */}
        {/* users: settings - edit profile */}
        <Route path="settings">
          <Route index element={<NotFoundPage />} />
          <Route
            element={
              <Protected
                allowedRoles={["Super Admin", "Investor", "Chief Financial Officer", "Financial Broker", "Press Speaker", "Journalist", "Job Seeker"]}
              />
            }>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* USERS: DASHBOARDS */}
        {/* investor dashboard */}
        <Route element={<Protected allowedRoles={["Investor", "Journalist"]} />}>
          <Route path="dashboard" element={<Investor />} />
        </Route>
        {/* seller dashboard */}
        <Route element={<Protected allowedRoles={["Financial Broker", "Journalist"]} />}>
          <Route path="dashboard/seller" element={<Seller />} />
        </Route>
        {/* chief seller dashboard */}
        <Route element={<Protected allowedRoles={["Chief Financial Officer", "Journalist"]} />}>
          <Route path="dashboard/chief-seller" element={<ChiefSeller />} />
        </Route>
        {/* press speaker dashboard */}
        <Route element={<Protected allowedRoles={["Press Speaker", "Journalist"]} />}>
          <Route path="dashboard/press" element={<PressSpeaker />} />
        </Route>

        {/* LOGIN/SIGNUP/ECT */}
        {/* <Route element={<Redirect />}> */}
        <Route path="login" element={<Login />} />
        {/* </Route> */}

        <Route element={<Redirect />}>
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<Redirect />}>
          <Route path="confirm-new-password" element={<ConfirmNewPassword />} />
        </Route>

        <Route element={<Redirect />}>
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<Redirect />}>
          <Route path="signup/journalist" element={<SignupJournalist />} />
          <Route path="signup/jobseeker" element={<SignupJobseeker />} />
        </Route>

        <Route path="pin" element={<Pin />} />
        <Route path="email-verification" element={<EmailVerificationPage />} />
        <Route path="email-confirmation" element={<EmailConfirmationPage />} />
      </Route>
    </Routes>
  );
}
