/**
 * @file EntityManager.ts - Manages all domain services and ensures they share the same connection
 * @author Michael Robertson
 * @version 0.0.1
 */
import { Connection } from "typeorm/connection/Connection";
import { Repository } from "typeorm/repository/Repository";
import { BaseBusiness } from "../business/baseInterface/BaseBusiness";
import { BaseRepository } from "../repo/baseInterface/baseRepo";
import { repoNames, repoRegistry } from "./RepoRegistry";

export class EntityManager {

  private _repoRegistry: {}; // registry to track available repos that can be created
  private _repoPool: {}; // registry to track repos that have been created
  private _connection: Connection;
  private _repositorySlotId: number = 0;
  private _businesssSlotId: number = 1;

  constructor(connection: Connection, repoRegistry: {}) {
    this._connection = connection;
    this._repoRegistry = repoRegistry;
    this._repoPool = {};
  }

  /* tslint:disable:no-any */
  /**
   * Get a repository, either (if it exists) from the repoPool, 
   * or creating a new full domain service and updating the repoPool
   * will throw a range error if requested repo does not exist in the registry
   *
   * @name getRepository
   * @function
   * @author Michael Robertson
   * @date 2017-08-15
   * @param {string} repoName Name of the repo to retreive
   * @returns {BusinessService}
   */
  public getRepository<T>(repoName: repoNames): any {
    // check that the requested repository exists in the registry
    if (!this._repoRegistry[repoName]) {
      throw new RangeError("Requested repository does not exists");
    }
    // if the repo already exists in the pool, return it other wise create a new one
    if (this._repoPool[repoName]) {
      return this._repoPool[repoName];
    } else {
    // compose the repository
      const domain: any = this.composeDomain(repoName);
    // add to repo pool
      this._repoPool[repoName] = domain;
    // return the repo
      return domain;
    }
  }

  /**
   * Creates a full domain service
   *
   * @name composeDomain
   * @function
   * @author Michael Robertson
   * @date 2017-08-15
   * @param {string} repoName Name of the repository to create
   * @returns {BusinessService}
   */
  public composeDomain<T>(repoName: string): any {
    const repo: any = this.initializeRepo(repoName);
    const business: any = this.initializeBusiness(repoName, repo);
    return business;
  }

  /**
   * Creates the bussiness layer by combining the repo layer with a new business layer
   *
   * @name initializeBusiness
   * @function
   * @author Michael Robertson
   * @date 2017-08-15
   * @param {repoName} Name of the requested repo from the repoRegistry
   * @param {BaseRepository} repo Valid repository with a connection
   * @returns {BaseBusiness} Business service ready for use
   */
  public initializeBusiness<T>(repoName: string, repo: any): any {
    const businessType: any = this._repoRegistry[repoName][this._businesssSlotId];
    const business: BaseBusiness<T> = new businessType(repo);
    return business;
  }

  /**
   * Creates a repository with a connection
   *
   * @name initializeRepo
   * @function
   * @author Michael Robertson
   * @date 2017-08-15
   * @param {string} repoName Name of the repository to create from the repoRegistry
   * @returns {Repository} Repository of type BaseRepository
   */
  public initializeRepo<T>(repoName: string): BaseRepository<T> {
    // look up repo type from registry
    const repoType: any = <BaseRepository<T>> this._repoRegistry[repoName][this._repositorySlotId];
    const repo: BaseRepository<T> = new repoType();
    // get typescript repo from connection
    const typescriptRepository: any = this._connection.getRepository(repoName);
    // initialize the repo
    repo.initialize(typescriptRepository);
    return repo;
  }

  /* tslint:enable */

}
