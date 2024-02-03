import { resolve } from "node:path";
import { pipeline } from "stream/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { stdout } from "process";

import { Path } from "../Path.js";
import { getOperationFailedMessage } from "../messages.js";

export const calculateHash = async (path) => {
  const filepath = resolve(Path.getCurrentPath(), path);
  try {
    const input = createReadStream(filepath);
    const hash = createHash("sha256");
    await pipeline(input, hash.setEncoding("hex"), stdout, { end: false });
    stdout.write("\n");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(
        getOperationFailedMessage(`No such file or directory: '${filepath}'`)
      );
    } else {
      console.log(getOperationFailedMessage(error.message));
    }
  }
};
