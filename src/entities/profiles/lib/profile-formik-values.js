const formik_profile_values = {
  profileFieldValues: {
    name: "",
    surname: "",
    passport_id: "",
    email: "",
    city: "",
    post_code: "",
    state: "",
    street: "",
    building_number: "",
    apt_number: "",
  },
};

const formik_update_phone_values = {
  checkPhoneValue: {
    old_number_last_characters: "",
  },
  updatePhoneValue: {
    phone: "",
  },
  verifyPhoneValue: {
    otp: "",
  },
};

const formik_change_password_values = {
  changePasswordValues: {
    new_password: "",
    new_password_confirm: "",
  },
};

export const { profileFieldValues } = formik_profile_values;
export const { checkPhoneValue, updatePhoneValue, verifyPhoneValue } = formik_update_phone_values;
export const { changePasswordValues } = formik_change_password_values;
