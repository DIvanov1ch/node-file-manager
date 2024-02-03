import { isAbsolute, resolve } from "node:path";
import { access } from "node:fs/promises";

import { Path } from "../Path.js";
import { getOperationFailedMessage } from "../messages.js";

export const goToDirectory = async (path) => {
  if (path === "/") {
    path = Path.getRootDirectory();
  }
  const absolutePath = isAbsolute(path)
    ? resolve(path)
    : resolve(Path.getCurrentPath(), path);
  try {
    await access(absolutePath);
    Path.setCurrentPath(absolutePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        getOperationFailedMessage(
          `No such file or directory: '${absolutePath}'`
        )
      );
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
