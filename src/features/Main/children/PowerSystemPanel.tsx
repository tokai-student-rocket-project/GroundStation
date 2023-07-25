import { useContext, useState } from "react";
import { PowerDataContext } from "../../App/App";

export const PowerSystemPanel = () => {
  const { powerData, setPowerData, clearPowerData } =
    useContext(PowerDataContext);

  const [isExternalSource, setIsExternalSource] = useState<boolean>(false);

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
    <div
      className="box has-background-dark p-3 is-flex is-flex-direction-column"
      style={{ height: "100%" }}
    >
      <h2 className="title is-4 has-text-light has-text-weight-light">
        POWER SYSTEM
      </h2>
      <nav className="level is-justify-content-center">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Supply</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-light">
                      {powerData.supplyVoltage?.toFixed(2) ?? "--.--"}
                    </p>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <p className="has-text-light mx-1">V</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Battery</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-light">
                      {powerData.batteryVoltage?.toFixed(2) ?? "--.--"}
                    </p>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <p className="has-text-light mx-1">V</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Pool</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-light">
                      {powerData.poolVoltage?.toFixed(2) ?? "--.--"}
                    </p>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <p className="has-text-light mx-1">V</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Source</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-primary">
                      {getSource(
                        powerData.batteryVoltage,
                        powerData.poolVoltage
                      )}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </nav>
      <div
        className="has-background-primary-dark"
        style={{ height: "100%" }}
      ></div>
    </div>
  );
};
