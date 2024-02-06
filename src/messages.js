import { User } from "./User.js";
import { Path } from "./Path.js";

export const getGreetings = () =>
  `Welcome to the File Manager, ${User.getName()}!`;

export const getGoodbyes = () =>
  `Thank you for using File Manager, ${User.getName()}, goodbye!`;

export const getCurrentDirectoryMessage = () =>
  `You are currently in ${Path.getCurrentPath()}`;

export const getInvalidOperationMessage = (value) =>
  `Invalid input: ${value} is not defined`;

export const getInvalidArgsMessage = () =>
  `Invalid input: incorrect data format`;

export const getOperationFailedMessage = (message) =>
  `Operation failed: ${message}`;
