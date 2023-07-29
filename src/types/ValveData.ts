export type ValveData = {
  isWaiting?: boolean;
  mcuTemperature?: number;
  motorTemperature?: number;
  current?: number;
  inputVoltage?: number;
};

export type ValveDataContextType = {
  valveData: ValveData;
  setValveData: (value: ValveData) => void;
  clearValveData: () => void;
};

export const defaultValveData = {
  isWaiting: undefined,
  mcuTemperature: undefined,
  motorTemperature: undefined,
  current: undefined,
  inputVoltage: undefined,
};
