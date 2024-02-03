import { resolve } from "node:path";
import { access } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stdout } from "node:process";

import { Path } from "../Path.js";
import { getOperationFailedMessage } from "../messages.js";

export const readFile = async (path) => {
  const fileToReadPath = resolve(Path.getCurrentPath(), path);
  try {
    await access(fileToReadPath);
    const rs = createReadStream(fileToReadPath, {
      encoding: "utf-8",
    });
    await pipeline(rs, stdout, { end: false });
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        getOperationFailedMessage(
          `No such file or directory: '${fileToReadPath}'`
        )
      );
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
