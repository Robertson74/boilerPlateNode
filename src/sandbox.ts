/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */
/* tslint:disable */
import { Connection } from "typeorm/connection/Connection";
import { createConnection } from "typeorm/index";
import { Repository } from "typeorm/repository/Repository";
import { DevConfig } from "./config/devConfig";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { User } from "./domain/DAL/mysql/entities/User";
import { UserRepo } from "./domain/repo/repositories/UserRepo";

console.log(typeof [1, 2, 3]);
// (async () => {
//   const connCreator: MysqlConnectionCreator = new MysqlConnectionCreator(new DevConfig(), createConnection);

//   const conn: Connection = await connCreator.createMysqlConnection();

//   const userRepo: Repository<User> = conn.getRepository(User);
//   userRepo.save();
//   const userRepository: UserRepo = new UserRepo();
//   userRepository.initialize(userRepo);

//   const users: User[] = await userRepository.getAll();

//   users.forEach((user) => { console.log(user.name); });

// })();

console.log("done");
