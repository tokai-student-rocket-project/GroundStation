import { TopPanel } from "./children/TopPanel";
import { FlightModePanel } from "./children/FlightModePanel";

export const Main = () => {
  return (
    <div>
      <TopPanel />
      <div className="tile is-ancestor m-4">
        <div className="tile is-4 is-vertical is-parent"></div>
        <div className="tile is-4 is-vertical is-parent">
          <FlightModePanel />
        </div>
        <div className="tile is-4 is-vertical is-parent"></div>
      </div>
    </div>
  );
};
