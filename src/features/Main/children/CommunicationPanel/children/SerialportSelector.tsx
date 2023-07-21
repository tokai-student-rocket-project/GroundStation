import { useState } from "react";
import { SerialPort } from "serialport";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export const SerialportSelector = () => {
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  const [serialports, setSerialports] = useState<string[]>([]);

  const openSelector = () => {
    updateSerialports();
    setModalIsActive(true);
  };
  const closeSelector = () => setModalIsActive(false);

  const updateSerialports = () => {
    SerialPort.list().then((ports) => {
      const newSerialports = ports.map((port) => port.path);
      setSerialports(newSerialports);
    });
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faGear}
        className="icon is-small has-text-grey-light mx-2"
        cursor="pointer"
        onClick={openSelector}
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
              <label className="label has-text-light">Air Data</label>
              <div className="control">
                <div className="select" onClick={updateSerialports}>
                  <select>
                    {serialports.map((serialport) => (
                      <option key={serialport}>{serialport}</option>
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
