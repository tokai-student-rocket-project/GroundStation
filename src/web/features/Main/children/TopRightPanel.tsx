import { useState, useEffect } from "react";

export const TopRightPanel = () => {
  const [now, setNow] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const nowRaw = new Date();
      setNow(`${nowRaw.toDateString()}\n${nowRaw.toTimeString()}`);
    }, 1000);
  }, []);

  return (
    <nav className="level is-justify-content-center">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Current Time</p>
          <p className="has-text-light" style={{ maxWidth: "200px" }}>
            {now}
          </p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">GNSS</p>
          <p className="has-text-light">{"N  --°--'--.--\""}</p>
          <p className="has-text-light">{"E ---°--'--.--\""}</p>
        </div>
      </div>
      <div className="level-item has-text-centered"></div>
    </nav>
  );
};
