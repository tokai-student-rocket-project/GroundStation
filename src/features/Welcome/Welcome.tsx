import background from "./assets/images/background.png";

export const Welcome = () => {
  return (
    <div
      style={{
        background: `url(${background}) center center / cover no-repeat fixed`,
        height: "100vh",
      }}
    ></div>
  );
};
