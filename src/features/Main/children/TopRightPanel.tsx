import { useContext, useState, useEffect } from "react";

import { AirDataContext } from "../../App/App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

export const TopRightPanel = () => {
  const { airData, setAirData, clearAirData } = useContext(AirDataContext);
  const [now, setNow] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const nowRaw = new Date();
      setNow(`${nowRaw.toDateString()}\n${nowRaw.toTimeString()}`);
    }, 1000);
  }, []);

  return (
    <nav className="level is-justify-content-center">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">GNSS</p>
          <p className="has-text-light">{"N  --°--'--.--\""}</p>
          <p className="has-text-light">{"E ---°--'--.--\""}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Temperature</p>
          <table width="100%">
            <tbody>
              <tr>
                <td>
                  <FontAwesomeIcon
                    icon={faTemperatureThreeQuarters}
                    size="lg"
                    className="has-text-light mx-2"
                  />
                </td>
                <td width="40m">
                  <p className="has-text-light">
                    {airData.outsideTemperature?.toFixed(1) ?? "--.-"}
                  </p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p className="has-text-light mx-1">℃</p>
                </td>
              </tr>
              <tr>
                <td>
                  <FontAwesomeIcon
                    icon={faSnowflake}
                    size="lg"
                    className="has-text-light mx-2"
                  />
                </td>
                <td width="40m">
                  <p className="has-text-light">{"--.-"}</p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p className="has-text-light mx-1">℃</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Current Time</p>
          <p className="has-text-light" style={{ maxWidth: "200px" }}>
            {now}
          </p>
        </div>
      </div>
    </nav>
  );
};
