export type MissionData = {
  loggerUsage?: number;
};

export type MissionDataContextType = {
  missionData: MissionData;
  setMissionData: (value: MissionData) => void;
  clearMissionData: () => void;
};

export const defaultMissionData = {
  loggerUsage: undefined,
};
