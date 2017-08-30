/**
 * @file IBussiness.ts - bussiness layer interface
 * @author Michael Robertson
 * @version 0.0.1
 */
export interface IBusiness<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
}
