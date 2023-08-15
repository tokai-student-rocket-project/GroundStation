import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Router } from "../../router/Router";

import {
  AirData,
  AirDataContextType,
  defaultAirData,
} from "../../types/AirData";
import {
  PositionData,
  PositionDataContextType,
  defaultPositionData,
} from "../../types/PositionData";
import {
  SystemData,
  SystemDataContextType,
  defaultSystemData,
} from "../../types/SystemData";
import {
  PowerData,
  PowerDataContextType,
  defaultPowerData,
} from "../../types/PowerData";
import {
  CommandSchedule,
  CommandContextType,
  defaultCommandSchedule,
} from "../../types/Command";
import {
  ValveData,
  ValveDataContextType,
  defaultValveData,
} from "../../types/ValveData";
import {
  SensingData,
  SensingDataContextType,
  defaultSensingData,
} from "../../types/SensingData";
import {
  MissionStatus,
  MissionStatusContextType,
  defaultMissionStatus,
} from "../../types/MissionStatus";
import {
  MissionData,
  MissionDataContextType,
  defaultMissionData,
} from "../../types/MissionData";
import {
  PerformanceData,
  PerformanceDataContextType,
  defaultPerformanceData,
} from "../../types/PerformanceData";

import "bulma/css/bulma.css";
import "./styles.css";

export const AirDataContext = createContext<AirDataContextType>(
  {} as AirDataContextType
);

export const PositionDataContext = createContext<PositionDataContextType>(
  {} as PositionDataContextType
);

export const SystemDataContext = createContext<SystemDataContextType>(
  {} as SystemDataContextType
);

export const PowerDataContext = createContext<PowerDataContextType>(
  {} as PowerDataContextType
);

export const CommandScheduleContext = createContext<CommandContextType>(
  {} as CommandContextType
);

export const ValveDataContext = createContext<ValveDataContextType>(
  {} as ValveDataContextType
);

export const SensingDataContext = createContext<SensingDataContextType>(
  {} as SensingDataContextType
);
export const MissionStatusContext = createContext<MissionStatusContextType>(
  {} as MissionStatusContextType
);
export const MissionDataContext = createContext<MissionDataContextType>(
  {} as MissionDataContextType
);
export const PerformanceDataContext = createContext<PerformanceDataContextType>(
  {} as PerformanceDataContextType
);

export const App = () => {
  const [airData, setAirData] = useState<AirData>(defaultAirData);
  const clearAirData = () => setAirData(defaultAirData);

  const [positionData, setPositionData] =
    useState<PositionData>(defaultPositionData);
  const clearPositionData = () => setPositionData(defaultPositionData);

  const [systemData, setSystemData] = useState<SystemData>(defaultSystemData);
  const clearSystemData = () => setSystemData(defaultSystemData);

  const [powerData, setPowerData] = useState<PowerData>(defaultPowerData);
  const clearPowerData = () => setPowerData(defaultPowerData);

  const [commandSchedule, setCommandSchedule] = useState<CommandSchedule>(
    defaultCommandSchedule
  );
  const clearCommandSchedule = () => setCommandSchedule(defaultCommandSchedule);

  const [valveData, setValveData] = useState<ValveData>(defaultValveData);
  const clearValveData = () => setValveData(defaultValveData);

  const [sensingData, setSensingData] =
    useState<SensingData>(defaultSensingData);
  const clearSensingData = () => setSensingData(defaultSensingData);

  const [missionStatus, setMissionStatus] =
    useState<MissionStatus>(defaultMissionStatus);
  const clearMissionStatus = () => setMissionStatus(defaultMissionStatus);

  const [missionData, setMissionData] =
    useState<MissionData>(defaultMissionData);
  const clearMissionData = () => setMissionData(defaultMissionData);

  const [performanceData, setPerformanceData] = useState<PerformanceData>(
    defaultPerformanceData
  );
  const clearPerformanceData = () => setPerformanceData(defaultPerformanceData);

  const navigate = useNavigate();

  useEffect(() => {
    // 起動から3秒経ったらコンテンツに遷移する処理
    setTimeout(() => {
      navigate("/main");
    }, 500);
  }, []);
  clearAirData;

  return (
    <AirDataContext.Provider value={{ airData, setAirData, clearAirData }}>
      <PositionDataContext.Provider
        value={{ positionData, setPositionData, clearPositionData }}
      >
        <SystemDataContext.Provider
          value={{ systemData, setSystemData, clearSystemData }}
        >
          <PowerDataContext.Provider
            value={{ powerData, setPowerData, clearPowerData }}
          >
            <CommandScheduleContext.Provider
              value={{
                commandSchedule,
                setCommandSchedule,
                clearCommandSchedule,
              }}
            >
              <ValveDataContext.Provider
                value={{
                  valveData,
                  setValveData,
                  clearValveData,
                }}
              >
                <SensingDataContext.Provider
                  value={{ sensingData, setSensingData, clearSensingData }}
                >
                  <MissionStatusContext.Provider
                    value={{
                      missionStatus,
                      setMissionStatus,
                      clearMissionStatus,
                    }}
                  >
                    <MissionDataContext.Provider
                      value={{ missionData, setMissionData, clearMissionData }}
                    >
                      <PerformanceDataContext.Provider
                        value={{
                          performanceData,
                          setPerformanceData,
                          clearPerformanceData,
                        }}
                      >
                        <Router />
                      </PerformanceDataContext.Provider>
                    </MissionDataContext.Provider>
                  </MissionStatusContext.Provider>
                </SensingDataContext.Provider>
              </ValveDataContext.Provider>
            </CommandScheduleContext.Provider>
          </PowerDataContext.Provider>
        </SystemDataContext.Provider>
      </PositionDataContext.Provider>
    </AirDataContext.Provider>
  );
};
