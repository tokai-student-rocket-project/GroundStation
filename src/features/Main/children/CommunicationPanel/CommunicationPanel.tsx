import { useContext, useEffect, useState } from "react";
import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";

import { Console } from "console";
const console = new Console(process.stdout, process.stderr);

import { ipcRenderer } from "electron";

import {
  AirDataContext,
  PositionDataContext,
  SystemDataContext,
  PowerDataContext,
  CommandScheduleContext,
  ValveDataContext,
  SensingDataContext,
  MissionStatusContext,
  MissionDataContext,
} from "../../../App/App";

import { RssiIcon } from "./children/RssiIcon";
import { SerialportSelector } from "./children/SerialportSelector";
import { SpecBox } from "./children/SpecBox";
import { SpecStatusBox } from "./children/SpecStatusBox";
import { RxStatusBox } from "./children/RxStatusBox";
import { LoggerACM } from "./children/LoggerACM";
import { LoggerSCM } from "./children/LoggerSCM";
import { LoggerMM } from "./children/LoggerMM";

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
  const { setAirData, clearAirData } = useContext(AirDataContext);

  const [systemDataSerialport, setSystemDataSerialport] =
    useState<SerialPort>();
  const [systemDataSpecStatus, setSystemDataSpecStatus] =
    useState<SpecStatus>();
  const { setPositionData, clearPositionData } =
    useContext(PositionDataContext);
  const { setSystemData, clearSystemData } = useContext(SystemDataContext);
  const { setPowerData, clearPowerData } = useContext(PowerDataContext);
  const { commandSchedule, clearCommandSchedule } = useContext(
    CommandScheduleContext
  );
  const { setValveData, clearValveData } = useContext(ValveDataContext);
  const { setSensingData, clearSensingData } = useContext(SensingDataContext);
  const { setMissionStatus, clearMissionStatus } =
    useContext(MissionStatusContext);
  const { setMissionData, clearMissionData } = useContext(MissionDataContext);

  const [airDataRx, setAirDataRx] = useState<boolean>(false);
  const [positionDataRx, setPositionDataRx] = useState<boolean>(false);
  const [systemDataRx, setSystemDataRx] = useState<boolean>(false);
  const [powerDataRx, setPowerDataRx] = useState<boolean>(false);
  const [valveDataRx, setValveDataRx] = useState<boolean>(false);
  const [missionStatusRx, setMissionStatusRx] = useState<boolean>(false);
  const [missionDataRx, setMissionDataRx] = useState<boolean>(false);
  const [sensingDataRx, setSensingDataRx] = useState<boolean>(false);

  const [latestACM, setLatestACM] = useState<string>();
  const [latestSCM, setLatestSCM] = useState<string>();
  const [latestMM, setLatestMM] = useState<string>();
  const [doLogging, setDoLogging] = useState<boolean>(false);

  const changeMissionDataSerialport = (newSerialport?: string) => {
    if (missionDataSerialport?.isOpen) missionDataSerialport.close();
    setMissionDataSpecStatus(undefined);
    setMissionStatusRx(false);
    setMissionDataRx(false);
    clearMissionStatus();
    clearMissionData();

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
    setValveDataRx(false);
    setSensingDataRx(false);
    clearPositionData();
    clearSystemData();
    clearPowerData();
    clearValveData();
    clearSensingData();

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
      setLatestMM(data);

      const nowTime = new Date().getTime();
      const timeDiff = nowTime - oldTime;
      oldTime = nowTime;

      setMissionDataSpecStatus({
        rssi: json.PacketInfo.RSSI,
        snr: json.PacketInfo.SNR,
        dataRate: 1000 / timeDiff,
      });

      if (json.PacketInfo.Type == "MissionData") {
        setMissionDataRx((prev) => !prev);
        setMissionData({
          x: json.Acc.x,
          y: json.Acc.y,
          z: json.Acc.z,
        });
      }

      if (json.PacketInfo.Type == "MissionStatus") {
        setMissionStatusRx((prev) => !prev);
        setMissionStatus({
          loggerUsage: json.LoggerUsage,
          dataRate: json.DataRate,
          loggerOffset: json.LoggerOffset,
          senderOffset: json.SenderOffset,
          doLogging: json.DoLogging,
          doSending: json.DoSending,
        });
      }
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
      setLatestACM(data);

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
          internalTemperature: json.inTemp,
          coldTemperature: json.CldTemp,
          orientationX: json.Ori.x,
          orientationY: json.Ori.y,
          orientationZ: json.Ori.z,
          accelerationX: json.Lia.x,
          accelerationY: json.Lia.y,
          accelerationZ: json.Lia.z,
        });

        ipcRenderer.send("air-data", json);
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
      setLatestSCM(data);

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
          isFixed: json.IsFixed,
          fixType: json.FixType,
          satellites: json.Satellites,
          latitude: json.Latitude,
          longitude: json.Longitude,
          altitude: json.Altitude,
          speed: json.Speed,
        });

        ipcRenderer.send("position-data", json);
      }

      if (json.PacketInfo.Type == "SystemData") {
        setSystemDataRx((prev) => !prev);
        setSystemData({
          flightMode: json.FlightMode,
          cameraStatus: json.CameraStatus,
          sn3Status: json.SN3Status,
          doLogging: json.DoLogging,
          flightTime: json.FlightTime,
          loggerUsage: json.LoggerUsage,
        });

        ipcRenderer.send("system-data", json);
      }

      if (json.PacketInfo.Type == "SensingData") {
        setSensingDataRx((prev) => !prev);
        setSensingData({
          referencePressure: json.ReferencePressure,
          isSystemCalibrated: json.IsSystemCalibrated,
          loggerUsage: json.LoggerUsage,
        });

        ipcRenderer.send("sensing-data", json);
      }

      if (json.PacketInfo.Type == "PowerData") {
        setPowerDataRx((prev) => !prev);
        setPowerData({
          supplyVoltage: json.SupplyVoltage,
          poolVoltage: json.PoolVoltage,
          batteryVoltage: json.BatteryVoltage,
        });

        ipcRenderer.send("power-data", json);
      }

      if (json.PacketInfo.Type == "ValveData") {
        setValveDataRx((prev) => !prev);
        setValveData({
          isWaiting: json.IsWaiting,
          currentPosition: json.CurrentPosition,
          currentDesiredPosition: json.CurrentDesiredPosition,
          currentVelocity: json.CurrentVelocity,
          motorTemperature: json.McuTemperature,
          mcuTemperature: json.MotorTemperature,
          current: json.Current,
          inputVoltage: json.InputVoltage,
        });

        ipcRenderer.send("valve-data", json);
      }

      if (json.PacketInfo.Type == "Event") {
        const publisher: number = json.Publisher;
        const eventCode: number = json.EventCode;

        const message = `Event: [${
          ["SM", "FM", "MM", "ACM", "SCM"][publisher]
        }:0x${eventCode.toString(16)}] ${
          [
            "SETUP",
            "RESET",
            "FLIGHT MODE ON",
            "IGNITION",
            "BURNOUT",
            "APOGEE",
            "SEPARATE",
            "LAND",
            "FLIGHT MODE OFF",
            "FORCE SEPARATE",
            "REFERENCE PRESSURE UPDATED",
          ][eventCode]
        }`;

        console.log(message);
      }

      if (json.PacketInfo.Type == "Error") {
        const publisher: number = json.Publisher;
        const errorCode: number = json.ErrorCode;
        const errorReason: number = json.ErrorReason;

        const message = `Error: [${
          ["SM", "FM", "MM", "ACM", "SCM", "VCM"][publisher]
        }:0x${errorCode.toString(16)}:0x${errorReason.toString(16)}] ${
          ["COMMAND RECEIVE FAILED", "LOGGER FAILURE"][errorCode]
        }\nReason: ${["UNKNOWN", "INVALID KEY", "INVALID SD"][errorReason]}`;

        console.log(message);
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

  useEffect(() => {
    if (!systemDataSerialport) return;

    if (commandSchedule.flightModeOn) {
      systemDataSerialport.write("F");
    }

    if (commandSchedule.reset) {
      systemDataSerialport.write("R");
    }

    clearCommandSchedule();
  }, [commandSchedule]);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-space-between">
        <h2 className="title is-4 has-text-light has-text-weight-light">
          COMMUNICATION
        </h2>

        <div>
          <button
            className={
              doLogging
                ? "button is-small is-success is-inverted has-background-dark"
                : "button is-small is-danger is-inverted has-background-dark"
            }
            onClick={() => setDoLogging((state) => !state)}
            accessKey="l"
          >
            {doLogging ? "RX LOG ON" : "RX LOG OFF"}
          </button>
          <LoggerACM doLogging={doLogging} log={latestACM} />
          <LoggerSCM doLogging={doLogging} log={latestSCM} />
          <LoggerMM doLogging={doLogging} log={latestMM} />
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
        valveDataRx={valveDataRx}
        missionStatusRx={missionStatusRx}
        missionDataRx={missionDataRx}
        sensingDataRx={sensingDataRx}
      />
    </div>
  );
};
