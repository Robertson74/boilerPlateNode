/**
 * @file Product.ts - test product class
 * @author Michael Robertson
 * @version 0.0.1
 */
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { IProduct } from "../../../../shared/models/IProduct";

@Entity()
export class Product implements IProduct {

  @PrimaryGeneratedColumn({name: "id"})
  private _id: number;

  get id(): number {
    return this._id;
  }

  private _desc: string;

  @Column({name: "description"})
  get desc(): string {
    return this._desc;
  }

  set desc(desc: string) {
    this._desc = desc;
  }

  @Column({name: "price"})
  private _price: number;

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

}
