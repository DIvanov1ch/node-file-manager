import { resolve, join, dirname } from "node:path";
import { rename } from "node:fs/promises";
import { existsSync } from "node:fs";

import { Path } from "../Path.js";
import { extractSourceAndDestination as parsePath } from "../utils/extractSrcAndDest.js";
import {
  getInvalidArgsMessage,
  getOperationFailedMessage,
} from "../messages.js";

export const renameFile = async (paths) => {
  const [oldFilename, newFilename] = parsePath(paths);
  if (!oldFilename || !newFilename) {
    console.log(getInvalidArgsMessage());
    return;
  }
  const oldPath = resolve(Path.getCurrentPath(), oldFilename);
  const newPath = join(dirname(oldPath), newFilename);
  try {
    if (existsSync(newPath)) {
      const existError = new Error("File already exists");
      existError.code = "EEXIST";
      throw existError;
    }
    await rename(oldPath, newPath);
    console.log("File successfully renamed!");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        getOperationFailedMessage(
          `No such file or directory: '${oldPath}' -> '${newPath}'`
        )
      );
    } else if (error.code === "EEXIST") {
      console.log(
        getOperationFailedMessage(`File already exists: '${newPath}'`)
      );
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
