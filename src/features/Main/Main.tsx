import { MapView } from "./children/MapView/MapView";
import { TopPanel } from "./children/TopPanel";
import { CommunicationPanel } from "./children/CommunicationPanel/CommunicationPanel";
import { CommandPanel } from "./children/CommandPanel";
import { LoggerPanel } from "./children/LoggerPanel";
import { PowerSystemPanel } from "./children/PowerSystemPanel/PowerSystemPanel";
import { FlightModePanel } from "./children/FlightModePanel";
import { OrientationPanel } from "./children/OrientationPanel/OrientationPanel";
import { SystemStatus } from "./children/SystemStatus";
import { MissionStatus } from "./children/MissionStatus";
import { ValveSystemPanel } from "./children/ValveSystemPanel/ValveSystemPanel";

export const Main = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <MapView />
      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: "999",
        }}
      >
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
                  <MissionStatus />
                </div>
                <div className="column is-half">
                  <LoggerPanel />
                  <SystemStatus />
                </div>
              </div>
            </div>
            <div className="column is-one-third is-flex is-flex-direction-column">
              <FlightModePanel />
              <div
                className="is-flex is-align-items-end is-justify-content-center"
                style={{ height: "100%" }}
              >
                <OrientationPanel />
              </div>
            </div>
            <div className="column is-one-third is-flex is-flex-direction-column">
              <PowerSystemPanel />
              <ValveSystemPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
