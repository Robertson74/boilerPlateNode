/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */
import { Connection } from "typeorm/connection/Connection";
import { createConnection } from "typeorm/index";
import { Repository } from "typeorm/repository/Repository";
import { DevConfig } from "./config/devConfig";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { User } from "./domain/DAL/mysql/entities/User";
import { UserRepo } from "./domain/repo/UserRepo";

/* tslint:disable */
(async () => {
  const connCreator: MysqlConnectionCreator = new MysqlConnectionCreator(new DevConfig(), createConnection);

  const conn: Connection = await connCreator.createMysqlConnection();

  const test: string[] = [ "one", "two", "three" ];
  const userRepo: Repository<User> = conn.getRepository(User);
  const users: User[] = await userRepo.find({name: "Wills"});


  console.log(await userRepo.remove(users));
  console.log(users);

  // const userRepository: UserRepo = new UserRepo();
  // userRepository.initialize(userRepo);

  // const user1 = new User();
  // user1.id = 10;
  // user1.name = "Bob";
  // const user2 = new User();
  // user2.id = 11;
  // user2.name = "Jane";

  // const userArray: User[] = [ user1, user2 ];

  // console.log(await userRepository.saveAll(userArray));
})();

console.log("done");
