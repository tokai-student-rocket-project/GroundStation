import { useContext, useState, useEffect } from "react";
import { shell } from "electron";

import { AirDataContext } from "../../App/App";
import { PositionDataContext } from "../../App/App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faSnowflake,
  faSatellite,
  faRotate,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const degToDms = (deg?: number): string | undefined => {
  if (deg == undefined) return undefined;

  const d = Math.trunc(deg);
  const ms = parseFloat("0." + deg.toString().split(".")[1]) * 60;
  const m = Math.trunc(ms);
  const s = parseFloat("0." + ms.toString().split(".")[1]) * 60;

  return `${d.toFixed()}°${m.toFixed()}'${s.toFixed(2)}"`;
};

const getFixType = (type?: number): string => {
  if (type == undefined) return "--";

  if (type == 3) return "3D";
  if (type == 4) return "DR";
  return "??";
};

export const TopRightPanel = () => {
  const { airData } = useContext(AirDataContext);
  const { positionData } = useContext(PositionDataContext);
  const [now, setNow] = useState<Date>(new Date());

  const openGoogleMap = () => {
    const latitude = positionData.latitude;
    const longitude = positionData.longitude;

    if (latitude == undefined || longitude == undefined) return;

    shell.openExternal(
      `https://www.google.com/maps?q=${latitude},${longitude}&z=17&t=k`
    );
  };

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 1000);
  }, []);

  return (
    <nav className="level is-justify-content-center is-align-items-start">
      <div className="level-item has-text-centered is-align-items-end">
        <div className="is-flex">
          <div>
            <p className="heading has-text-light has-text-left">GNSS</p>
            <div className="is-flex is-align-items-center">
              <FontAwesomeIcon
                icon={faSatellite}
                className="has-text-light mx-2"
              />
              <p className="has-text-light">{positionData.satellites ?? "-"}</p>
            </div>
            <div className="is-flex is-align-items-center">
              {positionData.isFixed ?? false ? (
                <>
                  <FontAwesomeIcon
                    icon={faCrosshairs}
                    size="xs"
                    className="has-text-light mx-2"
                  />
                  <p className="has-text-light">
                    {getFixType(positionData.fixType)}
                  </p>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faRotate}
                    size="xs"
                    spin
                    className="has-text-light mx-2"
                  />
                  <p className="has-text-light">--</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div style={{ width: "16px" }}></div>
        <div>
          <a onClick={openGoogleMap}>
            <p className="has-text-light has-text-right">
              {`${degToDms(positionData.latitude) ?? "--°--'--.--\""} N`}
            </p>
            <p className="has-text-light has-text-right">
              {`${degToDms(positionData.longitude) ?? "---°--'--.--\""} E`}
            </p>
          </a>
        </div>
        <div style={{ width: "16px" }}></div>
        <div style={{ width: "90px" }}>
          <a onClick={openGoogleMap}>
            <p className="has-text-light has-text-left">
              {`${positionData.altitude?.toFixed(2) ?? "--.--"} m`}
            </p>
            <p className="has-text-light has-text-left">
              {`${positionData.speed?.toFixed(2) ?? "--.--"} m/s`}
            </p>
          </a>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light has-text-left">Temperature</p>
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
                  <p className="has-text-light">
                    {airData.coldTemperature?.toFixed(1) ?? "--.-"}
                  </p>
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
          <p className="heading has-text-light has-text-left">Current Time</p>
          <p
            className="has-text-light has-text-left"
            style={{ maxWidth: "160px" }}
          >
            {`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`}
          </p>
          <p
            className="has-text-light has-text-left"
            style={{ maxWidth: "160px" }}
          >
            {`${now.toLocaleTimeString()}`}
          </p>
        </div>
      </div>
    </nav>
  );
};
