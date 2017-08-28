/* tslint:disable */
import * as inquirer from "inquirer";
import * as fs from "fs-extra";
import { repoGenConfig } from "../repoGenConfig";

console.log("Generating Model..");


const noSpaces = (input: string): string | boolean => {
  if (input.match(/\s/)) {
    return "ERROR: No spaces allowed here.";
  } else {
    return true;
  }
}

const types: string[] = [ "any", "array", "boolean", "number", "object", "string", "other" ];
const attributes: string[] = [ "readonly", "optional" ];
let anotherProp: boolean = true;
let header: string = "";
let happyWithModel: boolean = false;
type prop = {
  propertyName: string,
  propertyType: string,
  readOnly: boolean,
  optional: boolean
};
let newProp: prop = {propertyName: "", propertyType: "", readOnly: false, optional: false};
let model: { 
  name: string,
    props: prop[]
} = {
  name: "",
  props: []
};

let classNameQ: inquirer.Question;
let propNameQ: inquirer.Question;
let propTypeQ: inquirer.Question;
let propAttritbutesQ: inquirer.Question;
let okayWithModelQ: inquirer.Question;
let morePropertiesQ: inquirer.Question;

const setupQuestions: Function = () => {

  newProp = {propertyName: "", propertyType: "", readOnly: false, optional: false};

  classNameQ = {
    type: "input",
    name: "answer",
    message: "Model name: ",
    validate: noSpaces
  };

  propNameQ = {
    type: "input",
    name: "answer",
    message: "Name of the property",
    validate: noSpaces
  };

  propTypeQ = {
    type: "list",
    name: "answer",
    choices: types,
    message: "Type of the property",
    validate: noSpaces
  };

  propAttritbutesQ = {
    type: "checkbox",
    name: "answer",
    message: "Set additional property attributes: ",
    choices: attributes
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
    message: "Would you like to add a property:",
  };
}


(async () => {

  // ask for model name
  let getModelName: Function = async () => {
    let classNameA: inquirer.Answers = await inquirer.prompt([classNameQ]);
    model.name = classNameA.answer;
  }

  // ask for property name
  let getPropName: Function = async () => {
    let propNameA: inquirer.Answers = await inquirer.prompt([propNameQ]);
    newProp.propertyName = propNameA.answer;
  }

  // ask for property type
  let getPropType: Function = async () => {
    let propTypeA: inquirer.Answers = await inquirer.prompt([propTypeQ]);
    newProp.propertyType = propTypeA.answer;
  };

  // ask for additional attributes
  let getPropAttributes: Function = async () => {
    let propAttritbutesA: inquirer.Answers = await inquirer.prompt([propAttritbutesQ]);
    if (propAttritbutesA.answer.indexOf("readonly") > -1) { newProp.readOnly = true; };
    if (propAttritbutesA.answer.indexOf("optional") > -1) { newProp.optional = true; };
  };

  // ask if more properties
  let moreProps = async () => {
    let morePropertiesA: inquirer.Answers = await inquirer.prompt([morePropertiesQ]);
    anotherProp = morePropertiesA.answer;
  }

  // ask if happy with the model
  let finishedWithModel = async () => {
    anotherProp = true;
    let okayWithModelA: inquirer.Answers = await inquirer.prompt([okayWithModelQ]);
    happyWithModel = okayWithModelA.answer;
    if (!happyWithModel) { console.log("Let's try again"); }
  }

  // create the display model
  let displayModel: Function = (): string => {
    let displayProperties: string = ""; 

    // build properties
    model.props.forEach((val: prop, index: number, arr: prop[]) => {
      if (val.readOnly) { displayProperties+= "readonly "; }
      displayProperties+= val.propertyName ;
      if (val.optional) { displayProperties+= "?"; }
      displayProperties+= ": ";
      displayProperties+= val.propertyType;
      displayProperties+= ";";
      if (index != arr.length -1) { displayProperties+= "\n        " }
    });

    // build model
    let displayModel: string =
      `model------------------------------------- 
      ${ model.name } {
        ${ displayProperties }
      }
    `;
    return displayModel;
  }

  // collect info from user
  while (happyWithModel == false) {
    model.name = "";
    model.props = [];
    setupQuestions();
    await getModelName();
    while (anotherProp == true) {
      console.log("Creating a property for " + model.name);
      setupQuestions();
      await getPropName();
      await getPropType();
      await getPropAttributes();
      model.props.push(newProp);
      console.log(displayModel());
      await moreProps();
    }
    await finishedWithModel();
  }

  // write out the model
  console.log(await fs.writeFile(repoGenConfig.modelDir + model.name + ".ts", displayModel()));
  console.log("Model(Interface) generated in : " + repoGenConfig.modelDir);

})();
