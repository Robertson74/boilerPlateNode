/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */

/* tslint:disable */
import { EntityManager } from "./domain/entityManager/EntityManager";
import { repoRegistry } from "./domain/entityManager/RepoRegistry";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { createConnection } from "typeorm/index";
import { DevConfig } from "./config/devConfig";
import { User } from "./domain/DAL/mysql/entities/User";
import { UserRepo } from "./domain/repo/UserRepo";

(async () => {
  const conn = await new MysqlConnectionCreator(new DevConfig(), createConnection).createMysqlConnection();
  const em: EntityManager = new EntityManager(conn, repoRegistry);
  const userRepo: UserRepo = em.getRepository("User");

  console.log(await userRepo.findOneWhere({name: "Jamie"}));
})();

console.log("Sandbox: done");
