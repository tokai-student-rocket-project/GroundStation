import { useContext } from "react";

import { SystemDataContext } from "../../App/App";

const stateToText = (state?: boolean): string => {
  if (state == undefined) return "N/A";
  return state == true ? "ON" : "OFF";
};

const stateToColor = (state?: boolean): string => {
  if (state == undefined) return "#7A7A7A";
  return state == true ? "#23D160" : "#FF385F";
};

const stateToLabelColor = (state?: boolean): string => {
  return state == undefined ? "#7A7A7A" : "whitesmoke";
};

export const SystemStatus = () => {
  const { systemData, setSystemData, clearSystemData } =
    useContext(SystemDataContext);

  return (
    <div className="box has-background-dark p-3">
      <h2 className="title is-4 has-text-light has-text-weight-light">
        SYSTEM STATUS
      </h2>
      <div className="box has-background-black-ter p-2">
        <table width="100%">
          <tbody>
            <tr>
              <td width="50%">
                <p
                  className="has-text-right"
                  style={{ color: stateToLabelColor(systemData.cameraStatus) }}
                >
                  Camera :
                </p>
              </td>
              <td>
                <p
                  className="has-text-centered has-text-weight-semibold"
                  style={{ color: stateToColor(systemData.cameraStatus) }}
                >
                  {stateToText(systemData.cameraStatus)}
                </p>
              </td>
            </tr>
            <tr>
              <td width="50%">
                <p
                  className="has-text-right"
                  style={{ color: stateToLabelColor(systemData.sn3Status) }}
                >
                  Shiranui Ⅲ :
                </p>
              </td>
              <td>
                <p
                  className="has-text-centered has-text-weight-semibold"
                  style={{ color: stateToColor(systemData.sn3Status) }}
                >
                  {stateToText(systemData.sn3Status)}
                </p>
              </td>
            </tr>
            <tr>
              <td width="50%">
                <p
                  className="has-text-right"
                  style={{ color: stateToLabelColor(undefined) }}
                >
                  Shiranui Ⅳ :
                </p>
              </td>
              <td>
                <p
                  className="has-text-centered has-text-weight-semibold"
                  style={{ color: stateToColor(undefined) }}
                >
                  {stateToText(undefined)}
                </p>
              </td>
            </tr>
            <tr>
              <td width="50%">
                <p
                  className="has-text-right"
                  style={{ color: stateToLabelColor(systemData.doLogging) }}
                >
                  Logger :
                </p>
              </td>
              <td>
                <p
                  className="has-text-centered has-text-weight-semibold"
                  style={{ color: stateToColor(systemData.doLogging) }}
                >
                  {stateToText(systemData.doLogging)}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
