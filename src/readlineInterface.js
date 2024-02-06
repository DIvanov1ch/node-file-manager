import { stdin as input, stdout as output } from "process";
import { createInterface } from "node:readline/promises";

import {
  getGreetings,
  getGoodbyes,
  getCurrentDirectoryMessage,
  getInvalidOperationMessage,
} from "./messages.js";

import { printListOfFilesAndDirectories as printList } from "./operations/printList.js";
import { goToDirectory } from "./operations/goToDirectory.js";
import { readFile } from "./operations/readFile.js";
import { createFile } from "./operations/createFile.js";
import { renameFile } from "./operations/renameFile.js";
import { copyFile } from "./operations/copyFile.js";
import { deleteFile } from "./operations/deleteFile.js";
import { moveFile } from "./operations/moveFile.js";
import { getOperatingSystemInfo as getOSInfo } from "./operations/getOSInfo.js";
import { calculateHash } from "./operations/calculateHash.js";
import { compressFile } from "./operations/compressFile.js";
import { decompressFile } from "./operations/decompressFile.js";

export const createIOInterface = () => {
  const rl = createInterface({ input, output });

  output.write(getGreetings() + "\n");
  printCurrentDirectory();

  rl.on("line", async (input) => {
    const operation = input.toString().trim();
    if (operation.startsWith(".exit")) {
      rl.close();
      return;
    } else if (operation === "up") {
      await goToDirectory("..");
    } else if (operation === "ls") {
      await printList();
    } else if (operation.startsWith("cd ")) {
      const path = operation.replace("cd ", "");
      await goToDirectory(path);
    } else if (operation.startsWith("cat ")) {
      const path = operation.replace("cat ", "");
      await readFile(path);
    } else if (operation.startsWith("add ")) {
      const path = operation.replace("add ", "");
      await createFile(path);
    } else if (operation.startsWith("rn ")) {
      const paths = operation.replace("rn ", "");
      await renameFile(paths);
    } else if (operation.startsWith("cp ")) {
      const paths = operation.replace("cp ", "");
      await copyFile(paths);
    } else if (operation.startsWith("rm ")) {
      const path = operation.replace("rm ", "");
      await deleteFile(path);
    } else if (operation.startsWith("mv ")) {
      const paths = operation.replace("mv ", "");
      await moveFile(paths);
    } else if (operation.startsWith("os ")) {
      const flag = operation.replace("os --", "");
      const info = getOSInfo(flag);
      output.write(info + "\n");
    } else if (operation.startsWith("hash ")) {
      const path = operation.replace("hash ", "");
      await calculateHash(path);
    } else if (operation.startsWith("compress ")) {
      const paths = operation.replace("compress ", "");
      await compressFile(paths);
    } else if (operation.startsWith("decompress ")) {
      const paths = operation.replace("decompress ", "");
      await decompressFile(paths);
    } else {
      output.write(getInvalidOperationMessage(input) + "\n");
    }
    printCurrentDirectory();
  });

  rl.on("close", () => {
    output.write("\n" + getGoodbyes() + "\n");
  });
};

function printCurrentDirectory() {
  output.write("\n" + getCurrentDirectoryMessage() + "\n");
  output.write("> ");
}
