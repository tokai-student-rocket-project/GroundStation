import { useContext } from "react";

import { AirDataContext } from "../../App/App";

export const OrientationPanel = () => {
  const { airData, setAirData, clearAirData } = useContext(AirDataContext);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-center">
        <p className="heading has-text-light">Orientation</p>
      </div>

      <nav className="level is-justify-content-center">
        <div className="level-item has-text-centered mx-4">
          <div>
            <p className="heading has-text-light">Yaw</p>
            <table width="64px">
              <tbody>
                <tr>
                  <td width="32m">
                    <p className="has-text-light has-text-right">
                      {airData.orientationZ?.toFixed() ?? "---"}
                    </p>
                  </td>
                  <td style={{ verticalAlign: "middle has-text-left" }}>
                    <p className="has-text-light mx-1">°</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <progress
              className="progress is-primary is-small"
              value={(airData.orientationZ ?? 0) + 90}
              max="180"
            ></progress>
          </div>
        </div>
        <div className="level-item has-text-centered mx-4">
          <div>
            <p className="heading has-text-light">Pitch</p>
            <table width="64px">
              <tbody>
                <tr>
                  <td width="32m">
                    <p className="has-text-light has-text-right">
                      {airData.orientationX?.toFixed() ?? "---"}
                    </p>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <p className="has-text-light mx-1 has-text-left">°</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <progress
              className="progress is-primary is-small"
              value={(airData.orientationX ?? 0) + 180}
              max="360"
            ></progress>
          </div>
        </div>
        <div className="level-item has-text-centered mx-4">
          <div>
            <p className="heading has-text-light">Roll</p>
            <table width="64px">
              <tbody>
                <tr>
                  <td width="32m">
                    <p className="has-text-light has-text-right">
                      {airData.orientationY?.toFixed() ?? "---"}
                    </p>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <p className="has-text-light mx-1 has-text-left">°</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <progress
              className="progress is-primary is-small"
              value={(airData.orientationY ?? 0) + 360}
              max="720"
            ></progress>
          </div>
        </div>
      </nav>
    </div>
  );
};
