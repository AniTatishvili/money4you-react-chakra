import axios from "axios";

const nowplaying = "https://radio.money4you.financial/api/nowplaying/1";

export const radioRequest = () => {
  return axios
    .get(nowplaying)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      // FIXME: Add here error toast
    });
  // .finally(() => console.log("radio ready to play."));
};