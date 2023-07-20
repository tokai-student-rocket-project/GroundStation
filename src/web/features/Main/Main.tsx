import { TopPanel } from "./children/TopPanel";
import { CommunicationPanel } from "./children/CommunicationPanel";
import { CommandPanel } from "./children/CommandPanel";
import { PowerSystemPanel } from "./children/PowerSystemPanel";
import { FlightModePanel } from "./children/FlightModePanel";
import { MissionPanel } from "./children/MissionPanel";
import { SystemStatus } from "./children/SystemStatus";
import { SensingStatus } from "./children/SensingStatus";
import { ValveSystemPanel } from "./children/ValveSystemPanel";

export const Main = () => {
  return (
    <div
      className="is-flex is-flex-direction-column"
      style={{ height: "100%" }}
    >
      <TopPanel />
      <div className="columns is-multiline m-2" style={{ height: "100%" }}>
        <div className="column is-one-third is-flex is-flex-direction-column">
          <CommunicationPanel />
          <div className="columns">
            <div className="column is-half">
              <CommandPanel />
            </div>
            <div className="column is-half"></div>
          </div>

          <PowerSystemPanel />
        </div>
        <div className="column is-one-third">
          <FlightModePanel />
        </div>
        <div className="column is-one-third is-flex is-flex-direction-column">
          <MissionPanel />
          <div className="columns">
            <div className="column is-half">
              <SystemStatus />
            </div>
            <div className="column is-half">
              <SensingStatus />
            </div>
          </div>
          <ValveSystemPanel />
        </div>
      </div>
    </div>
  );
};
