/**
 * @file connection.ts - Creates a mysql connection for typeORM
 * @author Michael Robertson
 * @version 0.0.1
 */
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { IConfig } from "../../../config/interface/Iconfig";

/**
 * Creates a TypeORM Mysql connection
 * @name MysqlConnectionCreator
 * @function
 * @author Michael Robertson
 * @date 2017-07-21
 */
export class MysqlConnectionCreator {

  private _config: IConfig;
  private _createConnection: Function;

  constructor(config: IConfig, createConnection: Function) {
    this._config = config;
    this._createConnection = createConnection;
  }

  public async createMysqlConnection(): Promise<Connection>  {
    const conn: Connection = await this._createConnection({
      type: "mysql",
      host: this._config.dbHost,
      port: this._config.dbPort,
      username: this._config.dbUsername,
      password: this._config.dbPass,
      database: this._config.dbName,
      entities: [
        this._config.entitiesDir
      ],
      autoSchemaSync: true,
    });
    return conn;
  }
}
