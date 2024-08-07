import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string().required("Enter username"),
  name: Yup.string().required("Write your name"),
  surname: Yup.string().required("Enter your surname"),
  passport_id: Yup.string().required("Enter your passport ID").min(6, "Passport ID must be 6 characters or more"),
  email: Yup.string().email("Invalid email format").required("Email is required field"),
  password: Yup.string().required("Enter your password").min(9, "Password must be 9 characters or more"),
  password_confirm: Yup.string()
    .required("Enter password")
    .min(9, "Password must be 9 characters or more")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  city: Yup.string().required("Enter your city").max(38, "Your city must be at most 38 characters"),
  post_code: Yup.string().required("Enter your post code").max(12, "Your post code must be at most 12 characters"),
  state: Yup.string().required("State is required").max(38, "Your state must be at most 38 characters"),
  street: Yup.string().required("Enter street").max(52, "Your street must be at most 52 characters"),
  building_number: Yup.string().required("Enter building number").max(8, "Your building number must be at most 8 characters"),
  apt_number: Yup.string().required("Enter your apartment number").max(8, "Your apartment number must be at most 8 characters"),
});

export const authorizationValidationSchema = Yup.object({
  username: Yup.string().required("Enter username"),
  password: Yup.string().required("Enter your password").min(9, "Password must be 9 characters or more"),
});

export const authorizationOtpVerifySchema = Yup.object({
  otp: Yup.string().required("Enter OPT-code").min(6, "Your OTP-code must be at least 6 characters").max(6, "Your OTP-code must be at most 6 characters"),
});

export const forgotPasswordValidate = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required field"),
  passport_id: Yup.string().required("Enter your passport ID").min(6, "Passport ID must be 6 characters or more"),
});

export const confirmNewPasswordSchema = Yup.object({
  password: Yup.string().required("Enter your password").min(9, "Password must be 9 characters or more"),
  password_confirmation: Yup.string()
    .required("Enter password")
    .min(9, "Password must be 9 characters or more")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const confirmValidationTokenSchema = Yup.object({
  token: Yup.string()
    .required("Enter verifide code")
    .min(6, "Your validation code must be at least 6 characters")
    .max(6, "Your validation must be at most 6 characters"),
});
