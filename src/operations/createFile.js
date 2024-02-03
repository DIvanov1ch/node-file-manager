import { resolve } from "node:path";
import { writeFile } from "node:fs/promises";

import { Path } from "../Path.js";
import { getOperationFailedMessage } from "../messages.js";

export const createFile = async (filename) => {
  const filepath = resolve(Path.getCurrentPath(), filename);
  try {
    await writeFile(filepath, "", { flag: "ax" });
    console.log(`'${filename}' successfully created!`);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(
        getOperationFailedMessage(`File already exists: '${filepath}'`)
      );
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
