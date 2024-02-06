import { resolve, join, dirname } from "node:path";
import { rename } from "node:fs/promises";
import { existsSync } from "node:fs";

import { Path } from "../Path.js";
import { extractPaths as parsePath } from "../utils/extractPaths.js";
import { getInvalidArgsMessage } from "../messages.js";
import { printError } from "../utils/printError.js";

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
      const existError = new Error(`File already exists ${newPath}`);
      existError.code = "EEXIST";
      throw existError;
    }
    await rename(oldPath, newPath);
  } catch (error) {
    printError(error);
  }
};
