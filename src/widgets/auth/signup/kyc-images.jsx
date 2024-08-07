import { Box, Flex, Input, Tooltip } from "@chakra-ui/react";
import { updateKYCImagaObject } from "app/providers/store/slices/auth/kyc-images-slice";
import { setKycTooltipComponentsData } from "app/providers/store/slices/tutorial/tutorial-slice";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCamera, FaCheckCircle, FaUpload } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useChakraToast } from "shared/hooks";
import { PButton } from "shared/ui";
import { KYCLabel } from "shared/ui/selects/kyc/kycLabel";
import { Selfie } from "./selfie";

export const Kyc = () => {
  const { t, i18n } = useTranslation("forms");
  const dispatch = useDispatch();
  const toast = useChakraToast();

  const [frontSide, setFrontSide] = React.useState(null);
  const [backSide, setBackSide] = React.useState(null);

  const passportCamRef = React.useRef();
  const canvasPassportRef = React.useRef();

  const [frontSideStream, setFrontSideStream] = React.useState(null);
  const [backSideStream, setBackSideStream] = React.useState(null);

  const [showFrontVideo, setShowFrontVideo] = React.useState(false);
  const [showBackVideo, setShowBackVideo] = React.useState(false);

  const [frontToastShown, setFrontToastShown] = React.useState(false);
  const [backToastShown, setBackToastShown] = React.useState(false);

  const refs = {};

  const setRef = (name, ref, text) => {
    if (!ref) return;
    refs[name] = { ref, text, name };
  };

  const handleResize = () => {
    const tooltipComponents = Object.keys(refs).map((componentName) => {
      const { ref, text, name } = refs[componentName];
      if (!ref) return null;

      return {
        ref,
        text,
        name,
      };
    });

    const tooltipComponentsData = [...tooltipComponents];

    dispatch(setKycTooltipComponentsData(tooltipComponentsData));
  };

  React.useEffect(() => {
    handleResize();
  }, [dispatch, i18n.language]);

  const saveFrontSide = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const FRONT_IMAGE = window.URL.createObjectURL(file);
      window.localStorage.setItem("FRONT_IMAGE", FRONT_IMAGE);
      setFrontSide(file);
      dispatch(updateKYCImagaObject({ front: FRONT_IMAGE }));

      if (showFrontVideo && frontSideStream) {
        frontSideStream.getTracks().forEach((track) => track.stop());
      }

      setShowFrontVideo(false);
      setFrontSideStream(null);
    }
  };

  const saveBackSide = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const BACK_IMAGE = window.URL.createObjectURL(file);
      window.localStorage.setItem("BACK_IMAGE", BACK_IMAGE);
      setBackSide(file);
      dispatch(updateKYCImagaObject({ back: BACK_IMAGE }));

      if (showBackVideo && backSideStream) {
        backSideStream.getTracks().forEach((track) => track.stop());
      }

      setShowBackVideo(false);
      setBackSideStream(null);
    }
  };

  const startCameraStreaming = async (event, side) => {
    event.preventDefault();

    const isFront = side === "front";
    isFront ? setShowFrontVideo(!showFrontVideo) : setShowBackVideo(!showBackVideo);

    if (isFront && frontSideStream) {
      frontSideStream.getTracks().forEach((track) => track.stop());
      setFrontSideStream(null);
    } else if (!isFront && backSideStream) {
      backSideStream.getTracks().forEach((track) => track.stop());
      setBackSideStream(null);
    } else {
      const constraints = { video: { facingMode: { exact: "environment" } }, audio: false };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (stream) {
          isFront ? setFrontSideStream(stream) : setBackSideStream(stream);
          isFront ? setShowFrontVideo(true) : setShowBackVideo(true);

          window.localStream = stream;
          if (passportCamRef.current) {
            passportCamRef.current.srcObject = stream;
            passportCamRef.current.play();
          }
        }
      } catch (error) {
        if ((isFront && !frontToastShown) || (!isFront && !backToastShown)) {
          setFrontToastShown(isFront);
          setBackToastShown(!isFront);

          const title = "Camera Started";
          const msg = `Your device doesn't support the camera for the ${isFront ? "front" : "back"} side. Please try to upload picture.`;
          toast("error", msg, title);
        }

        console.log("error:", error);
      }
    }
  };

  const captureImage = (side) => {
    try {
      const videoElement = passportCamRef.current;

      const track = (side === "front" ? frontSideStream : backSideStream)?.getVideoTracks()[0];
      if (track) {
        const frameData = captureFrameFromVideo(videoElement);
        const photoBlob = dataURLtoBlob(frameData);
        const sidePhotoFileUrl = window.URL.createObjectURL(photoBlob);
        const sidePhotoFile = new File([photoBlob], `${Date.now()}_${side}.jpg`);

        side === "front" ? setShowFrontVideo(false) : setShowBackVideo(false);
        side === "front" ? setFrontSide(sidePhotoFile) : setBackSide(sidePhotoFile);
        side === "front" ? setFrontSideStream(null) : setBackSideStream(null);

        window.localStream.getVideoTracks()[0].stop();
        passportCamRef.current.srcObject = null;
        passportCamRef.current.pause();
        window.localStorage.setItem(`${side.toUpperCase()}_IMAGE`, sidePhotoFileUrl);
        dispatch(updateKYCImagaObject({ [side]: sidePhotoFileUrl }));
      } else {
        console.log("Camera track is not available.");
      }
    } catch (err) {
      console.log("error:", err);
    }
  };

  const captureFrameFromVideo = (videoElement) => {
    const canvas = canvasPassportRef.current;
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 1.0);
  };

  const dataURLtoBlob = (dataURI) => {
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

  return (
    <Flex flexDir="column" gap={4} maxW="280px">
      <Flex direction={"column"} gap={4} ref={(ref) => setRef("passportRef", ref, t("tutorial:PASSPORT_FIELDS"))}>
        <KYCLabel name="filePassportFirstSide" style={frontSide ? { backgroundColor: "#5eba7d", color: "#fff" } : null}>
          {frontSide ? <FaCheckCircle /> : <FaUpload />}
          <Tooltip label={t("FRONT_SIDE_OF_THE_PASSPORT")}>
            <Box maxW={"150px"} display={"inline-block"} textOverflow={"ellipsis"} overflow={"hidden"}>
              {frontSide ? frontSide.name : t("FRONT_SIDE_OF_THE_PASSPORT")}
            </Box>
          </Tooltip>
          <Flex
            gap={2}
            pos={"absolute"}
            right={"40px"}
            top={"50%"}
            transform={"translateY(-50%)"}
            align={"center"}
            justify={"center"}
            h={"100%"}
            w={"40px"}
            borderRadius={"0 4px 4px 0"}
            borderLeft={"1px solid #767676"}
            zIndex={"1"}
            onClick={() => startCameraStreaming(event, "front")}>
            <FaCamera />
          </Flex>
        </KYCLabel>

        <Input
          type="file"
          accept="image/png, image/jpeg, .png, .jpg, .jpeg"
          id="filePassportFirstSide"
          display="none"
          name="file-input"
          onChange={saveFrontSide}
        />
        {showFrontVideo && (
          <Flex direction={"column"}>
            <video autoPlay={true} playsInline={true} muted={true} ref={passportCamRef}></video>
            <PButton w="100%" left="0" borderRadius="0 0 4px 4px" onClick={() => captureImage("front")}>
              Front side
            </PButton>
          </Flex>
        )}
        <KYCLabel name="filePassportSecondSide" style={backSide ? { backgroundColor: "#5eba7d", color: "#fff" } : null}>
          {backSide ? <FaCheckCircle /> : <FaUpload />}
          <Tooltip label={t("REVERSE_SIDE_OF_THE_PASSPORT")}>
            <Box maxW={"150px"} display={"inline-block"} textOverflow={"ellipsis"} overflow={"hidden"}>
              {backSide ? backSide.name : t("REVERSE_SIDE_OF_THE_PASSPORT")}
            </Box>
          </Tooltip>
          <Flex
            pos={"absolute"}
            right={"40px"}
            top={"50%"}
            transform={"translateY(-50%)"}
            align={"center"}
            justify={"center"}
            h={"100%"}
            w={"40px"}
            borderRadius={"0 4px 4px 0"}
            borderLeft={"1px solid #767676"}
            zIndex={"1"}
            onClick={() => startCameraStreaming(event, "back")}>
            <FaCamera />
          </Flex>
        </KYCLabel>
        <Input
          type="file"
          accept="image/png, image/jpeg, .png, .jpg, .jpeg"
          id="filePassportSecondSide"
          display="none"
          name="file-input"
          onChange={saveBackSide}
        />
        {showBackVideo && (
          <Flex direction={"column"}>
            <video autoPlay={true} playsInline={true} muted={true} ref={passportCamRef}></video>
            <PButton w="100%" left="0" borderRadius="0 0 4px 4px" onClick={() => captureImage("back")}>
              Back side
            </PButton>
          </Flex>
        )}
      </Flex>
      <canvas ref={canvasPassportRef} width="1200px" height="1200px" style={{ display: "none" }}></canvas>
      <Flex ref={(ref) => setRef("webcamRef", ref, t("tutorial:WEBCAM"))}>
        <Selfie />
      </Flex>
    </Flex>
  );
};
