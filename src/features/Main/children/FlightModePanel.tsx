import { useContext } from "react";

import { SystemDataContext } from "../../App/App";

const getFlightMode = (flightModeNumber?: number): string | undefined => {
  if (flightModeNumber == undefined) return undefined;
  if (flightModeNumber < 0 || flightModeNumber > 9) return undefined;

  return [
    "SLEEP",
    "STANDBY",
    "THRUST",
    "CLIMB",
    "DESCENT",
    "DECEL",
    "PARACHUTE",
    "LAND",
    "SHUTDOWN",
  ][flightModeNumber];
};

export const FlightModePanel = () => {
  const { systemData } = useContext(SystemDataContext);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-center">
        <p className="heading has-text-light">Flight Mode</p>
      </div>
      <div className="columns is-gapless is-align-items-center">
        <div className="column">
          <p className="is-size-5 has-text-grey-light has-text-right">
            {getFlightMode(
              systemData.flightMode != undefined
                ? systemData.flightMode - 1
                : undefined
            ) ?? "-------"}
          </p>
        </div>
        <div className="column is-1">
          <p className="is-size-4 has-text-grey-light has-text-weight-semibold has-text-centered">
            {">"}
          </p>
        </div>
        <div className="column">
          <p className="is-size-2 has-text-primary has-text-weight-medium has-text-centered">
            {getFlightMode(systemData.flightMode) ?? "-------"}
          </p>
        </div>
        <div className="column is-1">
          <p className="is-size-4 has-text-grey-light has-text-weight-semibold has-text-centered">
            {">"}
          </p>
        </div>
        <div className="column">
          <p className="is-size-5 has-text-grey-light has-text-left">
            {getFlightMode(
              systemData.flightMode != undefined
                ? systemData.flightMode + 1
                : undefined
            ) ?? "-------"}
          </p>
        </div>
      </div>
    </div>
  );
};
