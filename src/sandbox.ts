/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */
/* tslint:disable */
console.log("sandbox start");

const testing: string = "text";

console.log(testing.match(/e/));

import "reflect-metadata";
import { Connection } from "typeorm/connection/Connection";
import { DevConfig } from "./config/devConfig";
import { EntityManager } from "./domain/entityManager/EntityManager";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { createConnection } from "typeorm";
import { repoRegistry } from "./domain/entityManager/RepoRegistry";

(async () => {
  const conn: Connection = await (new MysqlConnectionCreator(new DevConfig(), createConnection)).createMysqlConnection();
  let em = new EntityManager(conn, repoRegistry);
  em.getRepository("User");
})();
