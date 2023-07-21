import { SerialPort } from "serialport";

SerialPort.list().then((ports) => {
  ports.forEach((port) => {
    console.log(port.path);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

export const CommunicationPanel = () => {
  return (
    <div className="box has-background-dark p-3">
      <h2 className="title is-4 has-text-light has-text-weight-light">
        COMMUNICATION
      </h2>
      <div className="columns is-variable is-1">
        <div className="column is-4">
          <p className="has-text-centered has-text-light">Mission Data</p>
          <div className="box has-background-black-ter p-1 mb-2">
            <div className="is-flex is-justify-content-space-evenly">
              <p className=" has-text-light has-text-right is-size-7">
                925.8 MHz
              </p>
              <p className=" has-text-light has-text-left is-size-7">500 kHz</p>
            </div>
          </div>
          <div className="box has-background-black-ter p-2">
            <table width="100%">
              <tbody>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      RSSI :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"----"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      SNR :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"--"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      DR :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"--"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      Hz
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="column is-4">
          <p className="has-text-centered has-text-light">Air Data</p>
          <div className="box has-background-black-ter p-1 mb-2">
            <div className="is-flex is-justify-content-space-evenly">
              <p className=" has-text-light has-text-right is-size-7">
                923.8 MHz
              </p>
              <p className=" has-text-light has-text-left is-size-7">500 kHz</p>
            </div>
          </div>
          <div className="box has-background-black-ter p-2">
            <table width="100%">
              <tbody>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      RSSI :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"----"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      SNR :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"--"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      DR :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"--"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      Hz
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="column is-4">
          <p className="has-text-centered has-text-light">System Data</p>
          <div className="box has-background-black-ter p-1 mb-2">
            <div className="is-flex is-justify-content-space-evenly">
              <p className=" has-text-light has-text-right is-size-7">
                921.8 MHz
              </p>
              <p className=" has-text-light has-text-left is-size-7">250 kHz</p>
            </div>
          </div>
          <div className="box has-background-black-ter p-2">
            <table width="100%">
              <tbody>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      RSSI :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"----"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      SNR :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"--"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      DR :
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      {"--"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-right is-size-7">
                      Hz
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-right is-size-7">●</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="box has-background-black-ter p-2">
        <table width="100%">
          <tbody>
            <tr>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Altitude :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Temperature :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Orientation :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Acceleration :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Valve :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Power :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  GNSS :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Flight Mode :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  System Status :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Sensing Status :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Event :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  Error :
                </p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
