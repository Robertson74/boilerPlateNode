/**
 * @file baseConfig.ts - config shared amongst all config objects
 * @author Michael Robertson
 * @version 0.0.1
 */
import { IConfig } from "./interface/Iconfig";

export class BaseConfig implements IConfig {
  public entitiesDir: string = "./build/src/shared/entities/*.js";
}
