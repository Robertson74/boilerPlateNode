/**
 * @file configManager.ts - Manages which config to use based on enviroment
 * @author Michael Robertson
 * @version 0.0.1
 */
import { BaseConfig } from "./baseConfig";
import { DevConfig } from "./devConfig";
import { IConfig } from "./interface/Iconfig";

export class ConfigManager {
  private _env: string;
   constructor(env: string) {
     this._env = env;
  }

  public getConfig (): DevConfig {
    switch (this._env) {
      case "dev":
        const config: DevConfig = new DevConfig();
        return config;
      default:
        throw Error("'env' not recognized");
    }
  }
}
