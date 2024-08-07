const formik_values = {
  initialValues: {
    username: "",
    name: "",
    surname: "",
    passport_id: "",
    email: "",
    password: "",
    password_confirm: "",
    city: "",
    post_code: "",
    state: "",
    street: "",
    building_number: "",
    apt_number: "",
  },

  authorizationValues: {
    username: "",
    password: "",
  },
  otpValues: {
    otp: "",
  },
  forgotPasswordValues: {
    email: "",
    passport_id: "",
  },
  confirmNewPasswordValues: {
    password: "",
    password_confirmation: "",
  },
  confirmValidationTokenValues: {
    token: "",
  },
};
export const { initialValues, authorizationValues, otpValues, forgotPasswordValues, confirmNewPasswordValues, confirmValidationTokenValues } = formik_values;