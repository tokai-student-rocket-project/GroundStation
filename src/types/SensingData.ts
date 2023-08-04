export type SensingData = {
  referencePressure?: number;
  isSystemCalibrated?: boolean;
  loggerUsage?: number;
};

export type SensingDataContextType = {
  sensingData: SensingData;
  setSensingData: (value: SensingData) => void;
  clearSensingData: () => void;
};

export const defaultSensingData = {
  referencePressure: undefined,
  isSystemCalibrated: undefined,
  loggerUsage: undefined,
};
