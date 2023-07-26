export type CommandSchedule = {
  flightModeOn: boolean;
};

export type CommandContextType = {
  commandSchedule: CommandSchedule;
  setCommandSchedule: (value: CommandSchedule) => void;
  clearCommandSchedule: () => void;
};

export const defaultCommandSchedule = {
  flightModeOn: false,
};
