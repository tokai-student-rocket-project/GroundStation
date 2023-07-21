import { useState } from "react";
import { SerialPort } from "serialport";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faGear } from "@fortawesome/free-solid-svg-icons";

type Props = {
  changeMissionDataSerialport: (newSerialport?: string) => void;
  changeAirDataSerialport: (newSerialport?: string) => void;
  changeSystemDataSerialport: (newSerialport?: string) => void;
};

type SerialPortDisplayable = {
  path: string;
  text: string;
};

export const SerialportSelector = ({
  changeMissionDataSerialport,
  changeAirDataSerialport,
  changeSystemDataSerialport,
}: Props) => {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  const [serialports, setSerialports] = useState<SerialPortDisplayable[]>([]);

  const openSelector = () => {
    updateSerialports();
    setModalIsActive(true);
  };
  const closeSelector = () => setModalIsActive(false);

  const updateSerialports = () => {
    SerialPort.list().then((ports) => {
      const newSerialports: SerialPortDisplayable[] = [{ path: "", text: "" }];

      ports
        .filter((port) => {
          return port.manufacturer === "Arduino LLC";
        })
        .map((port) => {
          newSerialports.push({
            path: port.path,
            text:
              port.path + (port.manufacturer ? ` - ${port.manufacturer}` : ""),
          });
        });

      setSerialports(newSerialports);
    });
  };

  const clearSerialports = () => {
    changeMissionDataSerialport(undefined);
    changeAirDataSerialport(undefined);
    changeSystemDataSerialport(undefined);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faGear}
        className="icon is-small has-text-grey-light mx-2"
        cursor="pointer"
        onClick={openSelector}
      />
      <FontAwesomeIcon
        icon={faBan}
        className="icon is-small has-text-grey-light mx-2"
        cursor="pointer"
        onClick={clearSerialports}
      />
      <div className={`modal ${modalIsActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={closeSelector}></div>
        <div className="modal-content">
          <div className="box has-background-dark p-3">
            <div className="is-flex is-justify-content-space-between">
              <h2 className="title is-4 has-text-light has-text-weight-light">
                Serialport
              </h2>
              <button
                className="delete is-large"
                onClick={closeSelector}
              ></button>
            </div>

            <div className="field">
              <label className="label has-text-light">Mission Data</label>
              <div className="control">
                <div className="select" onClick={updateSerialports}>
                  <select
                    onChange={(option) =>
                      changeMissionDataSerialport(option.target.value)
                    }
                  >
                    {serialports.map((serialport) => (
                      <option key={serialport.path} value={serialport.path}>
                        {serialport.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label has-text-light">Air Data</label>
              <div className="control">
                <div className="select" onClick={updateSerialports}>
                  <select
                    onChange={(option) =>
                      changeAirDataSerialport(option.target.value)
                    }
                  >
                    {serialports.map((serialport) => (
                      <option key={serialport.path} value={serialport.path}>
                        {serialport.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label has-text-light">System Data</label>
              <div className="control">
                <div className="select" onClick={updateSerialports}>
                  <select
                    onChange={(option) =>
                      changeSystemDataSerialport(option.target.value)
                    }
                  >
                    {serialports.map((serialport) => (
                      <option key={serialport.path} value={serialport.path}>
                        {serialport.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
