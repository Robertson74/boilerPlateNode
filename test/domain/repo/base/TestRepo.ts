/**
 * @file baseRepoMock.ts - mock class to test base repo
 * @author Michael Robertson
 * @version 0.0.1
 */

import { expect } from "chai";
import { BaseRepository } from "../../../../src/domain/repo/baseInterface/baseRepo";
import { ITestType } from "./ITestType";

export class TestRepo extends BaseRepository<ITestType> {

}
