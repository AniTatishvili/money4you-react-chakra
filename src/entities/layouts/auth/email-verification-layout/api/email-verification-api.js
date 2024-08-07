import axios from "axios";

export const emailVerificationReq = async (url) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Credentials": true,
    },
  };

  try {
    return await axios.get(url, config);
  } catch (err) {
    return err.response.data;
  }
};
