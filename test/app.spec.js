const assert = require("chai").assert;
const app = require("../src/app");

describe("functions 'add' in App", function () {
  it("should add 2 numbers together", function () {
    const result = app.add(2, 3);
    assert.equal(result, 5);
  });

  it("should be able to hanlde 1 number", function () {
    const result = app.add(2);
    assert.equal(result, 2);
  });

  it("should be able to handle 0 number", function () {
    const result = app.add();
    assert.equal(result, 0);
  });

  it("should return 0 if either argument is not a number", function () {
    const result = app.add(2, "test");
    assert.equal(result, 0);
  });
});

describe("function 'sub' in App", function () {
  it("should sub 2nd number from 1st nubmer", function () {
    const result = app.sub(1, 4);
    assert.equal(result, -3);
  });

  it("should be able to handle 1 number", function () {
    const result = app.sub(5);
    assert.equal(result, 5);
  });

  it("should be able to handle 0 number", function () {
    const result = app.sub();
    assert.equal(result, 0);
  });

  it("should return 0 if either argument is not a number", function () {
    const result = app.sub(1, "test");
    assert.equal(result, 0);
  });
});
