import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AirData } from "../../types/Data";
import { Router } from "../../router/Router";

import "bulma/css/bulma.css";
import "./styles.css";

type AirDataContextType = {
  airData: AirData;
  setAirData: (value: AirData) => void;
  clearAirData: () => void;
};
export const AirDataContext = createContext<AirDataContextType>(
  {} as AirDataContextType
);
const defaultAirData = {
  altitude: undefined,
  outsideTemperature: undefined,
  orientationX: undefined,
  orientationY: undefined,
  orientationZ: undefined,
  accelerationX: undefined,
  accelerationY: undefined,
  accelerationZ: undefined,
};

export const App = () => {
  const [airData, setAirData] = useState<AirData>(defaultAirData);
  const clearAirData = () => setAirData(defaultAirData);

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
      <Router />
    </AirDataContext.Provider>
  );
};
