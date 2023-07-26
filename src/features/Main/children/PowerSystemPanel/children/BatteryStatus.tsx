import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faBatteryEmpty,
  faBatteryQuarter,
  faBatteryHalf,
  faBatteryThreeQuarters,
  faBatteryFull,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  voltage?: number;
};

const voltageToPercent = (voltage?: number): number | undefined => {
  if (voltage == undefined) return undefined;

  const maxVoltage = 15;
  const minVoltage = 8;

  return ((voltage - minVoltage) / (maxVoltage - minVoltage)) * 100;
};

const voltageToColor = (voltage?: number): string => {
  if (voltage == undefined) return "#7A7A7A";

  // ロングラン結果より
  // 10分以内に動作停止
  if (voltage < 11) return "#FF385F";
  // 30分以内に動作停止
  if (voltage < 12) return "#FFDD56";

  return "#23D160";
};

const voltageToMessage = (voltage?: number): string => {
  if (voltage == undefined) return "";
  if (voltage < 11) return "≦ 10min";
  if (voltage < 12) return "≦ 30min";
  return "";
};

const voltageToIcon = (voltage?: number): IconDefinition => {
  const percent = voltageToPercent(voltage);

  if (percent == undefined) return faBatteryEmpty;
  if (percent < 25) return faBatteryEmpty;
  if (percent < 50) return faBatteryQuarter;
  if (percent < 75) return faBatteryHalf;
  if (percent < 100) return faBatteryThreeQuarters;
  return faBatteryFull;
};

export const BatteryStatus = ({ voltage }: Props) => {
  return (
    <div className="is-flex is-align-items-center mx-4">
      <FontAwesomeIcon
        icon={voltageToIcon(voltage)}
        color={voltageToColor(voltage)}
        size="lg"
        className="mx-1"
      />
      <p className="is-size-7 mx-1" style={{ color: voltageToColor(voltage) }}>
        {`${voltageToPercent(voltage)?.toFixed() ?? "---"}%`}
      </p>
      <p
        className="is-size-6 mx-1 has-text-weight-semibold"
        style={{ color: voltageToColor(voltage) }}
      >
        {voltageToMessage(voltage)}
      </p>
    </div>
  );
};
