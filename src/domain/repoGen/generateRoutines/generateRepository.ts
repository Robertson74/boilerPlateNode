/* tslint:disable */
import { genEntity, Model, Prop } from "../types";
import { generateEntity } from "./generateEntity";
import * as inquirer from "inquirer";

console.log("REPOGEN");
export const generateRepository: Function = async () => {
  console.log("generate repo");

  let id: Prop = {
    optional: false,
    readOnly: true,
    propertyName: "id",
    propertyType: "number"
  }

  let amount: Prop = {
    optional: false,
    readOnly: false,
    propertyName: "amount",
    propertyType: "number"
  }

  let midId: Prop = {
    optional: false,
    readOnly: false,
    propertyName: "midId",
    propertyType: "string"
  }

  let model: Model = {
    name: "Transaction",
    writeDir: "./src/domain/repoGen/test/",
    props: []
  };
  model.props.push(id);
  model.props.push(amount);
  model.props.push(midId);

  console.log("Generating...");
  let genEntity = await generateEntity(model);
};

// confirm making an entity
let askToContinue: Function = async () => {
  let askToContinueQ: inquirer.Question = {
    message: "Press enter to make a entity...",
    name: "answer"
  }
  await inquirer.prompt(askToContinueQ);

};
(async () => {
  await askToContinue();
  console.log(await generateRepository());
})();
