import { useContext, useState, useMemo } from "react";
import { PowerDataContext } from "../../../App/App";

import { BatteryStatus } from "./children/BatteryStatus";
import { PowerSummary } from "./children/PowerSummary";
import { PowerDiagram } from "./children/PowerDiagram";

export const PowerSystemPanel = () => {
  const { powerData } = useContext(PowerDataContext);

  const [isExternalSource, setIsExternalSource] = useState<boolean>(false);

  const PowerDiagramMemo = useMemo(
    () => (
      <PowerDiagram
        supplyVoltage={powerData.supplyVoltage}
        batteryVoltage={powerData.batteryVoltage}
        poolVoltage={powerData.poolVoltage}
        isExternal={isExternalSource}
      />
    ),
    [
      isExternalSource,
      powerData.supplyVoltage,
      powerData.batteryVoltage,
      powerData.poolVoltage,
    ]
  );

  const getSource = (batteryVoltage?: number, poolVoltage?: number): string => {
    if (batteryVoltage == undefined || poolVoltage == undefined) return "----";

    // LTC4416のデータシートから算出
    const failVoltage = 15.8;
    const restoreVoltage = 17.94;

    if (isExternalSource) {
      const canSwitchToBatterySource =
        poolVoltage < batteryVoltage + batteryVoltage * 0.1 &&
        poolVoltage < failVoltage;

      if (canSwitchToBatterySource) {
        setIsExternalSource(false);
        return "BATT";
      } else {
        return "EXT";
      }
    } else {
      const canSwitchToExternalSource =
        poolVoltage > batteryVoltage - batteryVoltage * 0.1 &&
        poolVoltage > restoreVoltage;

      if (canSwitchToExternalSource) {
        setIsExternalSource(true);
        return "EXT";
      } else {
        return "BATT";
      }
    }
  };

  return (
    <div className="box has-background-dark p-3 is-flex is-flex-direction-column">
      <div className="is-flex is-justify-content-space-between">
        <h2 className="title is-4 has-text-light has-text-weight-light">
          POWER SYSTEM
        </h2>

        <div>
          <BatteryStatus voltage={powerData.batteryVoltage} />
        </div>
      </div>

      <PowerSummary
        supplyVoltage={powerData.supplyVoltage}
        batteryVoltage={powerData.batteryVoltage}
        poolVoltage={powerData.poolVoltage}
        source={getSource(powerData.batteryVoltage, powerData.poolVoltage)}
      />

      {PowerDiagramMemo}
    </div>
  );
};
