import { readdir } from "node:fs/promises";

import { Path } from "../Path.js";
import { getOperationFailedMessage } from "../messages.js";
import { goToDirectory as goUp } from "./goToDirectory.js";

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
    if (error.code === "ENOENT") {
      console.log(
        getOperationFailedMessage(
          `No such file or directory: '${Path.getCurrentPath()}'`
        )
      );
      await goUp("..");
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
