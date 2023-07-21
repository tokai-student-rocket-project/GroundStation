import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";

import { getColorFromRssi } from "../../../../../utils/Color";

type Props = {
  rssi?: number;
};

export const RssiIcon = ({ rssi }: Props) => {
  return (
    <FontAwesomeIcon
      icon={faRss}
      color={getColorFromRssi(rssi)}
      className="icon is-small mx-2"
    />
  );
};
