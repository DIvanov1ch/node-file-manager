import { resolve, extname, win32, posix } from "node:path";
import { createBrotliDecompress } from "node:zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { rm } from "node:fs/promises";

import { Path } from "../Path.js";
import { isWindows } from "../constants.js";
import { extractPaths as parsePath } from "../utils/extractPaths.js";
import { getInvalidArgsMessage } from "../messages.js";
import { printError } from "../utils/printError.js";

export const decompressFile = async (paths) => {
  const [src, dest] = parsePath(paths);
  if (!src || !dest) {
    console.log(getInvalidArgsMessage());
    return;
  }
  const source = resolve(Path.getCurrentPath(), src);
  const filename = isWindows ? win32.basename(source) : posix.basename(source);
  const comressedFilename = filename.replace(extname(filename), "");
  const destination = resolve(Path.getCurrentPath(), dest, comressedFilename);
  try {
    await pipeline(
      createReadStream(source),
      createBrotliDecompress(),
      createWriteStream(destination, { flags: "wx" }),
      { end: false }
    );
    await rm(source, { force: true });
  } catch (error) {
    printError(error);
  }
};
