import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity("website_user")
export class User {

  @PrimaryGeneratedColumn({name: "id"})
  private _id: number;

  @Column({name: "password"})
  private _password: string;

  @Column({name: "email", type: "varchar", unique: true})
  private _email: string;

  @Column({name: "name", type: "varchar"})
  private _name: string;

  constructor() {
    // defaults 
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

}
