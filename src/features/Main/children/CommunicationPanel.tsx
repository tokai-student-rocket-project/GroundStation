import { useEffect, useState } from "react";

import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";

export const CommunicationPanel = () => {
  const [rssi, setRssi] = useState<number | null>(null);
  const [snr, setSnr] = useState<number | null>(null);
  const [dataRate, setDataRate] = useState<number | null>(null);

  useEffect(() => {
    let oldTime = new Date().getTime();

    SerialPort.list().then((ports) => {
      ports.forEach((port) => {
        console.log(`${port.path} - ${port.manufacturer}`);
      });
    });

    const serialport = new SerialPort({
      path: "/dev/tty.usbmodem11201",
      baudRate: 115200,
    });

    const parser = serialport.pipe(new ReadlineParser({ delimiter: "\n" }));

    parser.on("data", (data) => {
      const json = JSON.parse(data);

      setRssi(json.PacketInfo.RSSI);
      setSnr(json.PacketInfo.SNR);

      const nowTime = new Date().getTime();
      const timeDiff = nowTime - oldTime;
      setDataRate(1000 / timeDiff);
      oldTime = nowTime;
    });
  }, []);

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
                  <td width="40m">
                    <p className=" has-text-light has-text-right is-size-7">
                      {"---"}
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-light has-text-left is-size-7 ml-2">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-centered is-size-7">
                      ●
                    </p>
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
                    <p className="has-text-light has-text-left is-size-7 ml-2">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-centered is-size-7">
                      ●
                    </p>
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
                    <p className="has-text-light has-text-left is-size-7 ml-2">
                      Hz
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-centered is-size-7">
                      ●
                    </p>
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
                    <p className=" has-text-grey has-text-centered is-size-7">
                      ●
                    </p>
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
                      {snr?.toFixed() ?? "--"}
                    </p>
                  </td>
                  <td>
                    <p className="has-text-light has-text-left is-size-7 ml-2">
                      dBm
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-centered is-size-7">
                      ●
                    </p>
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
                      {dataRate?.toFixed() ?? "--"}
                    </p>
                  </td>
                  <td>
                    <p className="has-text-light has-text-left is-size-7 ml-2">
                      Hz
                    </p>
                  </td>
                  <td>
                    <p className=" has-text-grey has-text-centered is-size-7">
                      ●
                    </p>
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
                  RSSI :
                </p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  {"----"}
                </p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">dBm</p>
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
                <p className=" has-text-light has-text-right is-size-7">dBm</p>
              </td>
              <td>
                <p className=" has-text-grey has-text-right is-size-7">●</p>
              </td>
            </tr>
            <tr>
              <td>
                <p className=" has-text-light has-text-right is-size-7">DR :</p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">
                  {"--"}
                </p>
              </td>
              <td>
                <p className=" has-text-light has-text-right is-size-7">Hz</p>
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
