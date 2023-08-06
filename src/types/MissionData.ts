export type MissionData = {
  x?: number;
  y?: number;
  z?: number;
};

export type MissionDataContextType = {
  missionData: MissionData;
  setMissionData: (value: MissionData) => void;
  clearMissionData: () => void;
};

export const defaultMissionData = {
  x: undefined,
  y: undefined,
  z: undefined,
};
