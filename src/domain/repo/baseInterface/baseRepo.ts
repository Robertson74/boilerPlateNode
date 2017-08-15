/**
 * @file baseRepo.ts - Base repository
 * @author Michael Robertson
 * @version 0.0.1
 */
import { Repository as TypeScriptRepository } from "typeorm";
import { IRepository } from "./IRepository";

export abstract class BaseRepository<T> implements IRepository<T> {

  private _repository: TypeScriptRepository<T>;

  /**
   * Initialize the repository with a mysql connection
   *
   * @name initialize
   * @function
   * @author Michael Robertson
   * @date 2017-08-03
   * @param {mysql repository} repository a repository of type T
   * @returns {void}
   */
  public initialize(repository: TypeScriptRepository<T>): void {
    this._repository = repository;
  }

  /**
   * get all entities
   *
   * @name getAll
   * @function
   * @author Michael Robertson
   * @date 2017-08-03
   * @returns {entity[]} array of entities
   */
  public async getAll(): Promise<T[]> {
    return await this._repository.find();
  }

  /**
   * get an entity by it's id
   *
   * @name getById
   * @function
   * @author Michael Robertson
   * @date 2017-08-03
   * @param {number} id id number
   * @returns {entity} the entity
   */
  public async getById(id: number): Promise<T | undefined> {
    return await this._repository.findOneById(id);
  }

  /**
   * Save an entity
   *
   * @name save
   * @function
   * @author Michael Robertson
   * @date 2017-08-03
   * @param {entity} entity a data entity
   * @returns {boolean} success/fail status of the save
   */
  public async save(entity: T): Promise<boolean> {
    try {
      const saveResult: T|T[] = await this._repository.save(entity);
      if (saveResult) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (e) {
      return Promise.reject("ERROR SAVING ENTITY: " + e);
    }
  }

  /**
   * Saves an array of entities
   *
   * @name saveAll
   * @function
   * @author Michael Robertson
   * @date 2017-08-03
   * @param {entity[]} entities array of entities
   * @returns {boolean} success/fail status of save
   */
  public async saveAll(entities: T[]): Promise<boolean> {
    try {
      const saveResult: T[] = await this._repository.save(entities);
      if (saveResult) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (e) {
      return Promise.reject("ERROR SAVING ENTITIES: " + e);
    }
  }

  /**
   * Find a entity based on it's params (e.g. {name: "John"})
   *
   * @name findOneWhere
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {{}} params object that has {key: "value"}
   * @returns {Entity} Entity matching find parameters
   */
  public async findOneWhere(params: {}): Promise<T> {
    return await this._repository.findOne(params);
  }

  /**
   * Find many entities based on parameters
   *
   * @name findWhere
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {Object} params Object defining search parameters (e.g. {name: "john"})
   * @returns {Entity[]} Array of entities matching find parameters
   */
  public async findWhere(params: {}): Promise<T[]> {
    return await this._repository.find(params);
  }

  /**
   * Delete an entity from the database
   *
   * @name deleteOne
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {} entity Entity to delete
   * @returns {boolean} Boolean result of the delete operation
   */
  public async deleteOne(entity: T): Promise<boolean> {
    try {
      const deleteResults: T = await this._repository.remove(entity);
      if(deleteResults) {
        return Promise.resolve(true);
      } else {
        return Promise.reject(false);
      }
    } catch (e) {
      return Promise.reject("Error deleting entity: " + e);
    }
  }

  /**
   * Delete many entities
   *
   * @name delete
   * @function
   * @author Michael Robertson
   * @date 2017-08-14
   * @param {entity[]} entities Array of entities to delete
   * @returns {boolean} Boolean result of the delete operation
   */
  public async delete(entities: T[]): Promise<boolean> {
    try {
      const deleteResults: T[] = await this._repository.remove(entities);
      if (deleteResults) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (e) {
      return Promise.reject("Error deleting entities: " + e);
    }
  }

}
