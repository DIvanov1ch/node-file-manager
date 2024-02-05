import { join, posix, win32 } from "node:path";
import { writeFile } from "node:fs/promises";

import { Path } from "../Path.js";
import { extractPaths as parsePath } from "../utils/extractPaths.js";
import { printError } from "../utils/printError.js";
import { isWindows } from "../constants.js";
import { getInvalidArgsMessage } from "../messages.js";

export const createFile = async (input) => {
  const filenames = parsePath(input);
  if (!filenames) {
    console.log(getInvalidArgsMessage());
    return;
  }
  const newPaths = filenames.map((name) => {
    const filename = isWindows ? win32.basename(name) : posix.basename(name);
    return join(Path.getCurrentPath(), filename);
  });
  try {
    await Promise.all(
      newPaths.map(async (path) => {
        await writeFile(path, "", { flag: "ax" });
      })
    );
  } catch (error) {
    printError(error);
  }
};
