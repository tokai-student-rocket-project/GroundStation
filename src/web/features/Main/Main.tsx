import { TopPanel } from "./children/TopPanel";
import { CommunicationPanel } from "./children/CommunicationPanel";
import { FlightModePanel } from "./children/FlightModePanel";

export const Main = () => {
  return (
    <div>
      <TopPanel />
      <div className="columns is-multiline m-2">
        <div className="column is-one-third">
          <CommunicationPanel />
        </div>
        <div className="column is-one-third">
          <FlightModePanel />
        </div>
        <div className="column is-one-third"></div>
      </div>
    </div>
  );
};
