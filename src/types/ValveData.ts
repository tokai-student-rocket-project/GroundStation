export type ValveData = {
  isWaiting?: boolean;
  currentPosition?: number;
  currentDesiredPosition?: number;
  currentVelocity?: number;
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
  currentPosition: undefined,
  currentDesiredPosition: undefined,
  currentVelocity: undefined,
  mcuTemperature: undefined,
  motorTemperature: undefined,
  current: undefined,
  inputVoltage: undefined,
};
