import { useAppDispatch, useAppSelector } from "app/providers/store";
import React, { LegacyRef, forwardRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Box } from "@chakra-ui/react";
import { setDefaultTooltip } from "app/providers/store/slices/tutorial/tutorial-slice";
import { MdOutlineMenuBook } from "react-icons/md";
import { PButton } from "shared/ui";

interface RefsObject {
  ref: HTMLElement;
  text: string;
  name: string;
  page: string;
}

interface SHeaderTooltipProps {
  refs: {
    [key: string]: RefsObject;
  };
  onClick?: () => void;
}

export const SHeaderTooltip = forwardRef((props: SHeaderTooltipProps, ref: LegacyRef<HTMLDivElement>) => {
  const { t, i18n } = useTranslation("tutorial");

  const { refs, onClick } = props;

  const { radio_status } = useAppSelector((state) => state.widgets_status);
  const { tv_status } = useAppSelector((state) => state.widgets_status);

  const dispatch = useAppDispatch();

  const { innerWidth: w, innerHeight: h } = window;
  const handleResize = () => {
    const tooltipComponents = Object.keys(refs).map((componentName) => {
      const { ref, text, name, page } = refs[componentName];
      if (!ref) return null;

      return {
        ref,
        text,
        name,
        page,
      };
    });

    const staticComponents = [
      {
        text: t("tutorial:LIVE_CHAT_GROUP"),
        position: { top: h / 2 - 320, bottom: h / 2, left: 161 },
        size: { width: 39, height: 300 },
        name: "liveChatGroupRef",
        page: "",
      },
      {
        text: t("tutorial:TV_RADIO"),
        position: { top: h - 216, bottom: 25, left: tv_status || radio_status ? 340 : 191 },
        size: { width: tv_status || radio_status ? 290 : 48, height: 48 },
        name: "mediaRef",
        page: "",
      },
      {
        text: t("tutorial:LIVE_CHAT"),
        position: { top: h - 231, bottom: 25, left: w - 265, right: 25 },
        size: { width: 57, height: 57 },
        name: "liveChatRef",
        page: "",
      },
    ];

    const tooltipComponentsData = [...tooltipComponents, ...staticComponents];

    dispatch(setDefaultTooltip(tooltipComponentsData));
  };

  useEffect(() => {
    handleResize();
  }, [dispatch, radio_status, tv_status, i18n.language]);

  return (
    <Box onClick={onClick} ref={ref}>
      <PButton p={"8px"} h={"35px"}>
        <MdOutlineMenuBook />
      </PButton>
    </Box>
  );
});
