/* tslint:disable */
import * as fs from "fs-extra"
import { exec } from "child_process";
import { repoGenConfig } from "../repoGenConfig";
import { getRelativePath } from "../tools/getRelativePath";
import * as inquirer from "inquirer";
import { Prop, Model, EntityProp, genEntity } from "../types";

const noSpaces = (input: string): string | boolean => {
  if (input.match(/\s/)) {
    return "ERROR: No spaces allowed here.";
  } else {
    return true;
  }
}

export let generateEntity: Function = async (generatedModel: Model) => {

  // globals
  let primaryExists = false;
  let entity: genEntity

  console.log("Creating Entity...");
  // questions
  let entityNameQ;
  let propertyNameQ;
  let propertyTypeQ;
  let propertyOptionsQ;

  let buildWriteEntity: Function = () => {
  }

  // ask for entity database name
  let askDBName: Function = async (ent: genEntity) => {
    let entityNameQ;
    entityNameQ = {
      type: "input",
      name: "answer",
      message: "Name of table in the database: ",
      validate: noSpaces
    };
    let entityNameA: inquirer.Answers = await inquirer.prompt([entityNameQ]);
    ent.dbName = entityNameA.answer;
    return ent;
  };

  // ask for property database name
  let askPropName: Function = async (prop: EntityProp) => {
    propertyNameQ = {
      type: "input",
      name: "answer",
      message: "Name of the above property in the database: ",
      validate: noSpaces
    };
    let propertyNameA: inquirer.Answers = await inquirer.prompt([propertyNameQ]);
    prop.name = propertyNameA.answer;
    return prop;
  };

  // ask for property database type
  let askPropType: Function = async (prop: EntityProp) => {
    propertyTypeQ = {
      type: "input",
      name: "answer",
      message: "Name of the above property in the database: ",
      validate: noSpaces
    };
    let propertyTypeA: inquirer.Answers = await inquirer.prompt([propertyTypeQ]);
    prop.type = propertyTypeA.answer;
    return prop;
  };

  // ask for other property options
  let askPropOptions: Function = async (prop: EntityProp) => {
    propertyOptionsQ = {
      type: "choice",
      name: "answer",
      message: "Choose any additional options for the above property",
      choices: [
        "private",
        "primary key",
        "unique"
      ],
      validate: noSpaces
    };
    let propertyOptionsA: inquirer.Answers = await inquirer.prompt([propertyOptionsQ]);
    if (propertyOptionsA.answer.indexOf("private") > -1) { prop.isPrivate = true; };
    if (propertyOptionsA.answer.indexOf("unique") > -1) { prop.unique = true; };
    if (propertyOptionsA.answer.indexOf("primary key") > -1) { 
      prop.primary = true; 
      prop.unique = false; 
    };
    return prop;
  };

  console.log("Done Creating Entity...");
}
