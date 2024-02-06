import { resolve, posix, win32 } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { rm } from "node:fs/promises";

import { Path } from "../Path.js";
import { isWindows } from "../constants.js";
import { extractPaths as parsePath } from "../utils/extractPaths.js";
import { getInvalidArgsMessage } from "../messages.js";
import { printError } from "../utils/printError.js";

export const moveFile = async (paths) => {
  const [src, dest] = parsePath(paths);
  if (!src || !dest) {
    console.log(getInvalidArgsMessage());
    return;
  }
  const source = resolve(Path.getCurrentPath(), src);
  const filename = isWindows ? win32.basename(source) : posix.basename(source);
  const destination = resolve(Path.getCurrentPath(), dest, filename);
  try {
    const input = createReadStream(source);
    const output = createWriteStream(destination, { flags: "wx" });
    await pipeline(input, output, { end: false });
    await rm(source, { force: true });
  } catch (error) {
    printError(error);
  }
};
