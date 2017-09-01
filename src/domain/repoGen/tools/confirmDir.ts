/* tslint:disable */
import * as inquirer from "inquirer";
import { noSpaces } from "./validation";

// confirm the write dir
export let confirmDir = async (defaultDir: string|boolean, objectName: string): Promise<string|boolean> => {
  let writeDir: string|boolean = defaultDir;
  let confirmDirQ: inquirer.Question = {
    type: "list",
    name: "answer",
    message: `Write ${objectName} to this DIR: ${defaultDir}?`,
    choices: [
      "yes",
      "no",
      "change DIR"
    ]
  };
  let changeDirQ: inquirer.Question = {
    type: "input",
    name: "answer",
    message: "Where to write?",
    validate: noSpaces,
    default: defaultDir
  }
  let confirmDirA = await inquirer.prompt([confirmDirQ]);
  if (confirmDirA.answer == "change DIR") {
    let changeDirA: inquirer.Answers = await inquirer.prompt([changeDirQ]);
    writeDir = changeDirA.answer;
    confirmDirQ.message = `Write ${objectName} to this DIR: ${writeDir} ?`;
    writeDir = await confirmDir(writeDir, objectName);
  } else if (confirmDirA.answer == "yes") {
    return writeDir;
  } else {
    return false
  }
}
