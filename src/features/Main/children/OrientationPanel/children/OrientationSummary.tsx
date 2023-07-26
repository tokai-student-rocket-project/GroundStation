type Props = {
  yaw?: number;
  pitch?: number;
  roll?: number;
};

export const OrientationSummary = ({ yaw, pitch, roll }: Props) => {
  return (
    <div className="mx-4">
      <div className="my-2">
        <p className="heading has-text-light has-text-centered">Yaw</p>
        <table width="64px">
          <tbody>
            <tr>
              <td width="32m">
                <p className="has-text-light has-text-right">
                  {yaw?.toFixed() ?? "---"}
                </p>
              </td>
              <td style={{ verticalAlign: "middle has-text-left" }}>
                <p className="has-text-light mx-1">°</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-2">
        <p className="heading has-text-light has-text-centered">Pitch</p>
        <table width="64px">
          <tbody>
            <tr>
              <td width="32m">
                <p className="has-text-light has-text-right">
                  {pitch?.toFixed() ?? "---"}
                </p>
              </td>
              <td style={{ verticalAlign: "middle" }}>
                <p className="has-text-light mx-1 has-text-left">°</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-2">
        <p className="heading has-text-light has-text-centered">Roll</p>
        <table width="64px">
          <tbody>
            <tr>
              <td width="32m">
                <p className="has-text-light has-text-right">
                  {roll?.toFixed() ?? "---"}
                </p>
              </td>
              <td style={{ verticalAlign: "middle" }}>
                <p className="has-text-light mx-1 has-text-left">°</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
