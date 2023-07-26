type Props = {
  pitch?: number;
};

export const PitchBar = ({ pitch }: Props) => {
  return (
    <>
      <div
        className="has-background-black-ter"
        style={{ height: "200px", width: "15px", position: "relative" }}
      >
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "200px",
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
            height: "1px",
            width: "15px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "1px",
            width: "15px",
            left: "50%",
            top: "0%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "1px",
            width: "15px",
            left: "50%",
            top: "25%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "1px",
            width: "15px",
            left: "50%",
            top: "75%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <div
          className="has-background-grey"
          style={{
            position: "absolute",
            height: "1px",
            width: "15px",
            left: "50%",
            top: "100%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        <p
          className="has-text-light"
          style={{
            position: "absolute",
            left: "50%",
            top: `${(((pitch ?? 0) + 180) / 360) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          ◆
        </p>
      </div>
    </>
  );
};
