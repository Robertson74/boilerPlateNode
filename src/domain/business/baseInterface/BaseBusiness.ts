/**
 * @file BaseBusiness.ts - base bussiness
 * @author Michael Robertson
 * @version 0.0.1
 */

import { BaseRepository } from "../../repo/baseInterface/baseRepo";
import { IBusiness } from "./IBusiness";

export class BaseBusiness<T> implements IBusiness<T> {

  private _repo: BaseRepository<T>;

  constructor(repo: BaseRepository<T>) {
    this._repo = repo;
  }

  public async getAll(): Promise<T[]> {
    try {
      return Promise.resolve(this._repo.getAll());
    } catch (e) {
      return Promise.reject("Bussiness Layer: Error getting all entities " + e);
    }
  }

  public async getById(id: number): Promise<T> {
    try {
      return await this._repo.getById(id);
    } catch (e) {
      return Promise.reject("Bussiness Layer: Error getting entity " + id + ": " + e);
    }
  }

  // public async getById(id: number): Promise<T | undefined> {
  // }
  // public async save(entity: T): Promise<boolean> {
  // }
  // public async saveAll(entities: T[]): Promise<boolean> {
  // }

}
