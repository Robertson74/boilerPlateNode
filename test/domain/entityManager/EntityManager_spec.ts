/**
 * @file EntityManager_spec.ts - manages, initializes, and returns repositories
 * pairing up the connection, repo layer and business layer
 * @author Michael Robertson
 * @version 0.0.1
 */
import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { instance, mock, reset, verify, when } from "ts-mockito/lib/ts-mockito";
import { Connection } from "typeorm/connection/Connection";
import { Repository } from "typeorm/repository/Repository";
import { BaseConfig } from "../../../src/config/baseConfig";
import { MysqlConnectionCreator } from "../../../src/domain/DAL/mysql/connection";
import { EntityManager } from "../../../src/domain/entityManager/EntityManager";
import { BaseRepository } from "../../../src/domain/repo/baseInterface/baseRepo";
import { IRepository } from "../../../src/domain/repo/baseInterface/IRepository";
import { getStub } from "../../../src/shared/utilities/GetStub";
import { getStubThatThrows } from "../../../src/shared/utilities/GetStubThatThrows";
import { TestBusiness } from "../business/TestBusiness";
import { ITestType } from "../repo/base/ITestType";
import { TestRepo } from "../repo/base/TestRepo";

describe("EntityManager", () => {

  before(() => {
    chai.should();
    chai.use(chaiAsPromised);
  });

  // fake repo registry
  const fakeRepoRegistry: {} = { testRepo: [TestRepo, TestBusiness ] };
  // dependency mocks
  const mockConfig: BaseConfig = mock(BaseConfig);
  const mockRepoRegistry: BaseConfig = mock(BaseConfig);
  const mockTypescriptRepository: Repository<ITestType> = mock(Repository);
  const mockRepository: TestRepo = mock(TestRepo);
  const mockBusiness: TestBusiness = mock(TestBusiness);
  const mockConnection: Connection = mock(Connection);
  const mockConnectionCreator: MysqlConnectionCreator = mock(MysqlConnectionCreator);

  // common stubs
  const stubTypescriptRepository: Repository<ITestType> = instance(mockTypescriptRepository);
  const stubConfig: BaseConfig = instance(mockConfig);

  afterEach(() => {
    reset(mockConfig);
    reset(mockRepoRegistry);
    reset(mockTypescriptRepository);
    reset(mockRepository);
    reset(mockBusiness);
  });

  describe("initializeRepo()", () => {
    it("should return an initialized repository", () => {
      const repoName: string = "testRepo";
      const stubConnection: Connection = getStub(mockConnection, "getRepository", repoName, stubTypescriptRepository);
      const testEntityManager: EntityManager = new EntityManager(stubConnection, fakeRepoRegistry);
      const repo: BaseRepository<ITestType> = testEntityManager.initializeRepo(repoName);
      // check that it's an object and has some repository function
      expect(repo).to.be.instanceOf(Object);
      expect(repo.getById).to.be.instanceOf(Function);
      expect(repo.getAll).to.be.instanceOf(Function);
    });
  });

  describe("initializeBusiness()", () => {
    it("should return an initialized business service", () => {
      const testEntityManager: EntityManager = new EntityManager(instance(mockConnection), fakeRepoRegistry);
      const repoName: string = "testRepo";
      const stubRepository: BaseRepository<ITestType> = instance(mockRepository);
      const business: TestBusiness = testEntityManager.initializeBusiness(repoName, stubRepository);
      expect(business).to.be.instanceOf(Object);
      expect(business.getById).to.be.instanceOf(Function);
      expect(business.getAll).to.be.instanceOf(Function);
    });
  });

  describe("composeDomain()", () => {
    it("should return an initialized business layer service", () => {
      const testEntityManager: EntityManager = new EntityManager(instance(mockConnection), fakeRepoRegistry);
      // testEntityManager.initializeRepo = (repoName: string) => { return instance(mockRepository); };
      // testEntityManager.initializeRepo = <T>(repoName: string): BaseRepository<T> => {
      //   const stubRepository: BaseRepository<T> = instance(mockRepository);
      //   return stubRepository;
      // };

      // testEntityManager.initializeBusiness = () => { return instance(mockBusiness); };
      const repoName: string = "testRepo";
      const business: TestBusiness = testEntityManager.composeDomain(repoName);
      expect(business).to.be.instanceOf(Object);
      expect(business.getById).to.be.instanceOf(Function);
      expect(business.getAll).to.be.instanceOf(Function);
    });
  });

  describe("getRepository()", () => {
    it("should return a valid business layer", () => {
      const repoName: string = "testRepo";
      const testEntityManager: EntityManager = new EntityManager(instance(mockConnection), fakeRepoRegistry);
      const business: TestBusiness = testEntityManager.getRepository(repoName);
      expect(business).to.be.instanceOf(Object);
      expect(business.getById).to.be.instanceOf(Function);
      expect(business.getAll).to.be.instanceOf(Function);
    });

    it("should throw an error if the repository does not exist in the repo registry", () => {
      const badRepoName: string = "non-existant-repo-name";
      const testEntityManager: EntityManager = new EntityManager(instance(mockConnection), fakeRepoRegistry);
      expect(() => testEntityManager.getRepository(badRepoName)).to.throw(RangeError);
    });

    it("should not not compose a new repository if the repo exists in the repo pool", () => {
      const repoName: string = "testRepo";
      const testEntityManager: EntityManager = new EntityManager(instance(mockConnection), fakeRepoRegistry);
      // call getRepository() once so that there is an an entry for "testRepo" in the repo pool
      testEntityManager.getRepository(repoName);
      testEntityManager.composeDomain = () => { throw "THIS SHOULD NOT BE CALLED"; };
      // second call to getRepository() should get the repo from the pool, and not throw
      expect(() => testEntityManager.getRepository(repoName)).to.not.throw();
    });
  });

});
