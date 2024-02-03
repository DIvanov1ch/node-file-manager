import { rm } from "node:fs/promises";
import { resolve } from "node:path";

import { Path } from "../Path.js";
import { getOperationFailedMessage } from "../messages.js";

export const deleteFile = async (path) => {
  const fileToRemovePath = resolve(Path.getCurrentPath(), path);
  try {
    await rm(fileToRemovePath, { force: true });
    console.log(`'${fileToRemovePath}' successfully removed!`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        getOperationFailedMessage(
          `No such file or directory: '${fileToRemovePath}'`
        )
      );
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
