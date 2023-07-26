type Props = {
  yaw?: number;
};

export const YawBar = ({ yaw }: Props) => {
  return (
    <>
      <div
        className="has-background-black-ter"
        style={{ height: "15px", width: "15px" }}
      ></div>
      <div
        className="has-background-black-ter"
        style={{
          height: "15px",
          width: "200px",
          position: "relative",
          marginRight: "15px",
        }}
      >
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "1px",
            width: "200px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "15px",
            width: "1px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "15px",
            width: "1px",
            left: "0%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "15px",
            width: "1px",
            left: "100%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <p
          className="has-text-light"
          style={{
            position: "absolute",
            left: `${(((yaw ?? 0) + 90) / 180) * 100}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          ◆
        </p>
      </div>
    </>
  );
};
