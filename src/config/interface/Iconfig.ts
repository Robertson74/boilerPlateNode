/**
 * @file configInterface.ts - Config Interface
 * @author Michael Robertson
 * @version 0.0.1
 */
export interface IConfig {
  entitiesDir: string; // directory the projects entities live in
  dbHost?: string;
  dbPort?: number;
  dbUsername?: string;
  dbPass?: string;
  dbName?: string;
}
