import { useGetLaravelUserDataMutation } from "app/providers/store/api/profile";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const [data, setData] = useState<object>();
  const [getUserData, { isLoading, isError }] = useGetLaravelUserDataMutation();

  useEffect(() => {
    const getUserProfileData = () => {
      getUserData({})
        .unwrap()
        .then((response) => {
          setData(response.user);
        })
        .catch(() => {
          if (isError) {
            throw new Error("An error occurred");
          }
        });
    };

    getUserProfileData();
  }, [getUserData, isError]);

  return { data, loading: isLoading, error: isError };
};
