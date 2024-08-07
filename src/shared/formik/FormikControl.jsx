import React from "react";

import { FormikInput } from "./FormikInput";
import { FormikNumber } from "./FormikNumber";
import { FormikSelect } from "./FormikSelect";
import { FormikCustomSelect } from "./formik-custom-select";
import { FormikRegistrationCheckbox } from "./formik-registration-checkbox";
import { FormikOTPSwitcher } from "./formik-otp-switcher";

export const FormikControl = (props) => {
  switch (props.control) {
    case "phone":
      return <FormikNumber {...props} />;
    case "input":
      return <FormikInput {...props} />;
    case "select":
      return <FormikSelect {...props} />;
    case "custom_select":
      return <FormikCustomSelect {...props} />;
    case "checkbox":
      return <FormikRegistrationCheckbox {...props} />;
    case "otp_switcher":
      return <FormikOTPSwitcher {...props} />;
    default:
      return null;
  }
};
