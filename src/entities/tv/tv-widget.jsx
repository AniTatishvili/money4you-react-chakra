import { tvWidgetStatus } from "app/providers/store/slices/widgets/widgets-status-slice";
import Hls from "hls.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Flex, Img } from "@chakra-ui/react";
import { TvMenu } from "./tv-menu";

import Az from "app/assets/images/flags/az.svg";
import Gb from "app/assets/images/flags/gb.svg";
import Ge from "app/assets/images/flags/ge.svg";
import Ru from "app/assets/images/flags/ru.svg";
import { FaLanguage, FaTv } from "react-icons/fa";
import { TbScreenShareOff } from "react-icons/tb";
import s from "./tv.module.scss";

const channels = [
  {
    title: "English",
    img: Gb,
    url: "https://tv.money4you.financial/stream/money4you-en.m3u8",
  },
  {
    title: "Русский",
    img: Ru,
    url: "https://tv.money4you.financial/stream/money4you-en.m3u8",
  },
  {
    title: "Azərbaycan dili",
    img: Az,
    url: "https://tv.money4you.financial/stream/money4you-az.m3u8",
  },
  {
    title: "ქართული",
    img: Ge,
    url: "https://tv.money4you.financial/stream/money4you-en.m3u8",
  },
];

export const TvWidget = () => {
  const dispatch = useDispatch();
  const { radio_status } = useSelector((state) => state.widgets_status);

  const player = React.useRef(null);
  const widgetCloseBtn = React.useRef(null);
  const widgetShowBtn = React.useRef(null);
  const widget = React.useRef(null);

  const videoMount = (url) => {
    if (Hls.isSupported) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(player.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        player.current.play();
      });
    } else if (player.current.canPlayType("application/vnd.apple.mpegurl")) {
      player.current.src = url;
    }
  };

  // hidden tv
  const hideTvWidget = () => {
    dispatch(tvWidgetStatus(false));
    window.localStorage.setItem("tvw-status", JSON.stringify(false));
    widget.current.style.display = "none";
    widgetShowBtn.current.style.display = "block";

    player.current.pause();
  };
  // show tv
  const showTvWidget = () => {
    dispatch(tvWidgetStatus(true));
    window.localStorage.setItem("tvw-status", JSON.stringify(true));
    widgetShowBtn.current.style.display = "none";
    widget.current.style.display = "block";

    let languageId = window.localStorage.getItem("tv-language") || 0;
    videoMount(channels[languageId].url);
    player.current.play();
  };

  // custom select for change tv language
  const languageSelect = React.useRef(null);
  const changeTvWidgetLanguage = () => {
    languageSelect.current.classList.toggle(`${s.preview_active}`);
  };
  const selectTvWidgetLanguage = (e) => {
    window.localStorage.setItem("tv-language", Number(e.target.getAttribute("data-value")));
    languageSelect.current.classList.remove(`${s.preview_active}`);

    videoMount(channels[Number(e.target.getAttribute("data-value"))].url);
  };

  React.useEffect(() => {
    let languageId = window.localStorage.getItem("tv-language") || 0;

    if (JSON.parse(window.localStorage.getItem("tvw-status"))) {
      widget.current.style.display = "block";
      videoMount(channels[languageId].url);
    } else {
      widget.current.style.display = "none";
      player.current.src = "";
    }
  }, []);

  React.useEffect(() => {
    if (!radio_status) {
      widgetShowBtn.current.style.display = "block";
    } else {
      widgetShowBtn.current.style.display = "none";
    }
  }, [radio_status]);

  return (
    <>
      <Box className={s.show} ref={widgetShowBtn} onClick={showTvWidget}>
        <FaTv className={s.show_icon} />
      </Box>
      <section className={s.wrapp} ref={widget}>
        <Box className={s.tv_heading}>
          <Flex className={s.select_button} onClick={changeTvWidgetLanguage}>
            <FaLanguage title="Switch language" />
          </Flex>
          <TvMenu />
          <Box className={s.close} ref={widgetCloseBtn} onClick={hideTvWidget}>
            <TbScreenShareOff className={s.close_icon} title="Close video" />
          </Box>
        </Box>
        <Box className={s.select_options} ref={languageSelect}>
          {channels.map((channel, i) => (
            <Img className={s.select_option} src={channel.img} title={channel.title} data-value={i} onClick={selectTvWidgetLanguage} key={i} />
          ))}
        </Box>
        <video className={s.player} ref={player} autoPlay muted controls rel="preconnect"></video>
      </section>
    </>
  );
};
