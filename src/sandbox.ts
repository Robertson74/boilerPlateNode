/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */
console.log("sandbox start");

const testing: string = "text";

console.log(testing.match(/e/));

import "reflect-metadata";
import {createConnection} from "typeorm";
import { Transaction } from "./domain/repoGen/testEntity/Transaction";

createConnection({
  type: "mysql",
  driver: {
    host: "localhost",
    port: 3306,
    username: "root",
    password: "devdb",
    database: "repoGen"
  },
  entities: [
    Transaction
  ],
  autoSchemaSync: true,
}).then(connection => {
  // here you can start to work with your entities
}).catch(error => console.log(error));
