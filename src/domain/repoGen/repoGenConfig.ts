/* tslint:disable */
export let repoGenConfig: {
  modelDir: string;
  entityDir: string;
  repoDir: string;
  busDir: string;
  baseRepoDir: string;
  baseBusDir: string;
  repoReg: string;
} = {
  // these pathes must be absolute pathes from the project root
  modelDir: "./src/shared/models/",
  entityDir: "./src/shared/entities/",
  repoDir: "./src/domain/repo/",
  busDir: "./src/domain/business/",
  baseRepoDir: "./src/domain/repo/baseInterface/",
  baseBusDir: "./src/domain/business/baseInterface/",
  repoReg: "./src/domain/entityManager/RepoRegistry.ts"
};
