const fs = require('fs');
const path = require('path');

const getCallerFileName = () => {
  const originalFunc = Error.prepareStackTrace;

  let callerFullFileName;
  let oneStack;
  try {
    const errForStack = new Error();

    Error.prepareStackTrace = (err, stack) => stack;

    const currentfile = errForStack.stack.shift().getFileName();

    while (errForStack.stack.length) {
      oneStack = errForStack.stack.shift();
      callerFullFileName = oneStack.getFileName();

      if (currentfile !== callerFullFileName) break;
    }
  } catch (e) { /* empty */
  }

  Error.prepareStackTrace = originalFunc;

  const callerFileName = path.basename(callerFullFileName);
  const result = `(${callerFileName} [${oneStack}])`;

  return result;
};

const saveMessage = (messageForSave, messageObj = null) => {
  const callerFile = getCallerFileName();
  const date = new Date();
  let message = messageForSave;
  if (
    typeof message === 'object'
  ) {
    message = JSON.stringify(message, null, ' ');
  }
  let messageObjStr = messageObj;
  if (messageObj) {
    if (
      typeof messageObj === 'object'
    ) {
      messageObjStr = JSON.stringify(messageObjStr, null, ' ');
    }
    message += ` ${messageObjStr}`;
  }
  const dateString = `${date.toLocaleString('en-GB')}: `;
  const formattedMessage = message.replace(/\n/g, `\n${' '.repeat(dateString.length)}`)
    .trim();

  const text = `${dateString}${formattedMessage} ${callerFile}\n`;
  fs.appendFile('message.txt', text, () => {
  });
};

const saveMongooseConnectionReadyState = (readyState) => {
  let readyStateString = 'MongooseConnectionReadyState: ';
  switch (readyState) {
    case 0:
      readyStateString += 'disconnected';
      break;
    case 1:
      readyStateString += 'connected';
      break;
    case 2:
      readyStateString += 'connecting';
      break;
    case 3:
      readyStateString += 'disconnecting';
      break;
    default:
      readyStateString += 'unknown state';
  }
  saveMessage(readyStateString);
};

const dateToStr = (date) => date.toLocaleString('en-GB', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}).split('/').reverse().join('-');

const dateAddDays = (date, numDays) => {
  const msInDay = 24 * 60 * 60 * 1000;
  return new Date(date.getTime() + numDays * msInDay);
};

module.exports = {
  saveMessage,
  saveMongooseConnectionReadyState,
  dateToStr,
  dateAddDays,
};
