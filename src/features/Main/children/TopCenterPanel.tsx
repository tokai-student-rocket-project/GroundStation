import { useContext } from "react";

import { SystemDataContext } from "../../App/App";

const flightTimeToText = (flightTime?: number): string => {
  if (flightTime == undefined) return "--.--";

  // uint32_t の -1
  if (flightTime == 4294967295) return "--.--";

  return (flightTime / 1000.0).toFixed(2);
};

export const TopCenterPanel = () => {
  const { systemData } = useContext(SystemDataContext);

  return (
    <div className="is-flex is-align-items-end">
      <table width="100%">
        <tbody>
          <tr>
            <td style={{ verticalAlign: "bottom" }}>
              <p className="subtitle is-2 has-text-light mr-2 mb-0">X+</p>
            </td>
            <td width="120m" style={{ verticalAlign: "bottom" }}>
              <p className="subtitle is-2 has-text-light mb-0 has-text-left">
                {flightTimeToText(systemData.flightTime)}
              </p>
            </td>
            <td style={{ verticalAlign: "bottom" }}>
              <p className="subtitle is-3 has-text-light ml-2 mb-0">sec</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
