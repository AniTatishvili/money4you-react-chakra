import { useEffect, useState } from "react";
import { TExtra } from "shared/types";

export const useGetRate = (datas: TExtra[], field_id: string) => {
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    const _rate = Number(datas.find((data: TExtra) => data.field_id === field_id)?.value);
    isNaN(_rate) ? rate : setRate(_rate);
  }, []);

  return rate;
};
