import { TopLeftPanel } from "./children/TopLeftPanel";
import { TopCenterPanel } from "./children/TopCenterPanel";
import { TopRightPanel } from "./children/TopRightPanel";

export const Main = () => {
  return (
    <div className="has-background-dark px-6 py-4">
      <div className="columns">
        <div
          className="column pb-2 m-2"
          style={{ borderBottom: `solid 1px hsl(0, 0%, 96%)` }}
        >
          <TopLeftPanel />
        </div>
        <div className="column is-2 is-flex is-justify-content-center mb-3">
          <TopCenterPanel />
        </div>
        <div
          className="column pb-2 m-2"
          style={{ borderBottom: `solid 1px hsl(0, 0%, 96%)` }}
        >
          <TopRightPanel />
        </div>
      </div>
    </div>
  );
};
