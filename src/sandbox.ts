/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */
/* tslint:disable */
console.log("sandbox start");

const testing: string = "text";

import "reflect-metadata";
import { Connection } from "typeorm/connection/Connection";
import { DevConfig } from "./config/devConfig";
import { EntityManager } from "./domain/entityManager/EntityManager";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { createConnection } from "typeorm";
import { repoRegistry } from "./domain/entityManager/RepoRegistry";
import { MID } from "./shared/entities/MID";
import { MIDBusiness } from "./domain/business/MIDBusiness";
import { Transaction } from "./shared/entities/Transaction";
import { TransactionBusiness } from "./domain/business/TransactionBusiness";
import { NewObj } from "./shared/entities/NewObj";
import { NewObjBusiness } from "./domain/business/NewObjBusiness";

(async () => {
  const conn: Connection = await (new MysqlConnectionCreator(new DevConfig(), createConnection)).createMysqlConnection();
  let em = new EntityManager(conn, repoRegistry);
  const obj: NewObj = new NewObj();
  obj.id = 10000;
  const objRepo: NewObjBusiness = em.getRepository("NewObj");

})();
