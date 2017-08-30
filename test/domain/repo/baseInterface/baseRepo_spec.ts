/**
 * @file baseRepo_spec.ts - test file for baseRepo
 * @author Michael Robertson
 * @version 0.0.1
 */
import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { instance, mock, reset, verify, when } from "ts-mockito/lib/ts-mockito";
import { Repository } from "typeorm/repository/Repository";
import { getStub } from "../../../../src/shared/utilities/GetStub";
import { getStubThatThrows } from "../../../../src/shared/utilities/GetStubThatThrows";
import { ITestType } from "../base/ITestType";
import { TestObj } from "../base/TestObj";
import { TestRepo } from "../base/TestRepo";

before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

/* tslint:disable:no-magic-numbers */
const testObj1: ITestType = { id: 1 };
testObj1.id = 1;
const testObj2: ITestType = { id: 2 };
testObj2.id = 2;
const testObjArr: ITestType[] = [ testObj1, testObj2 ];
/* tslint:enable */

// mock dependancy
const mockRepository: Repository<ITestType> = mock(Repository);

// object to test 
const testBaseRepository: TestRepo = new TestRepo();

// reset mock after each test
afterEach(() => {
  reset(mockRepository);
});

describe("BaseRepository", () => {
  // dependency
  const mockRepo: Repository<ITestType> = mock(Repository);
  // object under test
  const mockBaseRepo: TestRepo = new TestRepo();
  // test initialize()
  describe("initialize", () => {
    // mock setup
    const stubRepo: Repository<ITestType> = instance(mockRepo);
    // object under test

    it("should return nothing", () => {
      const nothingResults: void = mockBaseRepo.initialize(stubRepo);
      expect(nothingResults).to.be.a("undefined");
    });

  });

  // Test getAll()
  describe("getAll()", async () => {
    // setup
    when(mockRepo.find()).thenReturn(Promise.resolve([<ITestType> {id: 1}]));
    const stubRepo: Repository<ITestType> = instance(mockRepo);
    // Object under test
    mockBaseRepo.initialize(stubRepo);

    it("should call find() on it's dependant repo", () => {
      mockBaseRepo.getAll();
      verify(mockRepo.find()).called();
    });

  });

  describe("getById()", () => {
    it("should call it's dependancy's findOneById()", async () => {
      const stubRepo: Repository<ITestType> = getStub(mockRepository, "findOneById", Promise.resolve(testObj1), 1);
      testBaseRepository.initialize(stubRepo);
      const findResults: ITestType = await testBaseRepository.getById(1);
      verify(mockRepository.findOneById(1)).called();
      expect(findResults).to.eql(testObj1);
    });

    it("should throw an error on failed dependency call", async () => {
      const stubRepo: Repository<ITestType> = getStub(mockRepository, "findOneById", Promise.reject("Error"), 1);
      testBaseRepository.initialize(stubRepo);
      await expect(testBaseRepository.getById(1)).to.eventually.be.rejectedWith("Error");
      verify(mockRepository.findOneById(1)).called();
    });
  });

  describe("save() (single entity)", () => {
    it("should call save() on dependant repo when passed a single entities", async () => {
      // user object for test
      // dependency
      when(mockRepo.save(testObj1)).thenReturn(Promise.resolve(testObj1));
      const stubRepo: Repository<ITestType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      expect(await mockBaseRepo.save(testObj1)).to.eql(true);
      verify(mockRepo.save(testObj1)).called();
    });

    it("should reject and error when it's dependency's errors", async () => {
      // user object for test
      // dependency
      when(mockRepo.save(testObj1)).thenThrow(new Error("TEST ERROR"));
      const stubRepo: Repository<ITestType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      await expect(mockBaseRepo.save(testObj1)).to.eventually.be.rejectedWith("ERROR");
    });
  });

  describe("saveAll() (array of entities)", () => {
    it("should call it's dependency's save() and return a boolean", async () => {
      // user object for test
      const testArr: ITestType[] = [ testObj1, testObj2 ];
      // dependency
      when(mockRepo.save(testArr)).thenReturn(Promise.resolve(testArr));
      const stubRepo: Repository<ITestType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      expect(await mockBaseRepo.saveAll(testArr)).to.eql(true);

      verify(mockRepo.save(testArr)).called();
    });

    it("should reject and throw when it's dependancy errors", async () => {
      const testArr: ITestType[] = [ testObj1, testObj2 ];
      // dependency
      when(mockRepo.save(testArr)).thenThrow(new Error("can not save"));
      const stubRepo: Repository<ITestType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      await expect(mockBaseRepo.saveAll(testArr)).to.eventually.be.rejectedWith("ERROR");
    });
  });

  describe("findOneWhere()", () => {
    const testParams: {} = {id: 1};

    it("should call it's dependency's findOne()", async() => {
      const stubRepo: Repository<ITestType> = getStub(mockRepository, "findOne", Promise.resolve(testObj1), testParams);
      testBaseRepository.initialize(stubRepo);
      await testBaseRepository.findOneWhere(testParams);
      verify(mockRepository.findOne(testParams)).called();
    });

    it("should reject and throw when it's dependency throws", async () => {
      const stubRepo: Repository<ITestType> = getStubThatThrows(
        mockRepository,
        "findOne",
        new Error("error"),
        testParams
      );
      testBaseRepository.initialize(stubRepo);
      await expect(testBaseRepository.findOneWhere(testParams)).to.eventually.be.rejectedWith("error");
    });
  });

  describe("findWhere()", () => {
    const testParams: {} = {id: 1};
    const testReturnArry: ITestType[] = [ testObj1, testObj2 ];

    it("should call it's dependency's find()", async () => {
      const stubRepo: Repository<ITestType> = getStub(
        mockRepository,
        "find",
        Promise.resolve(testReturnArry),
        testParams
      );
      testBaseRepository.initialize(stubRepo);
      await testBaseRepository.findWhere(testParams);
      verify(mockRepository.find(testParams)).called();
    });

    it("should reject and throw when it's dependency throws", async () => {
      const badRepo: Repository<ITestType> = getStubThatThrows(
        mockRepository,
        "find",
        new Error("Error"),
        testParams
      );
      testBaseRepository.initialize(badRepo);
      await expect(testBaseRepository.findWhere(testParams)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("deleteOne()", () => {
    it("should call it's dependency's remove()", async () => {
      const stubRepo: Repository<ITestType> = getStub(mockRepository, "remove", Promise.resolve(testObj1), testObj1);
      testBaseRepository.initialize(stubRepo);
      await testBaseRepository.deleteOne(testObj1);
      verify(mockRepository.remove(testObj1)).called();
    });

    it("should return true on successful delete", async () => {
      const stubRepo: Repository<ITestType> = getStub(mockRepository, "remove", Promise.resolve(testObj1), testObj1);
      testBaseRepository.initialize(stubRepo);
      expect(await testBaseRepository.deleteOne(testObj1)).to.be.true;
      verify(mockRepository.remove(testObj1)).called();
    });

    it("should reject when it's dependency rejects", async() => {
      const stubRepo: Repository<ITestType> = getStub(mockRepository, "remove", Promise.reject("Error"), testObj1);
      testBaseRepository.initialize(stubRepo);
      await expect(testBaseRepository.deleteOne(testObj1)).to.eventually.be.rejectedWith("Error");
    });
  });

  describe("delete()", () => {
    it("should call it's dependency's remove()", async() => {
      const stubRepo: Repository<ITestType> = getStub(
        mockRepository,
        "remove",
        Promise.resolve(testObjArr),
        testObjArr
      );
      testBaseRepository.initialize(stubRepo);
      await testBaseRepository.delete(testObjArr);
      verify(mockRepository.remove(testObjArr)).called();
    });

    it("should return true on successful delete", async () => {
      const stubRepo: Repository<ITestType> = getStub(
        mockRepository,
        "remove",
        Promise.resolve(testObjArr),
        testObjArr
      );
      testBaseRepository.initialize(stubRepo);
      expect(await testBaseRepository.delete(testObjArr)).to.be.true;
    });

    it("should reject and throw when dependency rejects", async() => {
      const stubRepo: Repository<ITestType> = getStub(mockRepository, "remove", Promise.reject("Error"), testObjArr);
      testBaseRepository.initialize(stubRepo);
      await expect(testBaseRepository.delete(testObjArr)).to.eventually.be.rejectedWith("Error");
    });
  });
});
