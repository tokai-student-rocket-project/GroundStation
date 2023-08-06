import { useContext } from "react";

import { MissionStatusContext } from "../../App/App";

const getPhase = (doLogging?: boolean, doSending?: boolean): string => {
  if (doLogging == undefined || doSending == undefined) return "------";

  if (doLogging) return "LOGGING";
  if (doSending) return "SENDING";
  return "STANDBY";
};

const getProgress = (loggerOffset?: number, senderOffset?: number): number => {
  if (loggerOffset == undefined || senderOffset == undefined) return 0;

  return (senderOffset / loggerOffset) * 100;
};

const getKiroBytes = (offset?: number): number | undefined => {
  if (offset == undefined) return undefined;

  return offset / 8 / 1000;
};

export const MissionStatus = () => {
  const { missionStatus } = useContext(MissionStatusContext);

  return (
    <div className="box has-background-dark p-3">
      <h2 className="title is-4 has-text-light has-text-weight-light">
        MISSION STATUS
      </h2>
      <div className="box has-background-black-ter p-2 mb-2">
        <table width="100%">
          <tbody>
            <tr>
              <td width="50%">
                <p className="has-text-right has-text-light">Phase :</p>
              </td>
              <td>
                <p className="has-text-centered has-text-light">
                  {getPhase(missionStatus.doLogging, missionStatus.doSending)}
                </p>
              </td>
            </tr>
            <tr>
              <td width="50%">
                <p className="has-text-right has-text-light">Data Rate :</p>
              </td>
              <td>
                <p className="has-text-centered has-text-light">
                  {`${missionStatus.dataRate?.toFixed(0) ?? "----"} Hz`}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="has-text-centered has-text-light">Lazy Sending</p>

      <div style={{ margin: "0 16px" }}>
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
            className="has-background-primary"
            style={{
              position: "absolute",
              height: "14px",
              width: `${getProgress(
                missionStatus.loggerOffset,
                missionStatus.senderOffset
              )}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="is-flex" style={{ margin: "0 16px" }}>
        <div
          className="has-text-light mx-2 is-size-7"
          style={{ width: "30px" }}
        >{`[${getProgress(
          missionStatus.loggerOffset,
          missionStatus.senderOffset
        ).toFixed(0)}%]`}</div>
        <div
          className="has-text-light mx-2 is-size-7"
          style={{ width: "240px" }}
        >{`${getKiroBytes(missionStatus.senderOffset)?.toFixed(2) ?? "--"} / ${
          getKiroBytes(missionStatus.loggerOffset)?.toFixed(2) ?? "--"
        } kBytes`}</div>
      </div>
    </div>
  );
};
