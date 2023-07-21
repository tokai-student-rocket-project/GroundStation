import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";

import { getColorFromRssi } from "../../../../../utils/Color";

type Props = {
  rssi1?: number;
  rssi2?: number;
  rssi3?: number;
};

const getAverage = (
  v1?: number,
  v2?: number,
  v3?: number
): number | undefined => {
  if (v1 == undefined || v2 == undefined || v3 == undefined) return undefined;
  return (v1 + v2 + v3) / 3;
};

export const RssiIcon = ({ rssi1, rssi2, rssi3 }: Props) => {
  return (
    <FontAwesomeIcon
      icon={faRss}
      color={getColorFromRssi(getAverage(rssi1, rssi2, rssi3))}
      className="icon is-small mx-2"
    />
  );
};
