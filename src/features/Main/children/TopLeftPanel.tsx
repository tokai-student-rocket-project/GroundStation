import { useContext } from "react";
import { AirDataContext } from "../../App/App";

const getNorm = (x?: number, y?: number, z?: number): number | undefined => {
  if (x == undefined || y == undefined || z == undefined) return undefined;
  return Math.sqrt(x * x + y * y + z * z);
};

export const TopLeftPanel = () => {
  const { airData, setAirData, clearAirData } = useContext(AirDataContext);

  return (
    <nav className="level is-justify-content-center">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light has-text-left">Altitude</p>
          <table width="100%">
            <tbody>
              <tr>
                <td width="128m">
                  <p className="title has-text-light has-text-left">
                    {airData.altitude?.toFixed(2) ?? "---.--"}
                  </p>
                </td>
                <td style={{ verticalAlign: "bottom" }}>
                  <p className="subtitle has-text-light mx-2 mb-1">m</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light has-text-left">Climb Rate</p>
          <table width="100%">
            <tbody>
              <tr>
                <td width="128m">
                  <p className="title has-text-light has-text-left">
                    {airData.climbRate?.toFixed(2) ?? "---.--"}
                  </p>
                </td>
                <td style={{ verticalAlign: "bottom" }}>
                  <p className="subtitle has-text-light mx-2 mb-1">m/s</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light has-text-left">Acceleration</p>
          <table width="100%">
            <tbody>
              <tr>
                <td width="96m">
                  <p className="title has-text-light has-text-left">
                    <p className="title has-text-light">
                      {getNorm(
                        airData.accelerationX,
                        airData.accelerationY,
                        airData.accelerationZ
                      )?.toFixed(2) ?? "--.--"}
                    </p>
                  </p>
                </td>
                <td style={{ verticalAlign: "bottom" }}>
                  <p className="subtitle has-text-light mx-2 mb-1">
                    m/s
                    <span style={{ fontSize: "0.75em", verticalAlign: "top" }}>
                      2
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </nav>
  );
};
