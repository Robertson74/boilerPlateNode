/**
 * @file BaseBusiness_spec.ts - spec for base business
 * @author Michael Robertson
 * @version 0.0.1
 */

import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { instance, mock, reset, verify, when } from "ts-mockito/lib/ts-mockito";
import { BaseBusiness } from "../../../../src/domain/business/baseInterface/BaseBusiness";
import { getStub } from "../../../../src/shared/utilities/GetStub";
import { getStubThatThrows } from "../../../../src/shared/utilities/GetStubThatThrows";
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
  const testObjArry: ITestType[] = [ testObj1, testObj2 ];

  // dependency mock
  const mockRepo: TestRepo = mock(TestRepo);

  afterEach(() => {
    reset(mockRepo);
  });

  describe("getAll()", () => {
    it("should call and return it's repositories getAll()", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "getAll", Promise.resolve(testObjArry));
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await testBaseBusiness.getAll();
      verify(mockRepo.getAll()).called();
    });

    it("should reject if the dependency errors", async() => {
      const stubRepo: TestRepo = getStub(mockRepo, "getAll", Promise.reject("Error"));
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.getAll()).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("getById()", () => {
    it("should call it's depedencies getById()", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "getById", Promise.resolve(testObj1), 1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      const testEntity: ITestType = await testBaseBusiness.getById(1);
      verify(mockRepo.getById(1)).called();
    });

    it("should reject and throw if the dependency getById() errors", async() => {
      const stubRepo: TestRepo = getStub(mockRepo, "getById", Promise.reject("Error"), 1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.getById(1)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("save()", () => {
    it("should call it's repository's getById()", async() => {
      const stubRepo: TestRepo = getStub(mockRepo, "save", Promise.resolve(true), testObj1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      expect (await testBaseBusiness.save(testObj1)).to.be.true;
      verify(mockRepo.save(testObj1)).called();
    });
    it("should reject when it's repository rejects", async() => {
      const stubRepo: TestRepo = getStub(mockRepo, "save", Promise.reject("Error"), testObj1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.save(testObj1)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("saveAll()", () => {
    it("should call it's repo's saveAll()", async() => {
      const stubRepo: TestRepo = getStub(mockRepo, "saveAll", Promise.resolve(true), testObjArry);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      expect(await testBaseBusiness.saveAll(testObjArry)).to.be.true;
      verify(mockRepo.saveAll(testObjArry)).called();
    });

    it("should reject when it's dependency rejects", async() => {
      const stubRepo: TestRepo = getStub(mockRepo, "saveAll", Promise.reject("Error"), testObjArry);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.saveAll(testObjArry)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("findOneWhere", () => {
    const testParams: {} = {id: 1};
    it("should call it's repo's findOneWhere()", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "saveAll", Promise.resolve(testObj1), testParams);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await testBaseBusiness.findOneWhere(testParams);
      verify(mockRepo.findOneWhere(testParams)).called();
    });

    it("should reject when it's repo's rejects", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "findOneWhere", Promise.reject("Error"), testParams);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.findOneWhere(testParams)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("findWhere", () => {
    const testParams: {} = {id: 1};
    it("should call it's repos's findWhere()", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "findWhere", Promise.resolve(testObjArry), testParams);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      expect(await testBaseBusiness.findWhere(testParams)).to.be.instanceOf(Array);
      verify(mockRepo.findWhere(testParams)).called();
    });

    it("should reject when it's repo rejects", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "findWhere", Promise.reject("Error"), testParams);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.findWhere(testParams)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("deleteOne", () => {
    it("should call it's repo's deleteOne", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "deleteOne", Promise.resolve(true), testObj1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await testBaseBusiness.deleteOne(testObj1);
      verify(mockRepo.deleteOne(testObj1)).called();
    });

    it("should return true on successful delete", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "deleteOne", Promise.resolve(true), testObj1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      expect(await testBaseBusiness.deleteOne(testObj1)).to.be.true;
    });

    it("should reject when it's repo rejects", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "deleteOne", Promise.reject("Error"), testObj1);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await expect(testBaseBusiness.deleteOne(testObj1)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("delete()", () => {
    it("should call it's repo's delete()", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "delete", Promise.resolve(true), testObjArry);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await testBaseBusiness.delete(testObjArry);
      verify(mockRepo.delete(testObjArry)).called();
    });

    it("should return true on a successful delete", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "delete", Promise.resolve(true), testObjArry);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      expect(await testBaseBusiness.delete(testObjArry)).to.be.true;
    });

    it("should reject when it's repo rejects", async () => {
      const stubRepo: TestRepo = getStub(mockRepo, "delete", Promise.reject("Error"), testObjArry);
      const testBaseBusiness: BaseBusiness<ITestType> = new BaseBusiness(stubRepo);
      await  expect(testBaseBusiness.delete(testObjArry)).to.eventually.be.rejectedWith("Error");
    });
  });
});
