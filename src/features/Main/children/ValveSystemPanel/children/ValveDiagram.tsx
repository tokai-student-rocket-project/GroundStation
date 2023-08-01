import "./flow.css";

type Props = {
  isWaiting?: boolean;
};

const waitingOrLaunchToColor = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "#7A7A7A";
  return isWaiting ? "#3e8ed0" : "#FF385F";
};

const waitingOrLaunchToDarkColor = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "#7A7A7A";
  return isWaiting ? "#296fa8" : "#cc0f35";
};

const launchToColor = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "#7A7A7A";
  return isWaiting ? "#7A7A7A" : "#FF385F";
};

const launchToDarkColor = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "#7A7A7A";
  return isWaiting ? "#7A7A7A" : "#cc0f35";
};

const waitingToColor = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "#7A7A7A";
  return isWaiting ? "#3e8ed0" : "#7A7A7A";
};

const waitingToDarkColor = (isWaiting?: boolean): string => {
  if (isWaiting == undefined) return "#7A7A7A";
  return isWaiting ? "#296fa8" : "#7A7A7A";
};

export const ValveDiagram = ({ isWaiting }: Props) => {
  return (
    <>
      <div
        className="has-background-gray-darker"
        style={{ height: "200px", position: "relative" }}
      >
        <div
          className={isWaiting ? "leftFlow" : "rightFlow"}
          style={{
            position: "absolute",
            width: "100px",
            height: "6px",
            left: "32.5%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            background: `linear-gradient(90deg,${waitingOrLaunchToColor(
              isWaiting
            )},${waitingOrLaunchToColor(
              isWaiting
            )} 7px,${waitingOrLaunchToDarkColor(
              isWaiting
            )} 7px,${waitingOrLaunchToDarkColor(isWaiting)} 10px)`,
            backgroundSize: "10px 6px",
            backgroundPositionX: "0px",
          }}
        ></div>
        <div
          className={isWaiting ? "" : "rightFlow"}
          style={{
            position: "absolute",
            width: "120px",
            height: "6px",
            left: "60%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            background: `linear-gradient(90deg,${launchToColor(
              isWaiting
            )},${launchToColor(isWaiting)} 7px,${launchToDarkColor(
              isWaiting
            )} 7px,${launchToDarkColor(isWaiting)} 10px)`,
            backgroundSize: "10px 6px",
            backgroundPositionX: "0px",
          }}
        ></div>
        <div
          className={isWaiting ? "leftFlow" : ""}
          style={{
            position: "absolute",
            width: "160px",
            height: "6px",
            left: "60%",
            top: "75%",
            transform: "translate(-50%, -50%)",
            background: `linear-gradient(90deg,${waitingToColor(
              isWaiting
            )},${waitingToColor(isWaiting)} 7px,${waitingToDarkColor(
              isWaiting
            )} 7px,${waitingToDarkColor(isWaiting)} 10px)`,
            backgroundSize: "10px 6px",
            backgroundPositionX: "0px",
          }}
        ></div>
        <div
          className="box has-background-black-ter p-2 px-4 is-size-7 m-0 has-text-light"
          style={{
            position: "absolute",
            left: "20%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            border: `solid 2px ${waitingOrLaunchToColor(isWaiting)}`,
          }}
        >
          Oxy Tank 440cc
        </div>
        <div
          className="box has-background-black-ter p-2 is-size-7 m-0"
          style={{
            position: "absolute",
            width: "32px",
            height: "120px",
            left: "45%",
            top: "55%",
            transform: "translate(-50%, -50%)",
            border: `solid 2px ${waitingOrLaunchToColor(isWaiting)}`,
          }}
        ></div>
        <div
          className="box has-background-black-ter p-3 is-size-7 m-0 has-text-light"
          style={{
            position: "absolute",
            left: "75%",
            top: "45%",
            transform: "translate(-50%, -50%)",
            border: `solid 2px ${launchToColor(isWaiting)}`,
          }}
        >
          THR-F406K
        </div>
        <p
          className="is-size-7 has-text-light"
          style={{
            position: "absolute",
            left: "45%",
            top: "92%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Valve
        </p>
        <p
          className="is-size-7 has-text-light"
          style={{
            position: "absolute",
            left: "85%",
            top: "75%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Oxidizer
          <br />
          Supply
        </p>
      </div>
    </>
  );
};
