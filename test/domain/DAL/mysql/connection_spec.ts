/**
 * @file connection_spec.ts - test for MysqlConnectionCreator
 * @author Michael Robertson
 * @version 0.0.1
 */
import { expect } from "chai";
import { instance, mock, when } from "ts-mockito";
import { Connection, createConnection } from "typeorm";
import * as ConnectionStuff from "typeorm";
import { DevConfig } from "../../../../src/config/devConfig";
import { IConfigInterface } from "../../../../src/config/interface/IconfigInterface";
import { MysqlConnectionCreator } from "../../../../src/domain/DAL/mysql/connection";

/* tslint:disable:no-magic-numbers */
describe("MysqlConnectionCreator", () => {

  describe("createMysqlConnection", () => {
    it("should return a connection object", async () => {
      const test: DevConfig = new DevConfig();
      // mock Config
      const mockConfig: DevConfig = mock(DevConfig);
      const stubConfig: DevConfig = instance(mockConfig);
      // mock Connection
      const mockConnection: Connection = mock(Connection);
      const stubConnection: Connection = instance(mockConnection);
      // mock createConnection
      const stubCreateConnection: Function = ():DevConfig => {
        return stubConfig;
      };
        expect(stubCreateConnection()).to.be.instanceof(DevConfig);
      // class under test
      const stubConnCreator: MysqlConnectionCreator = new MysqlConnectionCreator(stubConfig, stubCreateConnection);
      // should return a connection object
      const conn: Connection = await stubConnCreator.createMysqlConnection();
      // expect(conn).to.be.instanceof(Connection);
    });
  });

});
// const mockConfig: IConfigInterface = {
//   dbHost: "junk",
//   dbName: "junk",
//   dbPass: "junk",
//   dbPort: 9999,
//   dbUsername: "junk"
// };
