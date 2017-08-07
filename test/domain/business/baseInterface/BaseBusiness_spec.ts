/**
 * @file BaseBusiness_spec.ts - spec for base business
 * @author Michael Robertson
 * @version 0.0.1
 */

import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { instance, mock, verify, when } from "ts-mockito/lib/ts-mockito";
import { BaseBusiness } from "../../../../src/domain/business/baseInterface/BaseBusiness";
import { getStub } from "../../../../src/shared/models/utilities/GetStub";
import { getStubThatThrows } from "../../../../src/shared/models/utilities/GetStubThatThrows";
import { ITestType } from "../../repo/base/ITestType";
import { TestRepo } from "../../repo/base/TestRepo";

describe("BaseBusiness", () => {

  before(() => {
    chai.should();
    chai.use(chaiAsPromised);
  });

  // test return objects
  const testObj1: ITestType = {id: 1};
  const testObj2: ITestType = {id: 2};

  // dependency mock
  const mockRepo: TestRepo = mock(TestRepo);

  describe("getAll()", () => {
    it("should call and return it's repositories getAll()", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "getAll", [ testObj1, testObj2 ]);
      // object to test
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      // test
      await testBaseBusiness.getAll();
      verify(mockRepo.getAll()).called();
    });

    it("should reject if the dependency errors", async() => {
      // stub 
      const stubRepo: TestRepo = getStubThatThrows(mockRepo, "getAll", new Error("Can't get entities"));
      // object to test
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      // test
      await expect(testBaseBusiness.getAll()).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("getById", () => {
    it("should call it's depedencies getById()", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "getById", testObj1, 1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      const testEntity: ITestType = await testBaseBusiness.getById(1);
      verify(mockRepo.getById(1)).called();
    });

    it("should reject and throw if the dependency getById() errors", async() => {
      const stubRepo: TestRepo = getStubThatThrows(mockRepo, "getById", new Error("Can't get entity"), 1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.getById(1)).to.eventually.be.rejectedWith("Error");
    });
  });

});
