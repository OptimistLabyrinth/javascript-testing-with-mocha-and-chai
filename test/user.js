const User = require("../src/user");
const axios = require("axios");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const expect = chai.expect;
chai.use(sinonChai);

describe("the User class", function () {
  const userName = "OptimistLabyrinth";
  const sandbox = sinon.createSandbox();
  let user;

  beforeEach(() => {
    user = new User(userName);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should get the user id", function (done) {
    const getStub = sandbox.stub(axios, "get").resolves({ data: { id: 1234 } });
    user
      .getUserId()
      .then(function (result) {
        expect(result).to.be.a("number");
        expect(result).to.be.eq(1234);
        expect(getStub).to.have.been.calledOnce;
        expect(getStub).to.have.been.calledWith(
          `https://api.github.com/users/${userName}`
        );
        done();
      })
      .catch(done);
  });

  it("should return a repository if the user can view repos", function (done) {
    sandbox.stub(user, "canViewRepos").value(true);
    const getStub = sandbox
      .stub(axios, "get")
      .resolves({ data: ["repo1", "repo2", "repo3"] });
    user
      .getUserRepo(2)
      .then(function (response) {
        expect(response).to.be.eq("repo3");
        expect(getStub).to.have.been.calledOnceWith(
          `https://api.github.com/users/${userName}/repos`
        );
        done();
      })
      .catch(done);
  });

  it("should return an error if the user cannot view repos", function (done) {
    const getStub = sandbox.stub(axios, "get");
    user.getUserRepo(2).catch(function (error) {
      expect(error).to.be.eq("cannot view repos");
      expect(getStub).to.have.not.been.called;
      done();
    });
  });
});
