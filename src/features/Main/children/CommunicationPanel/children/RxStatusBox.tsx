import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  airDataRx: boolean;
  positionDataRx: boolean;
};

export const RxStatusBox = ({ airDataRx, positionDataRx }: Props) => {
  return (
    <div className="box has-background-black-ter p-2">
      <table width="100%">
        <tbody>
          <tr>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">
                Altitude :
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={airDataRx ? "#23D160" : "#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">
                Temperature :
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={airDataRx ? "#23D160" : "#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">
                Orientation :
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={airDataRx ? "#23D160" : "#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">
                Acceleration :
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={airDataRx ? "#23D160" : "#7A7A7A"}
                className="mx-2"
              />
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">Valve :</p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={"#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">Power :</p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={"#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">GNSS :</p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={positionDataRx ? "#23D160" : "#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">
                Flight Mode :
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={"#7A7A7A"}
                className="mx-2"
              />
            </td>
          </tr>
          <tr>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">
                System Status :
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={"#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">
                Sensing Status :
              </p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={"#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">Event :</p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={"#7A7A7A"}
                className="mx-2"
              />
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <p className="has-text-light has-text-right is-size-7">Error :</p>
            </td>
            <td>
              <FontAwesomeIcon
                icon={faCircle}
                size="2xs"
                color={"#7A7A7A"}
                className="mx-2"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
