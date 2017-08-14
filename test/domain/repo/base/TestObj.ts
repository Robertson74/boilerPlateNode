/**
 * @file TestObj.ts - test object to test base repository
 * @author Michael Robertson
 * @version 0.0.1
 */
import { ITestType } from "./ITestType";
export class TestObj implements ITestType {
  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }
}
