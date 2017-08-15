/**
 * @file TestBusiness.ts - Fake business class for testing
 * @author Michael Robertson
 * @version 0.0.1
 */

import { BaseBusiness } from "../../../src/domain/business/baseInterface/BaseBusiness";
import { ITestType } from "../repo/base/ITestType";

export class TestBusiness extends BaseBusiness<ITestType> {
}
