export type MissionData = {
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  z0?: number;
  z1?: number;
};

export type MissionDataContextType = {
  missionData: MissionData;
  setMissionData: (value: MissionData) => void;
  clearMissionData: () => void;
};

export const defaultMissionData = {
  x0: undefined,
  x1: undefined,
  y0: undefined,
  y1: undefined,
  z0: undefined,
  z1: undefined,
};
