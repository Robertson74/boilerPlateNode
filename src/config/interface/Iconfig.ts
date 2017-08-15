/**
 * @file configInterface.ts - Config Interface
 * @author Michael Robertson
 * @version 0.0.1
 */
export interface IConfig {
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPass: string;
  dbName: string;
}
