import { getOperationFailedMessage } from "../messages.js";

export const printError = (error) => {
  const { code, message } = error;
  console.log(getOperationFailedMessage(message.replace(`${code}: `, "")));
};
