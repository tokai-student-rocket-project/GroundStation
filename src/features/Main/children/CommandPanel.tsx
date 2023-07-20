export const CommandPanel = () => {
  return (
    <div className="box has-background-dark p-3">
      <h2 className="title is-4 has-text-light has-text-weight-light">
        COMMAND
      </h2>
      <button
        accessKey="f"
        className="button is-primary is-fullwidth is-outlined"
      >
        <div>FLIGHT MODE ON</div>
      </button>
      <header className="header has-text-light is-flex is-justify-content-center mx-4 my-2">
        Ctrl + Opt + F
      </header>
    </div>
  );
};
