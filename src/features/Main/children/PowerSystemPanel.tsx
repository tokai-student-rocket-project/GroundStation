import { useContext } from "react";
import { PowerDataContext } from "../../App/App";

export const PowerSystemPanel = () => {
  const { powerData, setPowerData, clearPowerData } =
    useContext(PowerDataContext);

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
      </nav>
      <div
        className="has-background-primary-dark"
        style={{ height: "100%" }}
      ></div>
    </div>
  );
};
