import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import {
  getColorFromRssi,
  getColorFromSnr,
  getColorFromDataRate,
} from "../../../../../utils/Color";

type Props = {
  rssi?: number;
  snr?: number;
  dataRate?: number;
  targetDataRate: number;
};

export const SpecStatusBox = ({
  rssi,
  snr,
  dataRate,
  targetDataRate,
}: Props) => {
  return (
    <div className="box has-background-black-ter p-2">
      <table width="100%">
        <tbody>
          <tr>
            <td>
              <p className=" has-text-light has-text-right is-size-7">RSSI :</p>
            </td>
            <td width="40m">
              <p className=" has-text-light has-text-right is-size-7">
                {rssi?.toFixed() ?? "---"}
              </p>
            </td>
            <td>
              <p className=" has-text-light has-text-left is-size-7 ml-2">
                dBm
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={getColorFromRssi(rssi)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className=" has-text-light has-text-right is-size-7">SNR :</p>
            </td>
            <td>
              <p className=" has-text-light has-text-right is-size-7">
                {snr?.toFixed() ?? "--"}
              </p>
            </td>
            <td>
              <p className="has-text-light has-text-left is-size-7 ml-2">dBm</p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={getColorFromSnr(snr)}
              />
            </td>
          </tr>

          <tr>
            <td>
              <p className=" has-text-light has-text-right is-size-7">DR :</p>
            </td>
            <td>
              <p className=" has-text-light has-text-right is-size-7">
                {dataRate?.toFixed() ?? "--"}
              </p>
            </td>
            <td>
              <p className="has-text-light has-text-left is-size-7 ml-2">Hz</p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={getColorFromDataRate(dataRate, targetDataRate)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
