import { Box, Flex, Image } from "@chakra-ui/react";
import selfie_frame from "app/assets/images/selfie_frame.png";
import { updateKYCImagaObject } from "app/providers/store/slices/auth/kyc-images-slice";
import React from "react";
import { useTranslation } from "react-i18next";
import { MdPhotoCamera } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useChakraToast } from "shared/hooks";
import { PButton } from "shared/ui/buttons";
import s from "./selfie.module.scss";

export const Selfie = () => {
  const { t } = useTranslation("forms");
  const { selfie } = useSelector((state) => state.kyc_images.datas);
  const dispatch = useDispatch();
  const toast = useChakraToast();
  const location = useLocation();

  const [webcamStatus, setWebcamStatus] = React.useState(false);
  const [hasSelfieImage, setHasSelfieImage] = React.useState(false);
  const [showSelfiePreviewImage, setShowSelfiePreviewImage] = React.useState(false);
  // const [selfieLoading, setSelfieLoading] = React.useState(false);
  const [canvasRefData, setCanvasRefData] = React.useState(null);

  const photoRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  const handleStartWebcamStreaming = async () => {
    // получение потока из веб-камеры
    // создание глобального свойства localStream
    // добавление источника видео в тег <video>
    // запуск видео
    // смена статуса камеры
    const constraints = { video: { facingMode: { exact: "user" } }, audio: false };

    (async () => {
      const flow = await navigator.mediaDevices.getUserMedia(constraints).catch(() => {
        toast("error", "Permission denied! Access to the camera is closed. 🙁", "Error");
      });

      if (flow) {
        window.localStream = flow;
        videoRef.current.srcObject = flow;
        videoRef.current.play();
        setWebcamStatus(true);
      }
    })();
  };

  const handleEndWebcamStreaming = async () => {
    // удаление свойства localStream
    // удаление источника из тега видео
    // пауза на видео
    // смена статуса камеры
    window.localStream.getVideoTracks()[0].stop();
    videoRef.current.srcObject = null;
    videoRef.current.pause();
    setWebcamStatus(false);
  };

  const showSelfiePreview = () => {
    setShowSelfiePreviewImage(!showSelfiePreviewImage);
  };

  const handleShowImage = () => {
    // проверка на основе статуса доступности камеры
    // получение контекста canvas
    // отрисовка изображения с камеры на поверхность canvas
    // FIXME: добавить возможность удаления фотографии
    if (webcamStatus) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, 1200, 1200);
      const data = canvasRef.current.toDataURL("image/jpeg", 1.0);
      setCanvasRefData(data);
      photoRef.current.src = data;
      setHasSelfieImage(true);
    } else {
      toast("error", "Permission denied! Please turn on your camera.", "Error");
    }
  };

  const dataURItoBlob = (dataURI) => {
    // функция для конвертации данных с поверхности canvas в blob элемент
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) byteString = window.atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  };

  // function checker(file) {
  //   const livenessurl = "https://api.faceki.com/check_liveness";
  //   setSelfieLoading(true);
  //   const data = new FormData();

  //   data.append("key", file);
  //   const req = new XMLHttpRequest();

  //   req.open("POST", livenessurl, true);
  //   req.onreadystatechange = function () {
  //     if (this.readyState === 4 && this.status === 200) {
  //       let resp = JSON.parse(this.response);

  //       if (resp && resp.score /*&& resp.score>=0.50 && resp.quality>=0.60*/ && resp.probability > 0.5 && resp.error === undefined) {
  //         const opt = {
  //           data: "Congratulation. You're so cute! 😊",
  //           status: "success",
  //         };
  //         // const selfiefile = window.URL.createObjectURL(blob);
  //         const selfiefile = window.URL.createObjectURL(file);
  //         dispatch(updateKYCImagaObject({ selfie: selfiefile }));

  //         window.localStorage.setItem("SELFIE_IMAGE", selfiefile);
  //         toast(opt.status, opt.data);
  //         setSelfieLoading(false);
  //       } else {
  //         const opt = {
  //           data: resp.error ?? "Something went wrong... 🙁",
  //           status: "error",
  //           title: "Error",
  //         };
  //         toast(opt.status, opt.data, opt.title);
  //         setSelfieLoading(false);
  //       }
  //     }
  //   };
  //   req.send(data);
  // }

  React.useEffect(() => {
    // конвертация данных с поверхности canvas в blob элемент
    // проверка вероятности и качества селфи
    // вывод ошибок и предупреждений
    // запрос на проверку, получение ответа
    if (canvasRefData) {
      const blob = dataURItoBlob(canvasRefData);
      const selfiefile = window.URL.createObjectURL(blob);
      dispatch(updateKYCImagaObject({ selfie: selfiefile }));
      // checker(blob);
    }
  }, [canvasRefData, dispatch]);

  React.useEffect(() => {
    // return () => {
    //   // FIXME: turn off webcam if user change page
    //   if (!location.signup && window.localStream) {
    //     window.localStream.getVideoTracks()[0].stop();
    //   }
    // };

    const cleanupVideoTrack = () => {
      // FIXME: turn off webcam if user change page
      if (!location.signup && window.localStream) {
        window.localStream.getVideoTracks()[0].stop();
      }
    };
    return cleanupVideoTrack;
  }, [location.signup]);

  return (
    <>
      <Box className={s.contentarea}>
        <Box className={s.camera} pos="relative">
          <video autoPlay={true} playsInline={true} muted={true} className={s.video} id="video" ref={videoRef}>
            Video stream not available.
          </video>
          <Image src={selfie_frame} pos="absolute" top="0" left="0" border="0" borderRadius="4px 4px 0 0" alt="Selfie frame." />

          {webcamStatus ? (
            <PButton w="100%" left="0" borderRadius="0 0 4px 4px" onClick={handleEndWebcamStreaming}>
              {t("DISABLE_WEBCAM")}
            </PButton>
          ) : (
            <PButton w="100%" left="0" borderRadius="0 0 4px 4px" onClick={handleStartWebcamStreaming}>
              {t("ENABLE_WEBCAM")}
            </PButton>
          )}

          <Flex w="100%" mt={3} gap={3}>
            <PButton w="100%" id="startbutton" left="0" borderRadius="4px" onClick={handleShowImage}>
              <MdPhotoCamera m={2} fontSize="1.5rem" />
            </PButton>

            {selfie && (
              <PButton w="100%" left="0" borderRadius="4px" fontSize={"12px"} disabled={!hasSelfieImage} onClick={showSelfiePreview}>
                {showSelfiePreviewImage ? t("CLOSE_PREVIEW") : t("SHOW_PREVIEW")}
              </PButton>
            )}
          </Flex>
        </Box>
        <canvas ref={canvasRef} className={s.canvas} width="1200px" height="1200px"></canvas>
        <Box className={s.output}>
          <img ref={photoRef} className={`${s.photo} ${showSelfiePreviewImage ? s.photoVisible : ""}`} id="photo" alt="Selfie source." />
        </Box>
      </Box>
    </>
  );
};
