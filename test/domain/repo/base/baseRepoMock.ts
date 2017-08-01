/**
 * @file baseRepoMock.ts - mock class to test base repo
 * @author Michael Robertson
 * @version 0.0.1
 */

import { expect } from "chai";
import { BaseRepository } from "../../../../src/domain/repo/base/baseRepo";
import { IMockType } from "./mockType";

export class MockBaseRepo extends BaseRepository<IMockType> {

}
