// thoughts
// need
// name of the model
// properties loop 
// get property name
// get property type
// is optional?
// readonly?
import * as inquirer from 'inquirer';

console.log("Generating Model..");

const types: string[] = ["any", "array", "boolean", "object", "string", "other"];

const noSpaces = (input: string): string | boolean => {
  if (input.match(/\s/)) {
    return "ERROR: No spaces allowed here.";
  } else {
    return true;
  }
}

let doneWithProps: boolean = false;
let header: string = "";


let classNameQ: inquirer.Question;
let propNameQ: inquirer.Question;
let propTypeQ: inquirer.Question;
let okayWithModelQ: inquirer.Question;
let morePropertiesQ: inquirer.Question;

const setupQuetsions: Function = () => {

  classNameQ = {
    type: "input",
    name: "answer",
    message: "Model name: ",
    validate: noSpaces
  };

  propNameQ = {
    type: "input",
    name: "answer",
    message: "Name of the property"
  };

  propTypeQ = {
    type: "list",
    name: "answer",
    choices: types,
    message: "Type of the property",
    validate: noSpaces
  };

  okayWithModelQ = {
    type: "confirm",
    name: "answer",
    choices: types,
    message: "Ok with above model?",
  };

  morePropertiesQ = {
    type: "confirm",
    name: "answer",
    message: "Would you like more properties?:",
  };
}

setupQuetsions();

(async () => {

  const classNameA: inquirer.Answers = await inquirer.prompt([classNameQ]);
  header += "\nModel ----\n " + classNameA.answer + " {\n";

  while (!doneWithProps) {
    setupQuetsions();

    // ask for property name
    propNameQ.message = header + "\n" + propNameQ.message + "\n";
    let propNameA: inquirer.Answers = await inquirer.prompt([propNameQ]);
    header += "   " + propNameA.answer + ": ";

    // ask for property type
    propTypeQ.message = header + "\n\n" + propTypeQ.message + "\n";
    let propTypeA: inquirer.Answers = await inquirer.prompt([propTypeQ]);
    header += propTypeA.answer + ";\n"

    // ask if done
    morePropertiesQ.message = header + "\n" + morePropertiesQ.message + "\n";
    let morePropertiesA: inquirer.Answers = await inquirer.prompt([morePropertiesQ]);

    doneWithProps = morePropertiesA.answers;
  }
  okayWithModelQ.message = "------------\n" + header + "\n" + okayWithModelQ.message + "\n";
  let okayWithModelA: inquirer.Answers = await inquirer.prompt([okayWithModelQ]);
})();
