/* tslint:disable */
import * as fs from "fs-extra"
import { exec } from "child_process";
import { repoGenConfig } from "../repoGenConfig";
import { getRelativePath } from "../tools/getRelativePath";
import * as inquirer from "inquirer";
import { Prop, Model, EntityProp, genEntity } from "../types";

const noSpaces = (input: string): string | boolean => {
  if (input.length == 0) {
    return "ERROR: Empty string not allowed here"
  }
  if (input.match(/\s/)) {
    return "ERROR: No spaces allowed here.";
  } else {
    return true;
  }
}

export let generateEntity: Function = async (generatedModel: Model) => {

  // globals
  let isDbEntity: boolean = false;
  let primaryExists = false;
  let primaryGenerated = false;

  let generatedEntity: genEntity = {
    name: "",
    dbName: "",
    props: []

  };

  console.log("Creating Entity...");
  // questions
  let isDatabaseEntityQ: inquirer.Question;
  let entityDbNameQ: inquirer.Question;
  let propertyNameQ: inquirer.Question;
  let propertyTypeQ: inquirer.Question;
  let propertyOptionsQ: inquirer.Question;

  // ask if this is a model to be persisted to the database
  let askIfDbEntity: Function = async (ent: genEntity) => {
    let isDatabaseEntityQ123: inquirer.Question;
    isDatabaseEntityQ123 = {
      type: "confirm",
      name: "answer",
      message: "Will this entity (" + ent.name +") be persisted?",
      validate: noSpaces
    };
    let isDatabaseEntityA: inquirer.Answers = await inquirer.prompt([isDatabaseEntityQ123]);
    isDbEntity = isDatabaseEntityA.answer
  };

  // ask for entity database name
  let askDBName: Function = async (ent: genEntity) => {
    entityDbNameQ = {
      type: "input",
      name: "answer",
      message: "Name of table for entity " + ent.name + ": ",
      validate: noSpaces
    };
    let entityDbNameA: inquirer.Answers = await inquirer.prompt([entityDbNameQ]);
    ent.dbName = entityDbNameA.answer;
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
    prop.dbName = propertyNameA.answer;
    return prop;
  };

  // ask for property database type
  let askPropType: Function = async (prop: EntityProp) => {
    propertyTypeQ = {
      type: "list",
      name: "answer",
      message: "Type of the above property in the database",
      choices: [
        "DGAF",
        "bigint",
        "char",
        "date",
        "datetime",
        "decimal",
        "double",
        "float",
        "int",
        "mediumint",
        "smallint",
        "timestamp",
        "tinyint",
        "varchar"
      ],
      validate: noSpaces
    };
    let propertyTypeA: inquirer.Answers = await inquirer.prompt([propertyTypeQ]);
    prop.dbType = propertyTypeA.answer;
    return prop;
  };

  // ask for other property options
  let askPropOptions: Function = async (prop: EntityProp) => {
    let choices: string[] = [
      "private",
      "unique",
      "disable getter",
      "disable setter",
    ];
    if (!primaryExists) {
      choices.push("primary key (generated)"); 
      choices.push("primary key (non-generated)"); 
    }
    propertyOptionsQ = {
      type: "checkbox",
      name: "answer",
      message: "Choose any additional options for the above property",
      choices: choices
    };
    let propertyOptionsA: inquirer.Answers = await inquirer.prompt([propertyOptionsQ]);
    if (propertyOptionsA.answer.indexOf("disable getter") > -1) { prop.noGetter = true; };
    if (propertyOptionsA.answer.indexOf("disable setter") > -1) { prop.noSetter = true; };
    if (propertyOptionsA.answer.indexOf("private") > -1) { prop.isPrivate = true; };
    if (propertyOptionsA.answer.indexOf("unique") > -1) { prop.unique = true; };
    if (propertyOptionsA.answer.indexOf("primary key (generated)") > -1) { 
      primaryExists = true;
      primaryGenerated = true;
      prop.primary = true; 
      prop.unique = false; 
    };
    if (propertyOptionsA.answer.indexOf("primary key (non-generated)") > -1) { 
      primaryExists = true;
      primaryGenerated = false;
      prop.primary = true; 
      prop.unique = false; 
    };
    return prop;
  };

  // display properties
  let buildDisplayProperties: Function = (ent: genEntity) => {
    let displayProperties = ``;
    ent.props.forEach((val: EntityProp) => {
      if (val.primary) {
        if (primaryGenerated) {
          displayProperties+= `  @PrimaryGeneratedColumn({name: "${val.dbName}"`;
        } else {
          displayProperties+= `  @PrimaryColumn({name: "${val.dbName}"`;
        }
      } else {
        displayProperties+= `  @Column({name: "${val.dbName}"`;
      }
      if (val.dbType != "DGAF") { displayProperties+= `, type: "${val.dbType}"`; }
      if (val.length > -1) { displayProperties+= `, length: ${val.length}`; }
      if (val.unique) { displayProperties+= `, unique: ${val.unique}`; }
      displayProperties+= `})\n`;
      displayProperties+= `  private _` + val.name + `: ` + val.type + `;\n\n`;
    });
    return displayProperties
  };

  // display entity
  let buildDisplayEnity: Function = (ent: genEntity) => {
    let displayProperties: string = buildDisplayProperties(ent);
    let displayEntity: string = 
      `\nEntity---------------------------------\n\n`
      + `@Entity("${ ent.dbName }")\n`
      + `class ${ ent.name } {\n\n`
      + `${displayProperties}`
      +`}`
    return displayEntity
  };

  // build header imports
  let buildHeaderImports: Function = (): string => {
    let headers: string = 
     `import { Column } from "typeorm/decorator/columns/Column";\n`
    + `import { Entity } from "typeorm/decorator/entity/Entity";\n`
    + `import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn";\n`
    + `import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";\n\n`;
    return headers;
  };

  // build getters and setter for entity
  let buildGetterSetters: Function = (ent: genEntity): string => {
    let getterSetters: string = "";
    for (let prop of ent.props) {
      if (prop.isPrivate) { return };
      if (!prop.noGetter) {
        getterSetters+=
          `  get ${prop.name}(): ${prop.type} {\n`
          + `    return this._${prop.name};\n`
          + `  }\n\n`
      }
      if (!prop.noSetter) {
        getterSetters+=
          `  set ${prop.name}(${prop.name}: ${prop.type}) {\n`
          + `    this._${prop.name} = ${prop.name};\n`
          + `  }\n\n`;
      }
    }
    return getterSetters;
  };

  // build the entity to write to file
  let buildWriteEntity: Function = (ent: genEntity): string => {
    let displayProperties: string = buildDisplayProperties(ent);
    let getterSetters: string = buildGetterSetters(ent);
    let headers: string = buildHeaderImports();
    let writeEntity: string =
      `${headers}`
      + `@Entity("${ ent.dbName }")\n`
      + `export class ${ ent.name } {\n\n`
      + `${displayProperties}`
      + `  constructor() {\n    // defaults \n  }\n\n`
      + `${getterSetters}`
      +`}\n`;
    return writeEntity;
  }

  // confirm dir to write to
  let confirmDir = async () => {
    let confirmDirQ: inquirer.Question;
    confirmDirQ = {
      type: "list",
      name: "answer",
      message: "Write entity to this DIR: " + repoGenConfig.entityDir + " ?",
      choices: [
        "yes",
        "no",
        "change DIR"
      ]
    };
    let changeDirQ: inquirer.Question;
    changeDirQ = {
      type: "input",
      name: "answer",
      message: "Where to write?",
      validate: noSpaces,
      default: repoGenConfig.entityDir
    }
    let confirmDirA = await inquirer.prompt([confirmDirQ]);
    if (confirmDirA.answer == "change DIR") {
      let changeDirA: inquirer.Answers = await inquirer.prompt([changeDirQ]);
      repoGenConfig.modelDir = changeDirA.answer;
      confirmDirQ.message = "Write interface to this DIR: " + repoGenConfig.modelDir + " ?";
      await confirmDir();
    }
    if (confirmDirA.answer == "yes") {
      return true;
    } else {
      return false;
    }
  }

  (async () => {
    generatedEntity.name = generatedModel.name;
    await askIfDbEntity(generatedEntity);
    if (isDbEntity) {
      generatedEntity = await askDBName(generatedEntity, generatedModel);
    }
    for (let prop of generatedModel.props) {
      let eProp: EntityProp = {
        name: prop.propertyName,
        type: prop.propertyType,
        dbName: "",
        dbType: "",
        isPrivate: false,
        length: -1,
        noGetter: false,
        noSetter: false,
        percision: -1,
        primary: false,
        unique: false
      };
      if (isDbEntity) {
        console.log(buildDisplayEnity(generatedEntity));
        console.log("\ndefining property --- " +prop.propertyName + ": " + prop.propertyType + "\n");
        eProp = await askPropName(eProp);
        console.log("\ndefining property --- " +prop.propertyName + ": " + prop.propertyType + "\n");
        eProp = await askPropType(eProp);
        console.log("\ndefining property --- " +prop.propertyName + ": " + prop.propertyType + "\n");
        eProp = await askPropOptions(eProp);
      }
      generatedEntity.props.push(eProp);
    };
    console.log(buildDisplayEnity(generatedEntity));
    console.log("Writing entity...");
    if (await confirmDir()) {
      await fs.ensureDir(repoGenConfig.entityDir);
      await fs.writeFile(repoGenConfig.entityDir + "/" + generatedEntity.name + ".ts", buildWriteEntity(generatedEntity));
    }
    console.log(buildWriteEntity(generatedEntity));
  })();

}
