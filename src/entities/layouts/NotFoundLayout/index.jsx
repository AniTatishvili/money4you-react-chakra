import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { PContentLayout, PContentSection } from "entities/layouts";
import { PButton } from "shared/ui/buttons";

import { FaBackspace } from "react-icons/fa";
import s from "./NotFoundLayout.module.scss";

export default function NotFoundLayout() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const getBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <PContentLayout>
      <PContentSection>
        <div className={s.notfound}>
          <div className={s.emoji}>🤔</div>
          <div className={s.error}>404</div>
          <div className={s.title}>{t("NOTFOUND.HEADING")}</div>
          <div className={s.desc}>{t("NOTFOUND.TEXT")}</div>
          <PButton maxW={"320px"} m={"20px auto 0px"} onClick={getBack} gap={"1rem"}>
            <FaBackspace />
            {t("BUTTONS.BACK")}
          </PButton>
        </div>
      </PContentSection>
    </PContentLayout>
  );
}
