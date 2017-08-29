/* tslint:disable */
import * as inquirer from 'inquirer';
import { generateInterface } from "./generateRoutines/generateModel";

let whatToCreateQ: inquirer.Question;

let setupQuestions: Function = () => {
  whatToCreateQ = {
    type: "list",
    name: "answer",
    message: "What objects should be created?",
    choices: [
      "Interface"
    ]
  };
};


(async () => {
  setupQuestions();
  let whatToCreateA: inquirer.Answers = await inquirer.prompt([whatToCreateQ]);
  switch (whatToCreateA.answer) {

    case 'Interface':
      await generateInterface();
      break;
    
    default:
      console.error("ERROR");
  }
})();
// ask what to create
