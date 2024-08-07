import React from "react";

import s from "./social-icon.module.scss";

export const SocialIcon = (props) => {
  return <button className={s.btn}>{props.children}</button>;
};
