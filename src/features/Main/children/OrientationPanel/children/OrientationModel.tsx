type Props = {
  yaw?: number;
  pitch?: number;
  roll?: number;
};

export const OrientationModel = ({ yaw, pitch, roll }: Props) => {
  return (
    <div
      className="has-background-primary-dark"
      style={{ height: "200px", width: "200px" }}
    ></div>
  );
};
