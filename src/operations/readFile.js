import { resolve } from "node:path";
import { access } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stdout } from "node:process";

import { Path } from "../Path.js";
import { extractPaths as parsePath } from "../utils/extractPaths.js";
import { printError } from "../utils/printError.js";
import { getInvalidArgsMessage } from "../messages.js";

export const readFile = async (input) => {
  const [filename] = parsePath(input);
  if (!filename) {
    console.log(getInvalidArgsMessage());
    return;
  }
  const pathToFile = resolve(Path.getCurrentPath(), filename);
  try {
    await access(pathToFile);
    const rs = createReadStream(pathToFile, {
      encoding: "utf-8",
    });
    await pipeline(rs, stdout, { end: false });
    console.log();
  } catch (error) {
    printError(error);
  }
};
