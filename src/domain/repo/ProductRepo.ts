/**
 * @file ProductRepo.ts - repository layer for product model
 * @author Michael Robertson
 * @version 0.0.1
 */
import { IProduct } from "../../shared/models/IProduct";
import { BaseRepository } from "./baseInterface/baseRepo";
export class ProductRepo extends BaseRepository<IProduct> {
}
