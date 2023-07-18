import { TopLeftPanel } from "./TopLeftPanel";
import { TopCenterPanel } from "./TopCenterPanel";
import { TopRightPanel } from "./TopRightPanel";

export const TopPanel = () => {
  return (
    <div className="has-background-dark px-6 py-4">
      <div className="columns">
        <div className="column pb-2 m-2">
          <TopLeftPanel />
        </div>
        <div className="column is-2 is-flex is-justify-content-center mb-3">
          <TopCenterPanel />
        </div>
        <div className="column pb-2 m-2">
          <TopRightPanel />
        </div>
      </div>
    </div>
  );
};
