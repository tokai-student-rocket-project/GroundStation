import { useContext, useEffect, useState } from "react";
import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";

import { AirDataContext } from "../../../App/App";
import { PositionDataContext } from "../../../App/App";
import { SystemDataContext } from "../../../App/App";
import { PowerDataContext } from "../../../App/App";

import { RssiIcon } from "./children/RssiIcon";
import { SerialportSelector } from "./children/SerialportSelector";
import { SpecBox } from "./children/SpecBox";
import { SpecStatusBox } from "./children/SpecStatusBox";
import { RxStatusBox } from "./children/RxStatusBox";

type SpecStatus = {
  rssi?: number;
  snr?: number;
  dataRate: number;
};

export const CommunicationPanel = () => {
  const [missionDataSerialport, setMissionDataSerialport] =
    useState<SerialPort>();
  const [missionDataSpecStatus, setMissionDataSpecStatus] =
    useState<SpecStatus>();

  const [airDataSerialport, setAirDataSerialport] = useState<SerialPort>();
  const [airDataSpecStatus, setAirDataSpecStatus] = useState<SpecStatus>();
  const { airData, setAirData, clearAirData } = useContext(AirDataContext);

  const [systemDataSerialport, setSystemDataSerialport] =
    useState<SerialPort>();
  const [systemDataSpecStatus, setSystemDataSpecStatus] =
    useState<SpecStatus>();
  const { positionData, setPositionData, clearPositionData } =
    useContext(PositionDataContext);
  const { systemData, setSystemData, clearSystemData } =
    useContext(SystemDataContext);
  const { powerData, setPowerData, clearPowerData } =
    useContext(PowerDataContext);

  const [airDataRx, setAirDataRx] = useState<boolean>(false);
  const [positionDataRx, setPositionDataRx] = useState<boolean>(false);
  const [systemDataRx, setSystemDataRx] = useState<boolean>(false);
  const [powerDataRx, setPowerDataRx] = useState<boolean>(false);

  const changeMissionDataSerialport = (newSerialport?: string) => {
    if (missionDataSerialport?.isOpen) missionDataSerialport.close();
    setMissionDataSpecStatus(undefined);

    if (!newSerialport) return;
    if (newSerialport === "") return;
    setMissionDataSerialport(
      new SerialPort({
        path: newSerialport,
        baudRate: 115200,
        autoOpen: false,
      })
    );
  };

  const changeAirDataSerialport = (newSerialport?: string) => {
    if (airDataSerialport?.isOpen) airDataSerialport.close();
    setAirDataSpecStatus(undefined);
    setAirDataRx(false);
    clearAirData();

    if (!newSerialport) return;
    if (newSerialport === "") return;
    setAirDataSerialport(
      new SerialPort({
        path: newSerialport,
        baudRate: 115200,
        autoOpen: false,
      })
    );
  };

  const changeSystemDataSerialport = (newSerialport?: string) => {
    if (systemDataSerialport?.isOpen) systemDataSerialport.close();
    setSystemDataSpecStatus(undefined);
    setPositionDataRx(false);
    setSystemDataRx(false);
    setPowerDataRx(false);
    clearPositionData();
    clearSystemData();
    clearPowerData();

    if (!newSerialport) return;
    if (newSerialport === "") return;
    setSystemDataSerialport(
      new SerialPort({
        path: newSerialport,
        baudRate: 115200,
        autoOpen: false,
      })
    );
  };

  useEffect(() => {
    if (!missionDataSerialport) return;

    const parser = missionDataSerialport.pipe(
      new ReadlineParser({ delimiter: "\n" })
    );

    let oldTime = new Date().getTime();
    parser.on("data", (data) => {
      const json = JSON.parse(data);

      const nowTime = new Date().getTime();
      const timeDiff = nowTime - oldTime;
      oldTime = nowTime;

      setMissionDataSpecStatus({
        rssi: json.PacketInfo.RSSI,
        snr: json.PacketInfo.SNR,
        dataRate: 1000 / timeDiff,
      });
    });

    missionDataSerialport.open((error) => {
      if (!error) return;
      if (
        error.message ===
        "Error Resource temporarily unavailable Cannot lock port"
      ) {
        alert("シリアルポートを開けません。受信機を再起動してください。");
      }
    });
  }, [missionDataSerialport]);

  useEffect(() => {
    if (!airDataSerialport) return;

    const parser = airDataSerialport.pipe(
      new ReadlineParser({ delimiter: "\n" })
    );

    let oldTime = new Date().getTime();
    parser.on("data", (data) => {
      const json = JSON.parse(data);

      const nowTime = new Date().getTime();
      const timeDiff = nowTime - oldTime;
      oldTime = nowTime;

      setAirDataSpecStatus({
        rssi: json.PacketInfo.RSSI,
        snr: json.PacketInfo.SNR,
        dataRate: 1000 / timeDiff,
      });

      if (json.PacketInfo.Type == "AirData") {
        setAirDataRx((prev) => !prev);
        setAirData({
          altitude: json.Alt,
          climbRate: json.CR,
          outsideTemperature: json.OutTemp,
          orientationX: json.Ori.x,
          orientationY: json.Ori.y,
          orientationZ: json.Ori.z,
          accelerationX: json.Lia.x,
          accelerationY: json.Lia.y,
          accelerationZ: json.Lia.z,
        });
      }
    });

    airDataSerialport.open((error) => {
      if (!error) return;
      if (
        error.message ===
        "Error Resource temporarily unavailable Cannot lock port"
      ) {
        alert("シリアルポートを開けません。受信機を再起動してください。");
      }
    });
  }, [airDataSerialport]);

  useEffect(() => {
    if (!systemDataSerialport) return;

    const parser = systemDataSerialport.pipe(
      new ReadlineParser({ delimiter: "\n" })
    );

    let oldTime = new Date().getTime();
    parser.on("data", (data) => {
      const json = JSON.parse(data);

      const nowTime = new Date().getTime();
      const timeDiff = nowTime - oldTime;
      oldTime = nowTime;

      setSystemDataSpecStatus({
        rssi: json.PacketInfo.RSSI,
        snr: json.PacketInfo.SNR,
        dataRate: 1000 / timeDiff,
      });

      if (json.PacketInfo.Type == "PositionData") {
        setPositionDataRx((prev) => !prev);
        setPositionData({
          latitude: json.Latitude,
          longitude: json.Longitude,
        });
      }

      if (json.PacketInfo.Type == "SystemData") {
        setSystemDataRx((prev) => !prev);
        setSystemData({
          flightMode: json.FlightMode,
          cameraStatus: json.CameraStatus,
          sn3Status: json.SN3Status,
          doLogging: json.DoLogging,
        });
      }

      if (json.PacketInfo.Type == "PowerData") {
        setPowerDataRx((prev) => !prev);
        setPowerData({
          supplyVoltage: json.SupplyVoltage,
          poolVoltage: json.PoolVoltage,
          batteryVoltage: json.BatteryVoltage,
        });
      }
    });

    systemDataSerialport.open((error) => {
      if (!error) return;
      if (
        error.message ===
        "Error Resource temporarily unavailable Cannot lock port"
      ) {
        alert("シリアルポートを開けません。受信機を再起動してください。");
      }
    });
  }, [systemDataSerialport]);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-space-between">
        <h2 className="title is-4 has-text-light has-text-weight-light">
          COMMUNICATION
        </h2>

        <div>
          <RssiIcon
            rssi1={missionDataSpecStatus?.rssi}
            rssi2={airDataSpecStatus?.rssi}
            rssi3={systemDataSpecStatus?.rssi}
          />
          <SerialportSelector
            changeMissionDataSerialport={changeMissionDataSerialport}
            changeAirDataSerialport={changeAirDataSerialport}
            changeSystemDataSerialport={changeSystemDataSerialport}
          />
        </div>
      </div>

      <div className="columns is-variable is-1">
        <div className="column is-4">
          <p className="has-text-centered has-text-light">Mission Data</p>
          <SpecBox frequency={925_800_000} bandwidth={500_000} />
          <SpecStatusBox
            rssi={missionDataSpecStatus?.rssi}
            snr={missionDataSpecStatus?.snr}
            dataRate={missionDataSpecStatus?.dataRate}
            targetDataRate={50}
          />
        </div>

        <div className="column is-4">
          <p className="has-text-centered has-text-light">Air Data</p>
          <SpecBox frequency={923_800_000} bandwidth={500_000} />
          <SpecStatusBox
            rssi={airDataSpecStatus?.rssi}
            snr={airDataSpecStatus?.snr}
            dataRate={airDataSpecStatus?.dataRate}
            targetDataRate={20}
          />
        </div>

        <div className="column is-4">
          <p className="has-text-centered has-text-light">System Data</p>
          <SpecBox frequency={921_800_000} bandwidth={250_000} />
          <SpecStatusBox
            rssi={systemDataSpecStatus?.rssi}
            snr={systemDataSpecStatus?.snr}
            dataRate={systemDataSpecStatus?.dataRate}
            targetDataRate={10}
          />
        </div>
      </div>

      <RxStatusBox
        airDataRx={airDataRx}
        positionDataRx={positionDataRx}
        systemDataRx={systemDataRx}
        powerDataRx={powerDataRx}
      />
    </div>
  );
};
