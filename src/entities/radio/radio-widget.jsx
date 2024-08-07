import debounce from "lodash.debounce";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@chakra-ui/react";
import { radioWidgetStatus } from "app/providers/store/slices/widgets/widgets-status-slice";
import { FaChevronLeft, FaChevronUp, FaMusic, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { radioRequest } from "./api/radio-request";

import s from "./radio-widget.module.scss";

export const RadioWidget = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { tv_status } = useSelector((state) => state.widgets_status);

  const radioAudioElement = React.useRef(null);
  const radioBody = React.useRef(null);
  const radioSwitcher = React.useRef(null);
  const radioExtendedToggler = React.useRef(null);
  const radioExtendedImage = React.useRef(null);
  const radioExtendedImageSource = React.useRef(null);
  const radioExtendedInfo = React.useRef(null);
  const radioLine = React.useRef(null);
  const radioPlayBtn = React.useRef(null);
  const radioPauseBtn = React.useRef(null);

  const [radioStatus, setRadioStatus] = React.useState(false);
  const [radioTime, setRadioTime] = React.useState();
  const [response, setResponse] = React.useState();
  const responseRef = React.useRef();

  React.useEffect(() => {
    responseRef.current = response;
  }, [response]);

  const responseRadioRequest = React.useCallback(async () => {
    await radioRequest().then((datas) => setResponse(datas));
  }, []);

  React.useEffect(() => {
    responseRadioRequest();
  }, [responseRadioRequest]);

  const timerRef = React.useRef();
  let timer;
  timerRef.current = timer;

  const handleClickRadioFieldsToggler = React.useCallback(() => {
    clearInterval(timer);

    timer = setInterval(() => {
      debounce(async () => {
        if (responseRef.current.playing_next.played_at - Math.floor(new Date() / 1000) <= 0) {
          await responseRadioRequest();
        }

        const duration = responseRef.current.now_playing.duration;
        const songEndTimestamp = duration + responseRef.current.now_playing.played_at;
        const currentTimestamp = Math.floor(Date.now() / 1000);

        let min = Math.floor(responseRef.current.now_playing.duration / 60);
        let sec = Math.floor(responseRef.current.now_playing.duration % 60);
        setRadioTime(`${min <= 9 ? `0${min}` : min}:${sec <= 9 ? `0${sec}` : sec} `);

        let width = ((duration - (songEndTimestamp - currentTimestamp)) / duration) * 100;
        radioLine.current.style.width = `${width}%`;
      }, 0)();
    }, 1000);

    radioBody.current.classList.add(`${s.pl_switcher_active}`);
    radioSwitcher.current.classList.add(`${s.none}`);

    dispatch(radioWidgetStatus(true));
    return timer;
  }, []);

  const handleClickRadioFieldsHidding = () => {
    dispatch(radioWidgetStatus(false));
    radioBody.current.classList.remove(`${s.pl_switcher_active}`);
    radioSwitcher.current.classList.remove(`${s.none}`);
  };

  const startRadioPlaying = () => {
    if (responseRef.current && responseRef.current.is_online) {
      radioAudioElement.current.src = responseRef.current.station.listen_url;
      radioAudioElement.current.play();
      setRadioStatus(true);
    }
  };

  const pauseRadioPlaying = () => {
    radioAudioElement.current.pause();
    setRadioStatus(false);
  };

  const showRadioExtendedInformation = () => {
    radioExtendedImage.current.classList.toggle(`${s.pl_wrapper__image_active}`);
    radioExtendedInfo.current.classList.toggle(`${s.pl_wrapper__info_active}`);
  };

  React.useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  React.useEffect(() => {
    if (tv_status && radioSwitcher.current !== null) {
      radioSwitcher.current.classList.add(`${s.none}`);
    } else if (!tv_status && radioSwitcher.current) {
      radioSwitcher.current.classList.remove(`${s.none}`);
    }
  }, [tv_status]);

  return (
    <>
      {response && response.is_online ? (
        <section className={s.pl_body} ref={radioBody} id="playerBody">
          <audio ref={radioAudioElement} src="#" preload="auto"></audio>
          <div className={`${s.pl_wrapper}`} ref={radioExtendedImage}>
            <div className={s.pl_image} id="playerImage">
              <img className={s.pl_image__source} ref={radioExtendedImageSource} src={response.now_playing.song.art} alt="Song art" />
            </div>
          </div>

          <div className={`${s.pl_wrapper}`} ref={radioExtendedInfo}>
            <div className={s.pl_info}>
              <div className={s.pl_text}>
                {response.now_playing.song.artist}
                {" - "}
                {response.now_playing.song.title}
              </div>
            </div>
          </div>

          <div className={`${s.pl_wrapper} ${s.pl_wrapper__line}`}>
            <div className={s.pl_manage}>
              {radioStatus ? (
                <Box className={s.pl_btn__play} ref={radioPauseBtn} onClick={pauseRadioPlaying}>
                  <FaPauseCircle />
                </Box>
              ) : (
                <Box className={s.pl_btn__play} ref={radioPlayBtn} onClick={startRadioPlaying}>
                  <FaPlayCircle />
                </Box>
              )}
              <div className={s.pl_btn__close} ref={radioExtendedToggler} onClick={showRadioExtendedInformation} id="playerCloseBtn">
                <Box className={s.pl_arrow}>
                  <FaChevronUp />
                </Box>
                <Box>{t("WIDGETS.RADIO.WHAT_A_SONG")}</Box>
              </div>
              <div className={s.pl_duration}>{radioTime ? <span>{radioTime}</span> : <span>00:00</span>}</div>
            </div>
            <div className={s.pl_line}>
              <div className={s.pl_line__track} ref={radioLine} id="playerTrack"></div>
            </div>

            <div className={s.hidding_btn} onClick={handleClickRadioFieldsHidding}>
              <FaChevronLeft />
            </div>

            <div className={s.pl_switcher} ref={radioSwitcher} onClick={handleClickRadioFieldsToggler}>
              <FaMusic />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};
