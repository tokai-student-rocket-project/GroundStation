import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";

import { getColorFromRssi } from "../../../../../utils/Color";

type Props = {
  rssi1?: number;
  rssi2?: number;
  rssi3?: number;
};

export const RssiIcon = ({ rssi1, rssi2, rssi3 }: Props) => {
  return (
    <FontAwesomeIcon
      icon={faRss}
      color={getColorFromRssi(
        !rssi1 || !rssi2 || !rssi3 ? undefined : (rssi1 + rssi2 + rssi3) / 3
      )}
      className="icon is-small mx-2"
    />
  );
};
