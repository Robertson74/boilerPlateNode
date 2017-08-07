/**
 * @file IRepository.ts - Base repository interface
 * @author Michael Robertson
 * @version 0.0.1
 */
export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  save(entities: T[] | T ): Promise<boolean>;
}
