import { useContext } from "react";

import { SystemDataContext, SensingDataContext } from "../../App/App";

export const LoggerPanel = () => {
  const { systemData } = useContext(SystemDataContext);
  const { sensingData } = useContext(SensingDataContext);

  return (
    <div className="box has-background-dark p-3">
      <div className="is-flex is-justify-content-space-between">
        <h2 className="title is-4 has-text-light has-text-weight-light">
          LOGGER
        </h2>
      </div>

      <h2 className="title is-4 has-text-light has-text-weight-light">
        {systemData.loggerUsage}
      </h2>
      <h2 className="title is-4 has-text-light has-text-weight-light">
        {sensingData.loggerUsage}
      </h2>
    </div>
  );
};
