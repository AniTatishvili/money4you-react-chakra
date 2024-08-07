import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeValidationStatus } from "app/providers/store/slices/auth/validateTokenSlice";
import { ConfirmNewPassword } from "./confirm-new-password";
import { ConfirmForgotPasswordValidationToken } from "./confirm-forgot-password-validation-token";

export const NewPassword = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.tokenStatus);

  React.useEffect(() => {
    return () => dispatch(changeValidationStatus());
  }, [dispatch]);

  return <>{status ? <ConfirmNewPassword /> : <ConfirmForgotPasswordValidationToken />}</>;
};
