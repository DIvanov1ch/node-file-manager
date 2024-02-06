import { argv } from "node:process";

import { User } from "../User.js";
import { PREFIX } from "../constants.js";

export const parseArgs = () => {
  if (argv.at(2)) {
    User.setName(argv.at(2).replace(PREFIX, ""));
  }
};
