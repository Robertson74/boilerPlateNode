import * as inquirer from 'inquirer';
import { generateRepository } from "./generateRoutines/generateRepository";
import { config } from "./config";
// make the interface
// make the class
// make the bussiness layer
// make the repo layer
// update repo registry
//
console.log(config);
console.log("Starting Generation");

const createChoices = [ 
  "Full Repository"
];

const createQuestion = {
  type: "list",
  name: "createAnswer",
  message: "Create what?: ",
  choices: createChoices,
  default: "default input"
};

(async () => {
  const results: inquirer.Answers = await inquirer.prompt([createQuestion]);
  if (results["createAnswer"] == createChoices[0]) {
    let generationResult = await generateRepository();
  } else {
    console.log("Error...");
  }
})();
