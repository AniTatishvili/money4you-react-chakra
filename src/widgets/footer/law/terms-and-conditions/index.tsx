import i18n from "i18n";
import React from "react";

import { TermsAndConditionsAz, TermsAndConditionsEn } from "./content";

export const TermsAndConditions = () => {
  const { language } = i18n;

  if (language === "az") return <TermsAndConditionsAz />;
  if (language === "en") return <TermsAndConditionsEn />;
  if (language === "ge") return <TermsAndConditionsEn />;
  if (language === "ru") return <TermsAndConditionsEn />;

  return "...";
};
