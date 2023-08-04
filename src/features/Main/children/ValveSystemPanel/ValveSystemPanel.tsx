import { useContext, useMemo } from "react";
import { ValveDataContext } from "../../../App/App";

import { ValveSummary } from "./children/ValveSummary";
import { ValveDiagram } from "./children/ValveDiagram";

export const ValveSystemPanel = () => {
  const { valveData } = useContext(ValveDataContext);

  const ValveDiagramMemo = useMemo(
    () => <ValveDiagram isWaiting={valveData.isWaiting} />,
    [valveData.isWaiting]
  );

  return (
    <div className="box has-background-dark p-3 is-flex is-flex-direction-column">
      <h2 className="title is-4 has-text-light has-text-weight-light">
        VALVE SYSTEM
      </h2>

      <ValveSummary
        currentPosition={valveData.currentPosition}
        currentDesiredPosition={valveData.currentDesiredPosition}
        currentVelocity={valveData.currentVelocity}
        isWaiting={valveData.isWaiting}
        mcuTemperature={valveData.mcuTemperature}
        motorTemperature={valveData.motorTemperature}
        inputVoltage={valveData.inputVoltage}
        current={valveData.current}
      />

      {ValveDiagramMemo}
    </div>
  );
};