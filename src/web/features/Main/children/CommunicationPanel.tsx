export const CommunicationPanel = () => {
  return (
    <div className="box has-background-dark p-3">
      <h2 className="title has-text-light has-text-weight-light">
        COMMUNICATION
      </h2>
      <div className="columns is-variable is-1">
        <div className="column is-4">
          <p className="has-text-centered has-text-light">Mission Data</p>
          <div className="box has-background-black-ter p-1">
            <div className="is-flex is-justify-content-space-evenly">
              <p className=" has-text-light has-text-right is-size-7">
                925.8 MHz
              </p>
              <p className=" has-text-light has-text-left is-size-7">500 kHz</p>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <p className="has-text-centered has-text-light">Air Data</p>
          <div className="box has-background-black-ter p-1">
            <div className="is-flex is-justify-content-space-evenly">
              <p className=" has-text-light has-text-right is-size-7">
                923.8 MHz
              </p>
              <p className=" has-text-light has-text-left is-size-7">500 kHz</p>
            </div>
          </div>
        </div>
        <div className="column is-4">
          <p className="has-text-centered has-text-light">System Data</p>
          <div className="box has-background-black-ter p-1">
            <div className="is-flex is-justify-content-space-evenly">
              <p className=" has-text-light has-text-right is-size-7">
                921.8 MHz
              </p>
              <p className=" has-text-light has-text-left is-size-7">250 kHz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
