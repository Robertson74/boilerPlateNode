/**
 * @file connection_spec.ts - test for MysqlConnectionCreator
 * @author Michael Robertson
 * @version 0.0.1
 */
import { expect } from "chai";
import { instance, mock, when } from "ts-mockito";
import { Connection, createConnection } from "typeorm";
import { DevConfig } from "../../../../src/config/devConfig";
import { IConfig } from "../../../../src/config/interface/Iconfig";
import { MysqlConnectionCreator } from "../../../../src/domain/DAL/mysql/connection";

/* tslint:disable:no-magic-numbers */
describe("MysqlConnectionCreator", () => {

  describe("createMysqlConnection", () => {
    it("should return a connection object", async () => {
      // // mock Config
      const mockConfig: DevConfig = mock(DevConfig);
      const stubConfig: DevConfig = instance(mockConfig);
      // mock Connection
      const mockConnection: Connection = mock(Connection);
      const stubConnection: Connection = instance(mockConnection);
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
