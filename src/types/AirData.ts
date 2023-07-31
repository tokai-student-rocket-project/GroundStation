export type AirData = {
  altitude?: number;
  climbRate?: number;
  outsideTemperature?: number;
  coldTemperature?: number;
  orientationX?: number;
  orientationY?: number;
  orientationZ?: number;
  accelerationX?: number;
  accelerationY?: number;
  accelerationZ?: number;
};

export type AirDataContextType = {
  airData: AirData;
  setAirData: (value: AirData) => void;
  clearAirData: () => void;
};

export const defaultAirData = {
  altitude: undefined,
  climbRate: undefined,
  outsideTemperature: undefined,
  coldTemperature: undefined,
  orientationX: undefined,
  orientationY: undefined,
  orientationZ: undefined,
  accelerationX: undefined,
  accelerationY: undefined,
  accelerationZ: undefined,
};
