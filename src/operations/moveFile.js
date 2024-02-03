import { resolve, basename } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { rm } from "node:fs/promises";

import { Path } from "../Path.js";
import { extractSourceAndDestination as parsePath } from "../utils/extractSrcAndDest.js";
import {
  getInvalidArgsMessage,
  getOperationFailedMessage,
} from "../messages.js";

export const moveFile = async (paths) => {
  const [src, dest] = parsePath(paths);
  if (!src || !dest) {
    console.log(getInvalidArgsMessage());
    return;
  }
  const source = resolve(Path.getCurrentPath(), src);
  const destination = resolve(Path.getCurrentPath(), dest, basename(source));
  try {
    const input = createReadStream(source);
    const output = createWriteStream(destination, { flags: "wx" });
    await pipeline(input, output, { end: false });
    await rm(source, { force: true });
    console.log("File successfully moved!");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        getOperationFailedMessage(
          `No such file or directory: '${source}' -> '${destination}'`
        )
      );
    } else if (error.code === "EEXIST") {
      console.log(
        getOperationFailedMessage(`File already exists: '${destination}'`)
      );
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
