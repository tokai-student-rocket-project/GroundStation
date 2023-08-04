export type PositionData = {
  isFixed?: boolean;
  fixType?: number;
  satellites?: number;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  speed?: number;
};

export type PositionDataContextType = {
  positionData: PositionData;
  setPositionData: (value: PositionData) => void;
  clearPositionData: () => void;
};

export const defaultPositionData = {
  isFixed: undefined,
  fixType: undefined,
  satellites: undefined,
  latitude: undefined,
  longitude: undefined,
  altitude: undefined,
  speed: undefined,
};
