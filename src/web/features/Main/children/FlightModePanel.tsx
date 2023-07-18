export const FlightModePanel = () => {
  return (
    <div className="tile is-child box has-background-dark p-3">
      <div className="is-flex is-justify-content-center">
        <p className="heading has-text-light">Flight Mode</p>
      </div>
      <div className="columns is-gapless is-align-items-center">
        <div className="column">
          <p className="is-size-5 has-text-grey-light has-text-right">
            {"-------"}
          </p>
        </div>
        <div className="column is-1">
          <p className="is-size-4 has-text-grey-light has-text-weight-semibold has-text-centered">
            {">"}
          </p>
        </div>
        <div className="column">
          <p className="is-size-2 has-text-primary has-text-weight-medium has-text-centered">
            {"-------"}
          </p>
        </div>
        <div className="column is-1">
          <p className="is-size-4 has-text-grey-light has-text-weight-semibold has-text-centered">
            {">"}
          </p>
        </div>
        <div className="column">
          <p className="is-size-5 has-text-grey-light has-text-left">
            {"-------"}
          </p>
        </div>
      </div>
    </div>
  );
};
