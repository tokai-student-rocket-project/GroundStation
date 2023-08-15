export type PerformanceData = {
  millis?: number;
  taskRate?: number;
};

export type PerformanceDataContextType = {
  performanceData: PerformanceData;
  setPerformanceData: (value: PerformanceData) => void;
  clearPerformanceData: () => void;
};

export const defaultPerformanceData = {
  millis: undefined,
  taskRate: undefined,
};
