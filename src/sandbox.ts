/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */

import { Connection } from "typeorm/connection/Connection";
import { createConnection } from "typeorm/index";
import { DevConfig } from "./config/devConfig";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";

(async () => {
  const connCreator: MysqlConnectionCreator = new MysqlConnectionCreator(new DevConfig(), createConnection);

  const conn: Connection = await connCreator.createMysqlConnection();
})();

/* tslint:disable:no-console */
console.log("done");
