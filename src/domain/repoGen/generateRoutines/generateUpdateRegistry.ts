/* tslint:disable */
import * as fs from "fs-extra";
import { repoGenConfig } from "../repoGenConfig";
import { genEntity, domainPaths } from "../types";
import { getRelativePath } from "../tools/getRelativePath";

export let generateUpdateRegistry: Function = async (ent: genEntity, paths: domainPaths): Promise<void> => {
  // get the repo registry file
  let repoRegistry = await fs.readFile(repoGenConfig.repoReg, "UTF8");
  if (!repoRegistry) { throw Error("NO REPO REGISTRY FOUND")}

  // prepare import statements
  let repoImport = 
    `import { ${ent.name}Repo } from "${getRelativePath(repoGenConfig.repoReg, paths.repoDir)}${ent.name}Repo";`
  let busImport = 
    `import { ${ent.name}Business } from "${getRelativePath(repoGenConfig.repoReg, paths.busDir)}${ent.name}Business";`
  // bring in imports
  repoRegistry = repoRegistry.replace(/;(\s\/\/\s###endRegistryImports)/, `;\n${repoImport}\n${busImport}$1`);
  // update repo entries
  let repoEntry = `  ${ent.name}: [ ${ent.name}Repo, ${ent.name}Business ]`
  repoRegistry = repoRegistry.replace(/(\s\/\/\s###endRepoRegistry)/, `,\n${repoEntry}$1`);
  // update repo names
  repoRegistry = repoRegistry.replace(/(;\s\/\/\s###endRepoNames)/, ` |\n  "${ent.name}"$1`);
  fs.writeFile(repoGenConfig.repoReg, repoRegistry);
  return Promise.resolve();
};

// backup
// /**
//  * @file RepoRegistry.ts - registry for all repositories
//  * @author Michael Robertson
//  * @version 0.0.1
//  */

// import { BaseBusiness } from "../business/baseInterface/BaseBusiness";
// import { UserBusiness } from "../business/UserBusiness";
// import { BaseRepository } from "../repo/baseInterface/baseRepo";
// import { UserRepo } from "../repo/UserRepo"; // ###endRegistryImports

// // format of registry entries:
// // Model: [ RepoClass, BusinessClass]
// export const repoRegistry: {} = {
//   User: [ UserRepo, UserBusiness ] // ###endRepoRegistry
// };

// export type repoNames =
//   "User" |
//   "Transaction"; // ###endRepoNames
