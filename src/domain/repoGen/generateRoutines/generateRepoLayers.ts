/* tslint:disable */

import { genEntity } from "../types";
import { getRelativePath } from "../tools/getRelativePath";
import { repoGenConfig } from "../repoGenConfig";
import * as fs from "fs-extra";
import { confirmDir } from "../tools/confirmDir";

export let generateRepoLayers: Function = async (ent: genEntity) => {

  // build repo file
  let buildRepo: Function = (ent: genEntity, repoDir: string) => {
    let baseRepoPath = getRelativePath(repoDir, repoGenConfig.baseRepoDir);
    let entPath = getRelativePath(repoDir, ent.writeDir);
    let writeRepo: string = ``;
    writeRepo+= `import { BaseRepository } from "${baseRepoPath}baseRepo";\n`;
    writeRepo+= `import { ${ent.name} } from "${entPath}${ent.name}";\n`;
    writeRepo+= `\n`;
    writeRepo+= `export class ${ent.name}Repo extends BaseRepository<${ent.name}> {\n`;
    writeRepo+= `}\n`;
    return writeRepo;
  };

  // build  bus file
  let buildBus: Function = (ent: genEntity, repoDir: string, busDir: string) => {
    let writeBus: string = ``;
    let entPath = getRelativePath(busDir, ent.writeDir);
    let baseBusPath = getRelativePath(busDir, repoGenConfig.baseBusDir);
    writeBus+= `import { ${ent.name} } from "${entPath}${ent.name}";\n`;
    writeBus+= `import { BaseBusiness } from "${baseBusPath}BaseBusiness";\n`;
    writeBus+= `\n`;
    writeBus+= `export class ${ent.name}Business extends BaseBusiness<${ent.name}> {\n`;
    writeBus+= `}\n`;
    return writeBus;
  };

  let writeRepoDir: string|boolean = "";
  let writeBusDir: string|boolean = "";

  // write dir
  writeRepoDir = await confirmDir(repoGenConfig.repoDir, "Repo Layer");
  if (writeRepoDir) {
    await fs.ensureDir(repoGenConfig.repoDir);
    await fs.writeFile(repoGenConfig.repoDir + ent.name + "Repo.ts", buildRepo(ent, writeRepoDir));

    writeBusDir = await confirmDir(repoGenConfig.busDir, "Business Layer");
    if (writeBusDir) {
      await fs.ensureDir(repoGenConfig.busDir);
      await fs.writeFile(repoGenConfig.busDir + ent.name + "Business.ts", buildBus(ent, writeBusDir, writeRepoDir));
    }
  }

  return {repoDir: writeRepoDir, busDir: writeBusDir};
};
