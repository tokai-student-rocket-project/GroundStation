import { useContext } from "react";

import {
  SystemDataContext,
  SensingDataContext,
  MissionStatusContext,
} from "../../App/App";

const clampMax = (percent: number): number => {
  return percent > 100 ? 100 : percent;
};

export const LoggerPanel = () => {
  const { systemData } = useContext(SystemDataContext);
  const { sensingData } = useContext(SensingDataContext);
  const { missionStatus } = useContext(MissionStatusContext);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-space-between">
        <h2 className="title is-4 has-text-light has-text-weight-light mb-3">
          LOGGER
        </h2>

        <button
          className={
            !systemData.doLogging
              ? "button is-small is-danger is-inverted has-background-dark"
              : "button is-small is-success is-inverted has-background-dark"
          }
        >
          {systemData.doLogging ? "ON" : "OFF"}
        </button>
      </div>

      <p className="has-text-centered has-text-light">FRAM Usage</p>

      <div className="is-flex is-align-items-center mb-1">
        <div className="has-text-light mx-2" style={{ width: "50px" }}>
          FM
        </div>
        <div style={{ width: "100%" }}>
          <div
            className="has-background-black-ter"
            style={{
              height: "16px",
              width: "100%",
              padding: "1px",
              position: "relative",
            }}
          >
            <div
              className="has-background-danger-dark"
              style={{
                position: "absolute",
                height: "16px",
                width: "1px",
                left: "72%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div
              className="has-background-primary"
              style={{
                position: "absolute",
                height: "14px",
                width: `${clampMax(systemData.loggerUsage ?? 0)}%`,
              }}
            ></div>
          </div>
        </div>

        <div
          className="has-text-light mx-2"
          style={{ width: "60px" }}
        >{`${clampMax(systemData.loggerUsage ?? 0).toFixed(0)}%`}</div>
      </div>

      <div className="is-flex is-align-items-center mb-1">
        <div className="has-text-light mx-2" style={{ width: "50px" }}>
          SM
        </div>
        <div style={{ width: "100%" }}>
          <div
            className="has-background-black-ter"
            style={{
              height: "16px",
              width: "100%",
              padding: "1px",
              position: "relative",
            }}
          >
            <div
              className="has-background-danger-dark"
              style={{
                position: "absolute",
                height: "16px",
                width: "1px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div
              className="has-background-primary"
              style={{
                position: "absolute",
                height: "14px",
                width: `${clampMax(sensingData.loggerUsage ?? 0)}%`,
              }}
            ></div>
          </div>
        </div>

        <div
          className="has-text-light mx-2"
          style={{ width: "60px" }}
        >{`${clampMax(sensingData.loggerUsage ?? 0).toFixed(0)}%`}</div>
      </div>

      <div className="is-flex is-align-items-center">
        <div className="has-text-light mx-2" style={{ width: "50px" }}>
          MM
        </div>
        <div style={{ width: "100%" }}>
          <div
            className="has-background-black-ter"
            style={{
              height: "16px",
              width: "100%",
              padding: "1px",
              position: "relative",
            }}
          >
            <div
              className="has-background-danger-dark"
              style={{
                position: "absolute",
                height: "16px",
                width: "1px",
                left: "61%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div
              className="has-background-primary"
              style={{
                position: "absolute",
                height: "14px",
                width: `${clampMax(missionStatus.loggerUsage ?? 0)}%`,
              }}
            ></div>
          </div>
        </div>

        <div
          className="has-text-light mx-2"
          style={{ width: "60px" }}
        >{`${clampMax(missionStatus.loggerUsage ?? 0).toFixed(0)}%`}</div>
      </div>
    </div>
  );
};
