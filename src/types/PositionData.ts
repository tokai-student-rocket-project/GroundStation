export type PositionData = {
  latitude?: number;
  longitude?: number;
};

export type PositionDataContextType = {
  positionData: PositionData;
  setPositionData: (value: PositionData) => void;
  clearPositionData: () => void;
};

export const defaultPositionData = {
  latitude: undefined,
  longitude: undefined,
};
