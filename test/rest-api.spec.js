const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/rest-api");

const expect = chai.expect;
chai.use(chaiHttp);

describe("Tasks API", function () {
  // const serverDomain = "http://localhost:4000";

  // * GET
  describe("GET /api/tasks", function () {
    it("should GET all the tasks", function (done) {
      chai
        .request(server)
        .get("/api/tasks")
        .end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("array");
          expect(response.body.length).to.be.eq(3);
          done();
        });
    });

    it("failed to GET all the tasks", function (done) {
      chai
        .request(server)
        .get("/api/task")
        .end(function (error, response) {
          expect(response).to.have.status(404);
          done();
        });
    });
  });

  // * GET by id
  describe("GET /api/tasks/:id", function () {
    it("should GET a task by id", function (done) {
      const taskId = 2;
      chai
        .request(server)
        .get(`/api/tasks/${taskId}`)
        .end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("completed");
          expect(response.body).to.have.property("id").to.be.eq(2);
          done();
        });
    });

    it("faild to GET a task by id", function (done) {
      const taskId = 0;
      chai
        .request(server)
        .get(`/api/tasks/${taskId}`)
        .end(function (error, response) {
          expect(response).to.have.status(404);
          expect(response.text).to.be.eq(
            "The task with the provided ID does not exist."
          );
          done();
        });
    });
  });

  // * POST
  describe("POST /api/tasks", function () {
    it("should POST a new task", function (done) {
      const task = {
        name: "Task 4",
        completed: false,
      };
      chai
        .request(server)
        .post("/api/tasks")
        .send(task)
        .end(function (error, response) {
          expect(response).to.have.status(201);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("completed");
          expect(response.body).to.have.property("name").to.be.eq("Task 4");
          expect(response.body).to.have.property("completed").to.be.eq(false);
          done();
        });
    });

    it("failed to POST a new task without name property", function (done) {
      const task = {
        completed: false,
      };
      chai
        .request(server)
        .post("/api/tasks")
        .send(task)
        .end(function (error, response) {
          expect(response).to.have.status(400);
          expect(response.text).to.be.eq(
            "The name should be at least 3 chars long!"
          );
          done();
        });
    });
  });

  // * PUT
  describe("PUT /api/tasks/:id", function () {
    it("should PUT a task of specific id", function (done) {
      const taskId = 1;
      const task = {
        name: "Task 1 changed",
        completed: false,
      };
      chai
        .request(server)
        .put(`/api/tasks/${taskId}`)
        .send(task)
        .end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("completed");
          expect(response.body).to.have.property("id").to.be.eq(1);
          expect(response.body)
            .to.have.property("name")
            .to.be.eq("Task 1 changed");
          expect(response.body).to.have.property("completed").to.be.eq(false);
          done();
        });
    });

    it(
      "failed to PUT a task of specific id " +
        "because the name property is less than 3 characters",
      function (done) {
        const taskId = 1;
        const task = {
          name: "Ta",
          completed: false,
        };
        chai
          .request(server)
          .put(`/api/tasks/${taskId}`)
          .send(task)
          .end(function (error, response) {
            expect(response).to.have.status(400);
            expect(response.text).to.be.eq(
              "The name should be at least 3 chars long!"
            );
            done();
          });
      }
    );

    it("failed to PUT a task of specific id because the id doesn't exist", function (done) {
      const taskId = 0;
      const task = {
        name: "Task 0",
        completed: false,
      };
      chai
        .request(server)
        .put(`/api/tasks/${taskId}`)
        .send(task)
        .end(function (error, response) {
          expect(response).to.have.status(404);
          expect(response.text).to.be.eq(
            "The task with the provided ID does not exist."
          );
          done();
        });
    });
  });

  // * PATCH
  describe("PATCH /api/tasks/:id", function () {
    it("should PATCH a task of specific id", function (done) {
      const taskId = 1;
      const task = {
        name: "Task 1 patched successfully",
      };
      chai
        .request(server)
        .patch(`/api/tasks/${taskId}`)
        .send(task)
        .end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("completed");
          expect(response.body).to.have.property("id").to.be.eq(1);
          expect(response.body)
            .to.have.property("name")
            .to.be.eq("Task 1 patched successfully");
          done();
        });
    });

    it("should PATCH a task of specific id including completed property", function (done) {
      const taskId = 1;
      const task = {
        name: "Task 1 patched successfully",
        completed: true,
      };
      chai
        .request(server)
        .patch(`/api/tasks/${taskId}`)
        .send(task)
        .end(function (error, response) {
          expect(response).to.have.status(200);
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("completed");
          expect(response.body).to.have.property("id").to.be.eq(1);
          expect(response.body).to.have.property("completed").to.be.eq(true);
          expect(response.body)
            .to.have.property("name")
            .to.be.eq("Task 1 patched successfully");
          done();
        });
    });

    it(
      "failed to PATCH a task of specific id " +
        "because the name is less than 3 characters",
      function (done) {
        const taskId = 1;
        const task = {
          name: "Ta",
        };
        chai
          .request(server)
          .patch(`/api/tasks/${taskId}`)
          .send(task)
          .end(function (error, response) {
            expect(response).to.have.status(400);
            expect(response.text).to.be.eq(
              "The name should be at least 3 chars long!"
            );
            done();
          });
      }
    );

    it("failed to PATCH a task of specific id because the id doesn't exist", function (done) {
      const taskId = 0;
      const task = {
        name: "Task 1 patched successfully",
      };
      chai
        .request(server)
        .patch(`/api/tasks/${taskId}`)
        .send(task)
        .end(function (error, response) {
          expect(response).to.have.status(404);
          expect(response.text).to.be.eq(
            "The task with the provided ID does not exist."
          );
          done();
        });
    });
  });

  // * DELETE
  describe("DELETE /api/tasks/:id", function () {
    it("should DELETE a task of specific id", function (done) {
      const taskId = 1;
      chai
        .request(server)
        .delete(`/api/tasks/${taskId}`)
        .end(function (error, response) {
          expect(response).to.have.status(200);
          done();
        });
    });

    it("failed DELETE a task of specific id because the id doesn't exist", function (done) {
      const taskId = 0;
      chai
        .request(server)
        .delete(`/api/tasks/${taskId}`)
        .end(function (error, response) {
          expect(response).to.have.status(404);
          expect(response.text).to.be.eq(
            "The task with the provided ID does not exist."
          );
          done();
        });
    });
  });
});
