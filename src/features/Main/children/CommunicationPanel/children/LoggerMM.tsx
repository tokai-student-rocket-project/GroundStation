import { promises as fs } from "fs";

type Props = {
  doLogging: boolean;
  log?: string;
};

const voidElement = <></>;

export const LoggerMM = ({ doLogging, log }: Props) => {
  if (!doLogging) return voidElement;
  if (log == undefined) return voidElement;

  fs.appendFile("./log/MM.json", log + "\n");
  return voidElement;
};
