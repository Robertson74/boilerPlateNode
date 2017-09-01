/* tslint:disable */
import * as inquirer from "inquirer";
import { generateEntity } from "./generateEntity";
import { generateInterface } from "./generateModel";
import { genEntity, genModel, genProp, domainPaths } from "../types";
import { generateRepoLayers } from "./generateRepoLayers";
import { generateUpdateRegistry } from "./generateUpdateRegistry";

// confirm making an entity
let askToContinue: Function = async () => {
  let askToContinueQ: inquirer.Question = {
    message: "Press enter to make a entity...",
    name: "answer"
  }
  await inquirer.prompt(askToContinueQ);

};

(async () => {
  console.log("Generating");
  // let ent: genEntity = {
  //   name: "Newclass",
  //   dbName: "",
  //   props: [],
  //   modelDir: "",
  //   writeDir: ""
  // };
  // let paths: domainPaths = {
  //   busDir: "./src/domain/bus/path/here/",
  //   repoDir: "./src/domain/repo/path/here/"
  // }
  await askToContinue();
  let model: genModel = await generateInterface();
  let ent: genEntity = await generateEntity(model);
  let paths: domainPaths = await generateRepoLayers(ent);
  await generateUpdateRegistry(ent, paths);
})();
