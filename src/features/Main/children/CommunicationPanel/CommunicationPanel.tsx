import { useEffect, useState } from "react";
import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";

import { RssiIcon } from "./children/RssiIcon";
import { SerialportSelector } from "./children/SerialportSelector";
import { SpecBox } from "./children/SpecBox";
import { SpecStatusBox } from "./children/SpecStatusBox";
import { RxStatusBox } from "./children/RxStatusBox";

export const CommunicationPanel = () => {
  const [rssi, setRssi] = useState<number | undefined>(undefined);
  const [snr, setSnr] = useState<number | undefined>(undefined);
  const [dataRate, setDataRate] = useState<number | undefined>(undefined);

  useEffect(() => {
    let oldTime = new Date().getTime();

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
      <div className="is-flex is-justify-content-space-between">
        <h2 className="title is-4 has-text-light has-text-weight-light">
          COMMUNICATION
        </h2>

        <div>
          <RssiIcon rssi={rssi} />
          <SerialportSelector />
        </div>
      </div>

      <div className="columns is-variable is-1">
        <div className="column is-4">
          <p className="has-text-centered has-text-light">Mission Data</p>
          <SpecBox frequency={925_800_000} bandwidth={500_000} />
          <SpecStatusBox
            rssi={undefined}
            snr={undefined}
            dataRate={undefined}
            targetDataRate={50}
          />
        </div>

        <div className="column is-4">
          <p className="has-text-centered has-text-light">Air Data</p>
          <SpecBox frequency={923_800_000} bandwidth={500_000} />
          <SpecStatusBox
            rssi={rssi}
            snr={snr}
            dataRate={dataRate}
            targetDataRate={20}
          />
        </div>

        <div className="column is-4">
          <p className="has-text-centered has-text-light">System Data</p>
          <SpecBox frequency={921_800_000} bandwidth={250_000} />
          <SpecStatusBox
            rssi={undefined}
            snr={undefined}
            dataRate={undefined}
            targetDataRate={10}
          />
        </div>
      </div>

      <RxStatusBox />
    </div>
  );
};
