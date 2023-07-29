import { useContext, useState } from "react";
import { ValveDataContext } from "../../App/App";

const modeToString = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "------";

  return isWaiting ? "WAITING" : "LAUNCH";
};

export const ValveSystemPanel = () => {
  const { valveData, setValveData, clearValveData } =
    useContext(ValveDataContext);

  return (
    <div
      className="box has-background-dark p-3 is-flex is-flex-direction-column"
      style={{ height: "100%" }}
    >
      <h2 className="title is-4 has-text-light has-text-weight-light">
        VALVE SYSTEM
      </h2>

      <nav className="level is-justify-content-center mb-2">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Position</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-light">
                      {`${valveData.currentPosition?.toFixed(2) ?? "--.--"} °`}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Target</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-light">
                      {`${
                        valveData.currentDesiredPosition?.toFixed(2) ?? "--.--"
                      } °`}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Velocity</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="96m">
                    <p className="has-text-light">
                      {`${
                        valveData.currentVelocity?.toFixed(2) ?? "--.--"
                      } dps`}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Mode</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-primary has-text-weight-semibold">
                      {modeToString(valveData.isWaiting)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </nav>

      <table width="100%" className="mt-4">
        <tbody>
          <tr>
            <td width="50%">
              <p className="heading has-text-light has-text-centered">
                Temperature
              </p>
              <nav className="level is-justify-content-center mb-2">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading has-text-light">MCU</p>
                    <table>
                      <tbody>
                        <tr>
                          <td width="64m">
                            <p className="has-text-light">
                              {`${
                                valveData.mcuTemperature?.toFixed() ?? "--"
                              } ℃`}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading has-text-light">Motor</p>
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td width="64m">
                            <p className="has-text-light">
                              {`${
                                valveData.motorTemperature?.toFixed() ?? "--"
                              } ℃`}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </nav>
            </td>

            <td width="50%">
              <p className="heading has-text-light has-text-centered">Power</p>
              <nav className="level is-justify-content-center mb-2">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading has-text-light">Voltage</p>
                    <table>
                      <tbody>
                        <tr>
                          <td width="64m">
                            <p className="has-text-light">
                              {`${
                                valveData.inputVoltage?.toFixed(1) ?? "--.-"
                              } V`}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading has-text-light">Current</p>
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td width="64m">
                            <p className="has-text-light">
                              {`${valveData.current?.toFixed() ?? "--.--"} A`}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </nav>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        className="has-background-primary-dark"
        style={{ height: "100%" }}
      ></div>
    </div>
  );
};
