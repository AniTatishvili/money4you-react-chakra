import { string, object } from "yup";

export const pin_yup = object({
  pin: string().required("Check the accuracy of the entered code."),
});
