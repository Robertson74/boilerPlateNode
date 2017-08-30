/**
 * @file BaseBusiness.ts - base bussiness
 * @author Michael Robertson
 * @version 0.0.1
 */

import { BaseRepository } from "../../repo/baseInterface/baseRepo";
import { IBusiness } from "./IBusiness";

export class BaseBusiness<T> implements IBusiness<T> {

  protected _repo: BaseRepository<T>;

  constructor(repo: BaseRepository<T>) {
    this._repo = repo;
  }

  /**
   * get all entities
   *
   * @name getAll
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @returns {entity[]} Array of entities
   */
  public async getAll(): Promise<T[]> {
    return Promise.resolve(this._repo.getAll());
  }

  /**
   * Get an entity by it's ID
   *
   * @name getById
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {number} id id of entity
   * @returns {entity}
   */
  public async getById(id: number): Promise<T> {
    return await this._repo.getById(id);
  }

  /**
   * Save an entity to the database
   *
   * @name save
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {entity} entity entity to save
   * @returns {boolean} Boolean result of the save operation
   */
  public async save(entity: T): Promise<boolean> {
    return await this._repo.save(entity);
  }

  /**
   * Save an array of entities
   *
   * @name saveAll
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {entity[]} entities Array of entities to save
   * @returns {boolean} Boolean result of the save
   */
  public async saveAll(entities: T[]): Promise<boolean> {
    return await this._repo.saveAll(entities);
  }

  /**
   * Find one entity base on parameters
   *
   * @name findOneWhere
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {Object} params Object defining the search parameters
   * @returns {entity} Entity matching the parameters
   */
  public async findOneWhere(params: {}): Promise<T> {
    return await this._repo.findOneWhere(params);
  }

  /**
   * Find many entities matching supplied parameters
   *
   * @name findWhere
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {Object} params Object defining the search parameters
   * @returns {entity[]} Array of entities matching supplied parameters
   */
  public async findWhere(params: {}): Promise<T[]> {
    return await this._repo.findWhere(params);
  }

  /**
   * Delete an entity
   *
   * @name deleteOne
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {entity} entity Entity to delete
   * @returns {boolean} Boolean result of the delete operation
   */
  public async deleteOne(entity: T): Promise<boolean> {
    return await this._repo.deleteOne(entity);
  }

  /**
   * Delete many entities
   *
   * @name delete
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {entity[]} entities Array of entites to delete
   * @returns {boolean} Boolean result of the delete operation
   */
  public async delete(entities: T[]): Promise<boolean> {
    return await this._repo.delete(entities);
  }
}
