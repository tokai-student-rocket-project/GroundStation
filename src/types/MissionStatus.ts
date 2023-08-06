export type MissionStatus = {
  loggerUsage?: number;
  dataRate?: number;
  loggerOffset?: number;
  senderOffset?: number;
  doLogging?: boolean;
  doSending?: boolean;
};

export type MissionStatusContextType = {
  missionStatus: MissionStatus;
  setMissionStatus: (value: MissionStatus) => void;
  clearMissionStatus: () => void;
};

export const defaultMissionStatus = {
  loggerUsage: undefined,
  dataRate: undefined,
  loggerOffset: undefined,
  senderOffset: undefined,
  doLogging: undefined,
  doSending: undefined,
};
