import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useUserEditProfileMutation } from "app/providers/store/api";
import { useAppSelector } from "app/providers/store";
import { Document, Page } from "react-pdf";
import { useMakeBlob } from "shared/hooks";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

import { Flex, Text, VStack, HStack } from "@chakra-ui/react";
import { UploadInput } from "shared/ui";
import { PButton } from "shared/ui/buttons";

import { ReactComponent as FolderGraphic } from "app/assets/images/folder-graphic.svg";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

export const UploadResume = () => {
  const { t } = useTranslation("forms");
  const [userEditProfile, { isLoading }] = useUserEditProfileMutation();
  const { user_data } = useAppSelector((state) => state.auth);
  const uid = JSON.parse(window.localStorage.getItem("UID"));

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePrevPage = () => setPageNumber(pageNumber <= 1 ? pageNumber : (prev) => prev - 1);
  const handleNextPage = () => setPageNumber(pageNumber >= numPages ? numPages : (prev) => prev + 1);

  const getResumeDocument = async (resume_document_url) => {
    setResume(await fetch(resume_document_url).then((res) => res.blob()));
  };

  const [resume, setResume] = useState();
  const [resumeUrl, setResumeUrl] = useState();

  useEffect(() => {
    const resume_document_url = `https://api.devhunters.ru/storage/users/${uid}/${user_data?.cv}`;
    user_data?.cv ? setResumeUrl(resume_document_url) : null;
    user_data?.cv ? getResumeDocument(resume_document_url) : null;
  }, [user_data]);

  const handleUploadResume = async (e) => {
    const file = e.target.files[0];
    const fileUrl = window !== "undefined" ? window.URL.createObjectURL(file) : null;
    const blob = await useMakeBlob(fileUrl);

    const fd = new FormData();
    fd.append("cv", blob);

    userEditProfile(fd)
      .unwrap()
      .then(() => {
        const fr = new FileReader();
        fr.readAsDataURL(blob);
        fr.onloadend = (e) => setResume(e.target.result);
        setPageNumber(1);
      })
      .catch((err) => {
        // console.log(err);
        // FIXME: Add here error toast
      });
  };

  return (
    <VStack gap={"10"} h={"100%"}>
      {resume ? (
        <Flex flexDir="column" justifyContent="center">
          <VStack className="resume-wrapper">
            <Document file={resume} onLoadSuccess={onDocumentLoadSuccess}>
              <Page className="resume-document" pageNumber={pageNumber} renderTextLayer={false}></Page>
            </Document>
            <VStack>
              <HStack>
                <Text fontSize={"13px"} fontWeight={"bold"}>
                  {t("PROFILE_SETTINGS.RESUME.PAGES", { number: pageNumber, numbers: numPages })}
                </Text>
              </HStack>
              <HStack>
                <PButton onClick={handlePrevPage}>{t("PROFILE_SETTINGS.BUTTONS.PREVIOUS")}</PButton>
                <PButton onClick={handleNextPage}>{t("PROFILE_SETTINGS.BUTTONS.NEXT")}</PButton>
              </HStack>
            </VStack>
          </VStack>
          <VStack className="resume-download-btn" gap={"4"}>
            <Text>{t("PROFILE_SETTINGS.RESUME.DOWNLOAD_NOTE")}</Text>
            <a href={resumeUrl} download="your-resume">
              <PButton>{t("PROFILE_SETTINGS.BUTTONS.SHOW_RESUME")}</PButton>
            </a>
          </VStack>
        </Flex>
      ) : (
        <VStack>
          <FolderGraphic style={{ width: "auto", height: "80px" }} />
          <VStack gap={"1"}>
            <Text fontSize={"18px"} fontWeight={"bold"}>
              {t("PROFILE_SETTINGS.RESUME.NOT_FOUND")}
            </Text>
            <Text fontSize={"18px"} fontWeight={"bold"}>
              {t("PROFILE_SETTINGS.RESUME.NOTE")}
            </Text>
          </VStack>
        </VStack>
      )}
      <Flex>
        <UploadInput
          name={resume ? t("PROFILE_SETTINGS.BUTTONS.UPDATE_RESUME") : t("PROFILE_SETTINGS.BUTTONS.UPLOAD_RESUME")}
          id="upload-resume"
          accept=".pdf"
          isLoading={isLoading}
          cb={handleUploadResume}
        />
      </Flex>
    </VStack>
  );
};
