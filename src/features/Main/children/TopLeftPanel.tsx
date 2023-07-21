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
          <p className="heading has-text-light">Altitude</p>
          <div className="is-flex is-align-items-end">
            <p className="title has-text-light">
              {airData.altitude?.toFixed(2) ?? "---.--"}
            </p>
            <p className="subtitle has-text-light mx-2 mb-1">m</p>
          </div>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Climb Rate</p>
          <div className="is-flex is-align-items-end">
            <p className="title has-text-light">{"--.--"}</p>
            <p className="subtitle has-text-light mx-2 mb-1">m/s</p>
          </div>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Acceleration</p>
          <div className="is-flex is-align-items-end">
            <p className="title has-text-light">
              {getNorm(
                airData.accelerationX,
                airData.accelerationY,
                airData.accelerationZ
              )?.toFixed(2) ?? "--.--"}
            </p>
            <p className="subtitle has-text-light mx-2 mb-1">
              m/s
              <span style={{ fontSize: "0.75em", verticalAlign: "top" }}>
                2
              </span>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
