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
            <Router />
          </PowerDataContext.Provider>
        </SystemDataContext.Provider>
      </PositionDataContext.Provider>
    </AirDataContext.Provider>
  );
};
