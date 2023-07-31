import { useContext } from "react";
import { AirDataContext } from "../../../App/App";

import { OrientationSummary } from "./children/OrientationSummary";
import { YawBar } from "./children/YawBar";
import { PitchBar } from "./children/PitchBar";
import { OrientationModel } from "./children/OrientationModel";

export const OrientationPanel = () => {
  const { airData, setAirData, clearAirData } = useContext(AirDataContext);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-center">
        <p className="heading has-text-light">Orientation</p>
      </div>

      <div className="is-flex">
        <OrientationSummary
          yaw={airData.orientationZ}
          pitch={airData.orientationY}
          roll={airData.orientationX}
        />

        <div className="mt-2">
          <div className="is-flex">
            <YawBar yaw={airData.orientationZ} />
          </div>
          <div className="is-flex">
            <PitchBar pitch={airData.orientationY} />
            <OrientationModel
              yaw={airData.orientationZ}
              pitch={airData.orientationY}
              roll={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
