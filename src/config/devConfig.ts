/**
 * @file devConfig.ts - development config
 * @author Michael Robertson
 * @version 0.0.1
 */
import { BaseConfig } from "./baseConfig";
import { IConfig } from "./interface/Iconfig";

export class DevConfig extends BaseConfig {

  public dbHost: string = "localhost";
  public dbPort: number = 3306;
  public dbUsername: string = "root";
  public dbPass: string = "devdb";
  public dbName: string = "templateDB";

}
