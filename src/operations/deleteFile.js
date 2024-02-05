import { rm } from "node:fs/promises";
import { resolve } from "node:path";

import { Path } from "../Path.js";
import { printError } from "../utils/printError.js";

export const deleteFile = async (path) => {
  const fileToRemovePath = resolve(Path.getCurrentPath(), path);
  try {
    await rm(fileToRemovePath);
  } catch (error) {
    printError(error);
  }
};
