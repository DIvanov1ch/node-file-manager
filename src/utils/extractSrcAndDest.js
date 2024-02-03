import { QOUTED_STRINGS_REGEXP } from "../constants.js";

export function extractSourceAndDestination(paths) {
  const [src, dest] = paths.includes('"')
    ? paths
        .match(QOUTED_STRINGS_REGEXP)
        .map((path) => path.toString().replaceAll('"', ""))
    : paths.split(" ");
  return [src, dest];
}
