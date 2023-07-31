import { promises as fs } from "fs";

type Props = {
  doLogging: boolean;
  log?: string;
};

const voidElement = <></>;

export const LoggerACM = ({ doLogging, log }: Props) => {
  if (!doLogging) return voidElement;
  if (log == undefined) return voidElement;

  fs.appendFile("./log/ACM.json", log + "\n");
  return voidElement;
};
