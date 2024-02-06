import { readdir } from "node:fs/promises";

import { Path } from "../Path.js";
import { goToDirectory as goUp } from "./goToDirectory.js";
import { printError } from "../utils/printError.js";

export const printListOfFilesAndDirectories = async () => {
  try {
    const files = await readdir(Path.getCurrentPath(), {
      withFileTypes: true,
    });
    const info = files
      .filter((file) => file.isDirectory() || file.isFile())
      .sort((a, b) => b.isDirectory() - a.isDirectory())
      .map((file) => {
        return {
          Name: file.name,
          Type: file.isDirectory() ? "directory" : "file",
        };
      });
    console.table(info);
  } catch (error) {
    printError(error);
    if (error.code === "ENOENT") {
      await goUp("..");
    }
  }
};
