import { useAppDispatch } from "app/providers/store";
import { Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";

// import { editProfileAPI } from "app/providers/store/api";
import { useUserEditProfileMutation } from "app/providers/store/api";
import { saveUserDataInGlobalState } from "app/providers/store/slices/authSlice";

import { Flex } from "@chakra-ui/react";

import { UserProfileFields } from "./update-profile-fields";
import { UserImage } from "./update-profile-picture";

import { useChakraToast } from "shared/hooks";
import { useUserData } from "shared/hooks/useUserData";

import { profileFieldValues } from "entities/profiles/lib/profile-formik-values";
import { userProfileValidationSchema } from "entities/profiles/lib/profile-yup-schema";

export const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  // const [getUserData, { data }] = editProfileAPI.endpoints.userProfileData.useLazyQuery();
  const [editProfile] = useUserEditProfileMutation();
  const user_data = useSelector((state) => state.signup.data);
  const toast = useChakraToast();

  // const userData = useUserData();
  const { data: userData } = useUserData();

  // const [getUserData, { data, isLoading }] = useUserProfileDataMutation();
  // const uid = window !== undefined ? JSON.parse(window.localStorage.getItem("UID")) : null;
  React.useEffect(() => {
    // getUserData();
    if (userData) {
      for (let value in profileFieldValues) {
        profileFieldValues[value] = userData[value];
      }
    }
  }, [userData]);

  // const getUserProfileData = async () => {

  //     await getUserData({user_id:uid})
  //     .unwrap()
  //     .then((data) => {
  //       if (data) {
  //         const { user } = data.data;
  //         console.log(data.data.user)
  //         for (let value in profileFieldValues) {
  //           profileFieldValues[value] = user[value];
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  // }

  // React.useEffect(() => {
  //   getUserProfileData()
  // }, []);

  const onEditProfileFormSubmit = async (values) => {
    const fd = new FormData();
    const editProfileFormRequestData = { ...user_data, ...values };

    for (let i in editProfileFormRequestData) {
      fd.append(i, editProfileFormRequestData[i]);
    }

    try {
      await editProfile(fd)
        .unwrap()
        .then((res) => {
          dispatch(saveUserDataInGlobalState({ ...res.data.user }));

          for (let value in profileFieldValues) {
            profileFieldValues[value] = res.data.user[value];
          }
        });
      const title = "Notification";
      const msg = "Profile updated.";
      toast("success", msg, title);
    } catch (error) {
      toast("error", error.data.error.message[0], "Error");
    }
  };

  return userData ? (
    <Flex flexDir="column" w={"100%"} gap={"5"}>
      <Flex justify={"space-between"} wrap={{ base: "wrap", lg: "nowrap" }} gap={"5"} mt={"5"} maxW={"700px"}>
        <UserImage />
        {/* <UpdateProfilePressCard /> */}
      </Flex>
      <Formik initialValues={profileFieldValues} validationSchema={userProfileValidationSchema} onSubmit={onEditProfileFormSubmit}>
        {(formik) => {
          const { isSubmitting, isValid, touched } = formik;
          return (
            <Form style={{ width: "100%" }}>
              <UserProfileFields isSubmitting={isSubmitting} isValid={isValid} touched={touched} />
            </Form>
          );
        }}
      </Formik>
    </Flex>
  ) : null;
};
