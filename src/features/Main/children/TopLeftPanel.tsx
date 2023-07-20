export const TopLeftPanel = () => {
  return (
    <nav className="level is-justify-content-center">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Altitude</p>
          <div className="is-flex is-align-items-end">
            <p className="title has-text-light">{"---.--"}</p>
            <p className="subtitle has-text-light mx-2 mb-1">m</p>
          </div>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Climb Rate</p>
          <div className="is-flex is-align-items-end">
            <p className="title has-text-light">{"--.--"}</p>
            <p className="subtitle has-text-light mx-2 mb-1">m/s</p>
          </div>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Acceleration</p>
          <div className="is-flex is-align-items-end">
            <p className="title has-text-light">{"--.--"}</p>
            <p className="subtitle has-text-light mx-2 mb-1">
              m/s
              <span style={{ fontSize: "0.75em", verticalAlign: "top" }}>
                2
              </span>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
