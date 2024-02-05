import { homedir, platform } from "node:os";
import { resolve, sep } from "node:path";
import { isWindows } from "./constants.js";

export const Path = (() => {
  let currentPath = homedir();

  const capitalizeFirstLetter = (path) =>
    path.charAt(0).toUpperCase() + path.slice(1);

  return {
    getCurrentPath: () => currentPath,

    setCurrentPath: (value) => {
      currentPath = capitalizeFirstLetter(value);
    },

    getRootDirectory: () =>
      isWindows
        ? resolve(`${currentPath.split(sep).at(0).toUpperCase()}/`)
        : "/",
  };
})();
