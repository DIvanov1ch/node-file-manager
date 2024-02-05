import { QOUTED_STRINGS_REGEXP } from "../constants.js";

export function extractPaths(input) {
  const paths = input.includes('"')
    ? input
        .match(QOUTED_STRINGS_REGEXP)
        ?.map((path) => path.toString().replaceAll('"', ""))
    : input.split(" ");
  return paths || [];
}
