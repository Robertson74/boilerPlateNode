/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */

/* tslint:disable */
import * as fs from 'fs';
import { ReadLine } from "readline";
import { createConnection } from "typeorm/index";
import { DevConfig } from "./config/devConfig";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { EntityManager } from "./domain/entityManager/EntityManager";
import { repoRegistry } from "./domain/entityManager/RepoRegistry";
import { Connection } from "typeorm/connection/Connection";
import { User } from "./shared/entities/User";

(async () => {
  const creator: MysqlConnectionCreator = new MysqlConnectionCreator(new DevConfig(), createConnection);
  const conn: Connection = await creator.createMysqlConnection()
  const em: EntityManager = new EntityManager(conn, repoRegistry);

  const userOne: User = new User();
  userOne.name = "Bob";
  await em.getRepository("User").save(userOne);
  console.log(await em.getRepository("User").getAll());
})();

// (async () => {
//   const testVar = 100;
//   const interfaceString: string = `export interface IProduct {
//   id: number;
//   desc: string;
//   price: number;
//   ${testVar}
//   }`;

//   await fs.writeFile("./testFile.ts", interfaceString, (err) => console.log(err));
//   // const rl = ReadLine.createInterface({
//   //   input: process.stdin,
//   //   output: process.stdout
//   // });
// })(); 
console.log("Sandbox: done");
