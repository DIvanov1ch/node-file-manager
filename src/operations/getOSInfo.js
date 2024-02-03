import { EOL, cpus, homedir, userInfo, arch } from "node:os";
import { getOperationFailedMessage } from "../messages.js";

export const getOperatingSystemInfo = (flag) => {
  try {
    if (flag === "EOL") return `End-of-line marker: '${EOL}'`;
    if (flag === "homedir") return `Homedir: ${homedir()}`;
    if (flag === "username") return `Username: ${userInfo().username}`;
    if (flag === "architecture") return `CPU architecture: ${arch()}`;
    if (flag === "cpus") {
      const cpusInfo = cpus().map((cpu) => {
        return { Model: cpu.model, "Clock rate, GHz": cpu.speed/1000 };
      });
      console.table(cpusInfo);
      return `Amount: ${cpus().length}`;
    }
  } catch (error) {
    console.log(getOperationFailedMessage(error.message));
  }
};
