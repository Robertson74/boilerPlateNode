/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */
/* tslint:disable */
console.log("sandbox start");

import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { User } from "./shared/entities/User";
import { Connection } from "typeorm/connection/Connection";
import { createConnection } from "typeorm/index";
import { DevConfig } from "./config/devConfig";
import { EntityManager } from "./domain/entityManager/EntityManager";
import { repoRegistry } from "./domain/entityManager/RepoRegistry";
import { UserBusiness } from "./domain/business/UserBusiness";

const user: User = new User();
user.email = "mrobertson74@hotmail.com";
user.password = "pass123";
user.name = "Michael";

(async () => {
  const conn: Connection =  await (new MysqlConnectionCreator(new DevConfig(), createConnection)).createMysqlConnection();
  const em: EntityManager = new EntityManager(conn, repoRegistry);
  const userRepo: UserBusiness = em.getRepository("User");
  userRepo.save(user);
})();
