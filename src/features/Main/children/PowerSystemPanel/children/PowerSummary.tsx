type Props = {
  supplyVoltage?: number;
  batteryVoltage?: number;
  poolVoltage?: number;
  source: string;
};

export const PowerSummary = ({
  supplyVoltage,
  batteryVoltage,
  poolVoltage,
  source,
}: Props) => {
  return (
    <nav className="level is-justify-content-center mb-2">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Supply</p>
          <table width="100%">
            <tbody>
              <tr>
                <td width="64m">
                  <p className="has-text-light">
                    {supplyVoltage?.toFixed(2) ?? "--.--"}
                  </p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p className="has-text-light mx-1">V</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Battery</p>
          <table width="100%">
            <tbody>
              <tr>
                <td width="64m">
                  <p className="has-text-light">
                    {batteryVoltage?.toFixed(2) ?? "--.--"}
                  </p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p className="has-text-light mx-1">V</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Pool</p>
          <table width="100%">
            <tbody>
              <tr>
                <td width="64m">
                  <p className="has-text-light">
                    {poolVoltage?.toFixed(2) ?? "--.--"}
                  </p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p className="has-text-light mx-1">V</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading has-text-light">Source</p>
          <table width="100%">
            <tbody>
              <tr>
                <td width="64m">
                  <p className="has-text-primary has-text-weight-semibold">
                    {source}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </nav>
  );
};
