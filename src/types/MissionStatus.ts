export type MissionStatus = {
  loggerUsage?: number;
};

export type MissionStatusContextType = {
  missionStatus: MissionStatus;
  setMissionStatus: (value: MissionStatus) => void;
  clearMissionStatus: () => void;
};

export const defaultMissionStatus = {
  loggerUsage: undefined,
};
