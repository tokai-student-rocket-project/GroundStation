import "./flow.css";

type Props = {
  supplyVoltage?: number;
  batteryVoltage?: number;
  poolVoltage?: number;
  isExternal?: boolean;
};

export const PowerDiagram = ({
  supplyVoltage,
  batteryVoltage,
  poolVoltage,
  isExternal,
}: Props) => {
  return (
    <>
      <div
        className="has-background-gray-darker"
        style={{ height: "180px", position: "relative" }}
      >
        <div
          className={isExternal ? "flow" : ""}
          style={{
            position: "absolute",
            width: "50px",
            height: "3px",
            left: "12%",
            top: "66%",
            transform: "translate(-50%, -50%)",
            backgroundImage: `linear-gradient(90deg,${
              isExternal ? "#48c78e" : "#7A7A7A"
            },${isExternal ? "#48c78e" : "#7A7A7A"} 7px,${
              isExternal ? "#257953" : "#7A7A7A"
            } 7px,${isExternal ? "#257953" : "#7A7A7A"} 10px)`,
            backgroundSize: "10px 6px",
            backgroundPositionX: "0px",
          }}
        ></div>
        <div
          className={(batteryVoltage ?? 0) > 8 && !isExternal ? "flow" : ""}
          style={{
            position: "absolute",
            width: "150px",
            height: "3px",
            left: "35%",
            top: "33%",
            transform: "translate(-50%, -50%)",
            backgroundImage: `linear-gradient(90deg,${
              (batteryVoltage ?? 0) > 8 && !isExternal ? "#48c78e" : "#7A7A7A"
            },${
              (batteryVoltage ?? 0) > 8 && !isExternal ? "#48c78e" : "#7A7A7A"
            } 7px,${
              (batteryVoltage ?? 0) > 8 && !isExternal ? "#257953" : "#7A7A7A"
            } 7px,${
              (batteryVoltage ?? 0) > 8 && !isExternal ? "#257953" : "#7A7A7A"
            } 10px)`,
            backgroundSize: "10px 6px",
            backgroundPositionX: "0px",
          }}
        ></div>
        <div
          className={isExternal ? "flow" : ""}
          style={{
            position: "absolute",
            width: "150px",
            height: "3px",
            left: "35%",
            top: "66%",
            transform: "translate(-50%, -50%)",
            backgroundImage: `linear-gradient(90deg,${
              isExternal ? "#48c78e" : "#7A7A7A"
            },${isExternal ? "#48c78e" : "#7A7A7A"} 7px,${
              isExternal ? "#257953" : "#7A7A7A"
            } 7px,${isExternal ? "#257953" : "#7A7A7A"} 10px)`,
            backgroundSize: "10px 6px",
            backgroundPositionX: "0px",
          }}
        ></div>
        <div
          className={(supplyVoltage ?? 0) > 8 ? "flow" : ""}
          style={{
            position: "absolute",
            width: "150px",
            height: "3px",
            left: "66%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundImage: `linear-gradient(90deg,${
              (supplyVoltage ?? 0) > 8 ? "#48c78e" : "#7A7A7A"
            },${(supplyVoltage ?? 0) > 8 ? "#48c78e" : "#7A7A7A"} 7px,${
              (supplyVoltage ?? 0) > 8 ? "#257953" : "#7A7A7A"
            } 7px,${(supplyVoltage ?? 0) > 8 ? "#257953" : "#7A7A7A"} 10px)`,
            backgroundSize: "10px 6px",
            backgroundPositionX: "0px",
          }}
        ></div>

        <div
          className="box has-background-black-ter p-2 is-size-7 m-0 has-text-light"
          style={{
            position: "absolute",
            left: "20%",
            top: "33%",
            transform: "translate(-50%, -50%)",
            border: `solid 2px ${
              (batteryVoltage ?? 0) > 8 ? "#48c78e" : "#7A7A7A"
            }`,
          }}
        >
          BATT
        </div>
        <div
          className="box has-background-black-ter p-2 is-size-7 m-0 has-text-light"
          style={{
            position: "absolute",
            left: "20%",
            top: "66%",
            transform: "translate(-50%, -50%)",
            border: `solid 2px ${isExternal ? "#48c78e" : "#7A7A7A"}`,
          }}
        >
          EXT
        </div>
        <div
          className="box has-background-black-ter p-2 is-size-7 m-0 has-text-light"
          style={{
            position: "absolute",
            width: "24px",
            height: "100px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            border: `solid 2px ${
              (poolVoltage ?? 0) > 8 ? "#48c78e" : "#7A7A7A"
            }`,
          }}
        ></div>
        <div
          className="box has-background-black-ter p-2 is-size-7 m-0 has-text-light"
          style={{
            position: "absolute",
            left: "66%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            border: `solid 2px ${
              (supplyVoltage ?? 0) > 8 ? "#48c78e" : "#7A7A7A"
            }`,
          }}
        >
          LDO
        </div>
        <p
          className="is-size-7 has-text-light"
          style={{
            position: "absolute",
            left: "50%",
            top: "95%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Pool
        </p>
        <p
          className="is-size-7 has-text-light"
          style={{
            position: "absolute",
            left: "90%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Supply
          <br />
          PowerBus
        </p>
      </div>
    </>
  );
};
