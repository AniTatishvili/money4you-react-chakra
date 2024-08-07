import * as Yup from "yup";

export const journalist_signup_validation_schema = Yup.object({
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

export const jobseeker_signup_validation_schema = Yup.object({
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