export type SystemData = {
  flightMode?: number;
  cameraStatus?: boolean;
  sn3Status?: boolean;
  doLogging?: boolean;
  flightTime?: number;
};

export type SystemDataContextType = {
  systemData: SystemData;
  setSystemData: (value: SystemData) => void;
  clearSystemData: () => void;
};

export const defaultSystemData = {
  flightMode: undefined,
  cameraStatus: undefined,
  sn3Status: undefined,
  doLogging: undefined,
  flightTime: undefined,
};
