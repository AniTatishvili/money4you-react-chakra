import { object, string, ref } from "yup";

export const userProfileValidationSchema = object({
  name: string().required("Write your name"),
  surname: string().required("Enter your surname"),
  passport_id: string().required("Enter your passport ID").min(6, "Passport ID must be 6 characters or more"),
  email: string().email("Invalid email format").required("Email is required field"),
  city: string().required("Enter your city").max(38, "Your city must be at most 38 characters"),
  post_code: string().required("Enter your post code").max(12, "Your post code must be at most 12 characters"),
  state: string().nullable().max(38, "Your state must be at most 38 characters"),
  street: string().required("Enter street").max(52, "Your street must be at most 52 characters"),
  building_number: string().required("Enter building number").max(8, "Your building number must be at most 8 characters"),
  apt_number: string().required("Enter your apartment number").max(8, "Your apartment number must be at most 8 characters"),
});

// check phone
export const checkPhoneValidationSchema = object({
  old_number_last_characters: string().required("Enter last 4 symbols").min(4, "Must be at least 4 characters").max(4, "Must be at most 4 characters"),
});
// verify phone
export const verifyPhoneValidationSchema = object({
  otp: string().required("SMS code cannot be empty").min(6, "Must be at least 6 characters").max(6, "Must be at most 6 characters"),
});

export const userProfileUpdateMobileNumberCodeValidationSchema = object({
  code: string().required("Confirm new number").max(4, "SMS code must be at most 4 characters"),
});

export const userProfileChangePasswordValidationSchema = object({
  new_password: string().required("Enter your new password").min(9, "Password must be 9 characters or more"),
  new_password_confirm: string()
    .required("Enter password")
    .min(9, "Password must be 9 characters or more")
    .oneOf([ref("new_password"), null], "Passwords must match with new password"),
});
