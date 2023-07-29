import { useContext } from "react";

import { PositionDataContext } from "../../../App/App";
import { GSI } from "./children/GSI";

export const MapView = () => {
  const { positionData } = useContext(PositionDataContext);

  return (
    <GSI latitude={positionData.latitude} longitude={positionData.longitude} />
  );
};
