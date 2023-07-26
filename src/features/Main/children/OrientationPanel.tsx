import { useContext } from "react";

import { AirDataContext } from "../../App/App";

export const OrientationPanel = () => {
  const { airData, setAirData, clearAirData } = useContext(AirDataContext);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-center">
        <p className="heading has-text-light">Orientation</p>
      </div>

      <div className="is-flex">
        <div className="mx-4">
          <div className="my-2">
            <p className="heading has-text-light has-text-centered">Yaw</p>
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
          </div>
          <div className="my-2">
            <p className="heading has-text-light has-text-centered">Pitch</p>
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
          </div>
          <div className="my-2">
            <p className="heading has-text-light has-text-centered">Roll</p>
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
          </div>
        </div>

        <div className="mt-2">
          <div className="is-flex">
            <div style={{ height: "15px", width: "15px" }}></div>
            <div
              className="has-background-black-ter"
              style={{ height: "15px", width: "200px", position: "relative" }}
            >
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "1px",
                  width: "200px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "15px",
                  width: "1px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "15px",
                  width: "1px",
                  left: "0%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "15px",
                  width: "1px",
                  left: "100%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <p
                className="has-text-light"
                style={{
                  position: "absolute",
                  left: `${(((airData.orientationZ ?? 0) + 90) / 180) * 100}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                ◆
              </p>
            </div>
          </div>
          <div className="is-flex">
            <div
              className="has-background-black-ter"
              style={{ height: "200px", width: "15px", position: "relative" }}
            >
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "200px",
                  width: "1px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "1px",
                  width: "15px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "1px",
                  width: "15px",
                  left: "50%",
                  top: "0%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "1px",
                  width: "15px",
                  left: "50%",
                  top: "25%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "1px",
                  width: "15px",
                  left: "50%",
                  top: "75%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <div
                className="has-background-grey"
                style={{
                  position: "absolute",
                  height: "1px",
                  width: "15px",
                  left: "50%",
                  top: "100%",
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
              <p
                className="has-text-light"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: `${(((airData.orientationX ?? 0) + 180) / 360) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                ◆
              </p>
            </div>
            <div
              className="has-background-primary-dark"
              style={{ height: "200px", width: "200px" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
