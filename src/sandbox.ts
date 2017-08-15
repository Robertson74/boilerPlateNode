/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */

/* tslint:disable */
import { createConnection } from "typeorm/index";
import { DevConfig } from "./config/devConfig";
import { ProductBusiness } from "./domain/business/ProductBusiness";
import { MysqlConnectionCreator } from "./domain/DAL/mysql/connection";
import { Product } from "./domain/DAL/mysql/entities/Product";
import { User } from "./domain/DAL/mysql/entities/User";
import { EntityManager } from "./domain/entityManager/EntityManager";
import { repoRegistry } from "./domain/entityManager/RepoRegistry";
import { UserRepo } from "./domain/repo/UserRepo";
import { UserBusiness } from "./domain/business/UserBusiness";

(async () => {

  // DO THIS IN MAIN ROUTING CONTROLLER
  // create a connection
  const conn = await new MysqlConnectionCreator(new DevConfig(), createConnection).createMysqlConnection();
  // create the EM
  const em: EntityManager = new EntityManager(conn, repoRegistry);


  // console.log(em);

  // const userRepo: UserBusiness = em.getRepository("User");
  // const productRepo: ProductBusiness = em.getRepository("Product");
  // console.log(em);

  const prodRepo: ProductBusiness = em.getRepository("Product");
  const testProduct: Product = new Product();
  testProduct.desc = "new prod";
  testProduct.price = 10;
  await prodRepo.save(testProduct);

  console.log(await em.getRepository("Product").getAll());

  // try {
  //   console.log("SAVED!");
  // } catch (e) {
  //   throw "OH NO DIDN'T SAVE!!!";
  // }

  // console.log(await em.getRepository("Product").getAll());

  // const userRepo: UserBusiness = em.getRepository("User");
  // const userOne: User = new User();
  // userOne.name = "Bob";
  // const userTwo: User = new User();
  // userTwo.name = "Susan";
  // await userRepo.saveAll([userOne, userTwo]);

  // const userRepo: UserBusiness = em.getRepository("User");
  // console.log(await userRepo.getAll());

})();

console.log("Sandbox: done");
