import { TopLeftPanel } from "./children/TopLeftPanel";

export const Main = () => {
  return (
    <div className="has-background-dark px-6 py-4">
      <div className="columns">
        <div className="column">
          <TopLeftPanel />
        </div>
        <div className="column is-one-quarter"></div>
        <div className="column"></div>
      </div>
    </div>
  );
};
