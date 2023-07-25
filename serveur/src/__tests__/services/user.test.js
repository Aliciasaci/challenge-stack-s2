process.env.NODE_ENV = "test";
const { Sequelize } = require("sequelize");
const userService = require("../../services/user");
const UserModel = require("../../db/models/user");
const ValidationError = require("../../errors/ValidationError");
const { afterEach } = require("node:test");

describe("User service", () => {
  const sequelize = new Sequelize(process.env.DATABASE_URL);
  const User = UserModel(sequelize);

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("creating invalid user should throw ValidationError", async () => {
    const userData = {
      firstname: "John",
      lastname: "Doe",
      email: "test@test.com",
    };
    expect(userService().create(userData)).rejects.toThrow(ValidationError);
  });

  it("deleting invalid user should throw an Error", async () => {
    expect(userService().deleteOne("invalid-id")).rejects.toThrow(Error);
  });

  it("updating invalid user should throw ValidationError", async () => {
    const userData = {
      firstname: "John",
      lastname: "Doe",
      email: "example@exmaple.com",
    };
    expect(userService().updateOne("invalid-id", userData)).rejects.toThrow(
      Error
    );
  });
});
