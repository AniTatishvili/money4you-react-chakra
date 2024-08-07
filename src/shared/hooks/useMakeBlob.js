export const useMakeBlob = async (url) => {
  try {
    const response = await fetch(url)
      .then((data) => data)
      .then((res) => res);

    return await response.blob();
  } catch (err) {
    // console.log("Some problems with image upload...");
    // FIXME: Add here error toast
  }
};
