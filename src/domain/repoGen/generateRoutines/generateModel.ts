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
    message: "Would you like to add a properties?:",
  };
}


(async () => {

  setupQuetsions();

  let newProp: prop = {propertyName: "", propertyType: "", readOnly: false, optional: false};

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

  let displayModel: Function = (): string => {
    let displayProperties: string = ""; 
    model.props.forEach((val: prop) => {
      displayProperties+= val.propertyName + ": "
      displayProperties+= val.propertyType
      displayProperties+= ";"
    });
    console.log(displayProperties);
    let displayModel: string =
    `model------------------------------------- 
      ${ model.name } {
        ${ displayProperties }
      }
    `;
    return displayModel;
  }

  await getModelName();
  await getPropName();
  await getPropType();
  await getPropAttributes();
  model.props.push(newProp);
  console.log(displayModel());
  console.log(newProp);

  // const classNameA: inquirer.Answers = await inquirer.prompt([classNameQ]);
  // header += "\nModel ----------------------------------------\n " + classNameA.answer + " {\n";

  // while (happyWithModel == false) {
  //   header = "";
  //   while (anotherProp == true) {
  //     setupQuetsions();

  //     getPropName();
  //     getPropType();
  //     getAdditionalInfo();
  //     AskIfDone();
  //     // ask for property name
  //     propNameQ.message = header + "\n" + propNameQ.message + "\n";
  //     let propNameA: inquirer.Answers = await inquirer.prompt([propNameQ]);
  //     header += "   " + propNameA.answer + ": ";

  //     // ask for property type
  //     propTypeQ.message = header + "\n\n" + propTypeQ.message + "\n";
  //     let propTypeA: inquirer.Answers = await inquirer.prompt([propTypeQ]);
  //     header += propTypeA.answer + ";\n"

  //     // ask if done
  //     morePropertiesQ.message = header + "\n" + morePropertiesQ.message + "\n";
  //     let morePropertiesA: inquirer.Answers = await inquirer.prompt([morePropertiesQ]);
  //     anotherProp = morePropertiesA.answer;
  //     console.log(morePropertiesA.answer);
  //   }

  //   okayWithModelQ.message = "------------\n" + header + "  }\n" + okayWithModelQ.message + "\n";
  //   let okayWithModelA: inquirer.Answers = await inquirer.prompt([okayWithModelQ]);
  // }

})();
