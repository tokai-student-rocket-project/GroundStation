export type PowerData = {
  supplyVoltage?: number;
  poolVoltage?: number;
  batteryVoltage?: number;
};

export type PowerDataContextType = {
  powerData: PowerData;
  setPowerData: (value: PowerData) => void;
  clearPowerData: () => void;
};

export const defaultPowerData = {
  supplyVoltage: undefined,
  poolVoltage: undefined,
  batteryVoltage: undefined,
};
