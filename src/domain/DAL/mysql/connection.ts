/**
 * @file connection.ts - Creates a mysql connection for typeORM
 * @author Michael Robertson
 * @version 0.0.1
 */
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { DevConfig } from "../../../config/devConfig";
import { IConfigInterface } from "../../../config/interface/IconfigInterface";

export class MysqlConnectionCreator {

  private _config: IConfigInterface;
  private _createConnection: Function;

  constructor(config: DevConfig, createConnection: Function) {
    this._config = config;
    this._createConnection = createConnection;
  }

  public async createMysqlConnection(): Promise<Connection>  {
    const conn = await this._createConnection({
      type: "mysql",
      host: this._config.dbHost,
      port: this._config.dbPort,
      username: this._config.dbUsername,
      password: this._config.dbPass,
      database: this._config.dbName,
      entities: [
        "./entities/*"
      ],
      autoSchemaSync: true,
    });
    return conn;
  }

}
