export const getColorFromRssi = (rssi: number | undefined): string => {
  if (!rssi) return "#B5B5B5";
  if (rssi < -120) return "#FF385F";
  if (rssi < -70) return "#FFDD56";
  return "#23D160";
};

export const getColorFromSnr = (snr: number | undefined): string => {
  if (!snr) return "#B5B5B5";
  if (snr < 1) return "#FF385F";
  if (snr < 4) return "#FFDD56";
  return "#23D160";
};

export const getColorFromDataRate = (
  dataRate: number | undefined,
  targetDataRate: number
): string => {
  if (!dataRate) return "#B5B5B5";
  if (dataRate < targetDataRate - targetDataRate / 0.5) return "#FF385F";
  if (dataRate < targetDataRate - targetDataRate / 0.25) return "#FFDD56";
  return "#23D160";
};
