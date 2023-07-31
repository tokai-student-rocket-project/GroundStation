type Props = {
  currentPosition?: number;
  currentDesiredPosition?: number;
  currentVelocity?: number;
  isWaiting?: boolean;
  mcuTemperature?: number;
  motorTemperature?: number;
  inputVoltage?: number;
  current?: number;
};

const modeToString = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "------";

  return isWaiting ? "WAITING" : "LAUNCH";
};

export const ValveSummary = ({
  currentPosition,
  currentDesiredPosition,
  currentVelocity,
  isWaiting,
  mcuTemperature,
  motorTemperature,
  inputVoltage,
  current,
}: Props) => {
  return (
    <>
      <nav className="level is-justify-content-center mb-2">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading has-text-light">Position</p>
            <table width="100%">
              <tbody>
                <tr>
                  <td width="64m">
                    <p className="has-text-light">
                      {`${currentPosition?.toFixed(2) ?? "--.--"} °`}
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
                      {`${currentDesiredPosition?.toFixed(2) ?? "--.--"} °`}
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
                      {`${currentVelocity?.toFixed(2) ?? "--.--"} dps`}
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
                      {modeToString(isWaiting)}
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
                              {`${mcuTemperature?.toFixed() ?? "--"} ℃`}
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
                              {`${motorTemperature?.toFixed() ?? "--"} ℃`}
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
                              {`${inputVoltage?.toFixed(1) ?? "--.-"} V`}
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
                              {`${current?.toFixed() ?? "--.--"} A`}
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
    </>
  );
};
