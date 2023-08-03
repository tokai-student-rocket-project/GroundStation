import { useContext, useState } from "react";

import { CommandScheduleContext } from "../../App/App";

export const CommandPanel = () => {
  const { setCommandSchedule } = useContext(CommandScheduleContext);

  const [isArmed, setIsArmed] = useState<boolean>(false);

  const flightModeOn = () => {
    if (isArmed) setCommandSchedule({ flightModeOn: true, reset: false });
  };

  const reset = () => {
    if (isArmed) setCommandSchedule({ flightModeOn: false, reset: true });
  };

  const changeArmed = () => setIsArmed((state) => !state);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-space-between">
        <h2 className="title is-4 has-text-light has-text-weight-light">
          COMMAND
        </h2>

        <button
          className={
            isArmed
              ? "button is-small is-danger is-inverted has-background-dark"
              : "button is-small is-success is-inverted has-background-dark"
          }
          onClick={changeArmed}
          accessKey="s"
        >
          {isArmed ? "ARMED" : "SAFE"}
        </button>
      </div>

      <button
        onClick={flightModeOn}
        accessKey="f"
        className="button is-primary is-fullwidth is-outlined mb-4"
        disabled={!isArmed}
      >
        <div>FLIGHT MODE ON</div>
      </button>
      <button
        onClick={reset}
        accessKey="r"
        className="button is-primary is-fullwidth is-outlined"
        disabled={!isArmed}
      >
        <div>RESET</div>
      </button>
    </div>
  );
};
