import { useContext } from "react";

import { SystemDataContext, SensingDataContext } from "../../App/App";

export const LoggerPanel = () => {
  const { systemData } = useContext(SystemDataContext);
  const { sensingData } = useContext(SensingDataContext);

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

      <p className="has-text-light">FlightModule</p>
      <div className="is-flex is-align-items-center mb-2">
        <div style={{ width: "100%" }}>
          <div
            className="has-background-black-ter"
            style={{
              height: "20px",
              width: "50%",
              padding: "1px",
              position: "relative",
            }}
          >
            <div
              className="has-background-danger-dark"
              style={{
                position: "absolute",
                height: "20px",
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
                height: "18px",
                width: `${systemData.loggerUsage ?? 0}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="has-text-light mx-2" style={{ width: "50px" }}>{`${
          systemData.loggerUsage?.toFixed(0) ?? "0"
        }%`}</div>
      </div>

      <p className="has-text-light">SensingModule</p>
      <div className="is-flex is-align-items-center">
        <div style={{ width: "100%" }}>
          <div
            className="has-background-black-ter"
            style={{
              height: "20px",
              width: "100%",
              padding: "1px",
              position: "relative",
            }}
          >
            <div
              className="has-background-danger-dark"
              style={{
                position: "absolute",
                height: "20px",
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
                height: "18px",
                width: `${sensingData.loggerUsage ?? 0}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="has-text-light mx-2" style={{ width: "50px" }}>{`${
          sensingData.loggerUsage?.toFixed(0) ?? "0"
        }%`}</div>
      </div>
    </div>
  );
};
