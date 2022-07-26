// mock out Sequelize
const sequelize = jest.mock("sequelize");
//mock out database model
const db = require("../../app/models");
db.users = {};

const app = require("../../server.js");
const request = require("supertest");

describe("users controller", () => {
  var testUser = {
    username: "AnteSusic21",
    role: "Admin",
    email: "ante.susic@eagles.oc.edu",
    password: "antesusic21",
    published: false,
    dataValues: {
      username: "AnteSusic21",
      role: "Admin",
      email: "ante.susic@eagles.oc.edu",
      password: "antesusic21",
      published: false,
    },
  };

  describe("get users list", () => {
    it("calls getAll without query", async () => {
      db.users.findAll = jest.fn().mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/api/users/")
        .expect(200)
        .then((response) => {
          expect(db.users.findAll).toHaveBeenCalled();
        });
    });

    it("responds with results from getAll", async () => {
      db.users.findAll = jest
        .fn()
        .mockResolvedValue(Promise.resolve([testUser]));
      await request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1);
          expect(response.body[0]).toMatchObject(testUser);
        });
    });

    it("responds with 500 and message on error", async () => {
      db.users.findAll = jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error("Fake error from test"))
        );
      await request(app)
        .get("/api/users")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test");
        });
    });
  });

  describe("delete a single user", () => {
    it("calls delete a single user with an id", async () => {
      db.users.destroy = jest.fn().mockResolvedValue(Promise.resolve(1));
      await request(app)
        .delete("/api/users/1")
        .expect(200)
        .then((response) => {
          expect(db.users.destroy).toHaveBeenCalled();
        });
    });

    it("responds with results from user delete", async () => {
      db.users.destroy = jest.fn().mockResolvedValue(Promise.resolve(1));
      await request(app)
        .delete("/api/users/1")
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("User was deleted successfully!");
        });
    });

    it("responds with 500 and message on error", async () => {
      db.users.destroy = jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error("Fake error from test"))
        );
      await request(app)
        .delete("/api/users/1")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Could not delete User with id=1");
        });
    });
  });

  describe("update a single user", () => {
    it("calls update a single user with an id", async () => {
      db.users.findByPk = jest
        .fn()
        .mockResolvedValue(Promise.resolve(testUser));
      db.users.update = jest.fn().mockResolvedValue(Promise.resolve(1));
      await request(app)
        .post("/api/users/1")
        .send(testUser)
        .expect(200)
        .then((response) => {
          expect(db.users.update).toHaveBeenCalled();
        });
    });

    it("responds with results from user update", async () => {
      db.users.findByPk = jest
        .fn()
        .mockResolvedValue(Promise.resolve(testUser));
      db.users.update = jest.fn().mockResolvedValue(Promise.resolve(1));
      await request(app)
        .post("/api/users/1")
        .send(testUser)
        .expect(200)
        .then((response) => {
          expect(response.body.message).toBe("User info updated successfully.");
        });
    });

    it("responds with 500 and message on error", async () => {
      db.users.update = jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error("Fake error from test"))
        );
      await request(app)
        .post("/api/users/1")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test with id: 1");
        });
    });
  });
  describe("find a single user", () => {
    it("calls find a single user with an id", async () => {
      db.users.findByPk = jest.fn().mockResolvedValue(Promise.resolve([]));
      await request(app)
        .get("/api/users/1")
        .expect(200)
        .then((response) => {
          expect(db.users.findByPk).toHaveBeenCalled();
        });
    });

    it("responds with results from user findOne", async () => {
      db.users.findByPk = jest
        .fn()
        .mockResolvedValue(Promise.resolve([testUser]));
      await request(app)
        .get("/api/users/1")
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(1);
          expect(response.body[0]).toMatchObject(testUser);
        });
    });

    it("responds with 500 and message on error", async () => {
      db.users.findOne = jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error("Fake error from test"))
        );
      await request(app)
        .get("/api/users")
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test");
        });
    });
  });

  describe("find a single user", () => {
    var loginCreds = {
      password: "ante21",
      email: "antesusirrrc210101@gmail.com",
    };
    var badPassCreds = {
      password: "aaatgkyufyugyua",
      email: "antesusirrrc210101@gmail.com",
    };
    var badEmailCreds = {
      password: "ante21",
      email: "antesusirrrdedsdssdsc210101@gmail.com",
    };

    var loginDBUser = {
      id: 1,
      username: "antes21",
      role: "SuperAdmin",
      email: "antesusirrrc210101@gmail.com",
      password: "$2b$10$5QUDPS9tZqi0x6jHUNSrBuAHr.VNjZaCgawJHVJsnb/7hYhxvVbba",
      createdAt: "2022-07-26T03:43:26.000Z",
      updatedAt: "2022-07-26T03:43:26.000Z",
      dataValues: {
        id: 1,
        username: "antes21",
        role: "SuperAdmin",
        email: "antesusirrrc210101@gmail.com",
        password:
          "$2b$10$5QUDPS9tZqi0x6jHUNSrBuAHr.VNjZaCgawJHVJsnb/7hYhxvVbba",
        createdAt: "2022-07-26T03:43:26.000Z",
        updatedAt: "2022-07-26T03:43:26.000Z",
      },
    };

    it("succesful login", async () => {
      db.users.findOne = jest
        .fn()
        .mockResolvedValue(Promise.resolve(loginDBUser));
      await request(app)
        .post("/api/users/login")
        .send(loginCreds)
        .expect(200)
        .then((response) => {
          expect(response.body).toStrictEqual({
            id: 1,
            username: "antes21",
            role: "SuperAdmin",
            email: "antesusirrrc210101@gmail.com",
            createdAt: "2022-07-26T03:43:26.000Z",
            updatedAt: "2022-07-26T03:43:26.000Z",
          });
        });
    });

    it("invalid password", async () => {
      db.users.findOne = jest
        .fn()
        .mockResolvedValue(Promise.resolve(loginDBUser));
      await request(app)
        .post("/api/users/login")
        .send(badPassCreds)
        .expect(401)
        .then((response) => {
          expect(response.body.message).toBe("Invalid Password");
        });
    });

    it("invalid email", async () => {
      db.users.findOne = jest.fn().mockResolvedValue(Promise.resolve());
      await request(app)
        .post("/api/users/login")
        .send(badEmailCreds)
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("Cannot find user");
        });
    });
  });

  describe("create a user", () => {
    it("calls create a user", async () => {
      db.users.create = jest.fn().mockResolvedValue(Promise.resolve(testUser));
      await request(app)
        .post("/api/users/")
        .send(testUser)
        .expect(200)
        .then((response) => {
          expect(db.users.create).toHaveBeenCalled();
        });
    });

    it("responds with results from user create", async () => {
      db.users.create = jest.fn().mockResolvedValue(Promise.resolve(testUser));
      await request(app)
        .post("/api/users/")
        .send(testUser)
        .expect(200)
        .then((response) => {
          expect(response.body).toStrictEqual({
            email: "ante.susic@eagles.oc.edu",
            published: false,
            role: "Admin",
            username: "AnteSusic21",
          });
        });
    });

    it("responds with 500 and message on error", async () => {
      db.users.create = jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error("Fake error from test"))
        );
      await request(app)
        .post("/api/users/")
        .send(testUser)
        .expect(500)
        .then((response) => {
          expect(response.body.message).toBe("Fake error from test");
        });
    });

    it("responds with 400 on username empty", async () => {
      db.users.create = jest
        .fn()
        .mockImplementation(() =>
          Promise.reject(new Error("Fake error from test"))
        );
      await request(app)
        .post("/api/users/")
        .expect(400)
        .then((response) => {
          expect(response.body.message).toBe("User name can not be empty!");
        });
    });
  });
});
