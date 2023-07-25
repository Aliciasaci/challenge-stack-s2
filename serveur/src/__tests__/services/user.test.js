const user = require("../../services/user");
const db = require("../../db");
const ValidationError = require("../../errors/ValidationError");

describe("User service", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.User.destroy({ where: {} });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("findAll", () => {
    it("should return an empty array when there are no users", async () => {
      const users = await user().findAll();
      expect(users).toEqual([]);
    });

    it("should return all users when no criteria is provided", async () => {
      await db.User.bulkCreate([
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Doe", email: "jane.doe@example.com" },
      ]);

      const users = await user().findAll();
      expect(users).toHaveLength(2);
    });

    it("should return users matching the provided criteria", async () => {
      await db.User.bulkCreate([
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Doe", email: "jane.doe@example.com" },
      ]);

      const users = await user().findAll({ name: "John Doe" });
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe("John Doe");
    });

    it("should apply pagination when options.page is provided", async () => {
      await db.User.bulkCreate([
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Doe", email: "jane.doe@example.com" },
        { name: "Bob Smith", email: "bob.smith@example.com" },
      ]);

      const users = await user().findAll({}, { page: 2, limit: 1 });
      expect(users).toHaveLength(1);
      expect(users[0].name).toBe("Jane Doe");
    });

    it("should apply sorting when options.order is provided", async () => {
      await db.User.bulkCreate([
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Doe", email: "jane.doe@example.com" },
        { name: "Bob Smith", email: "bob.smith@example.com" },
      ]);

      const users = await user().findAll({}, { order: "name:desc" });
      expect(users).toHaveLength(3);
      expect(users[0].name).toBe("John Doe");
      expect(users[1].name).toBe("Jane Doe");
      expect(users[2].name).toBe("Bob Smith");
    });

    it("should select only the specified attributes when options.attributes is provided", async () => {
      await db.User.bulkCreate([
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Doe", email: "jane.doe@example.com" },
      ]);

      const users = await user().findAll({}, { attributes: "name" });
      expect(users).toHaveLength(2);
      expect(users[0].name).toBe("John Doe");
      expect(users[0].email).toBeUndefined();
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const userData = { name: "John Doe", email: "john.doe@example.com" };
      const createdUser = await user().create(userData);

      expect(createdUser).toMatchObject(userData);
      expect(createdUser.id).toBeDefined();
    });

    it("should throw a ValidationError if the provided data is invalid", async () => {
      const userData = { name: "John Doe" };
      await expect(user().create(userData)).rejects.toBeInstanceOf(
        ValidationError
      );
    });
  });

  describe("findOne", () => {
    it("should return null when the user does not exist", async () => {
      const foundUser = await user().findOne(1);
      expect(foundUser).toBeNull();
    });

    it("should return the user when it exists", async () => {
      const createdUser = await db.User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
      const foundUser = await user().findOne(createdUser.id);

      expect(foundUser).toMatchObject(createdUser.toJSON());
    });
  });

  describe("replaceOne", () => {
    it("should replace the user with the provided data", async () => {
      const createdUser = await db.User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
      const newData = { name: "Jane Doe", email: "jane.doe@example.com" };
      const [replacedUser, wasDeleted] = await user().replaceOne(
        createdUser.id,
        newData
      );

      expect(replacedUser).toMatchObject(newData);
      expect(wasDeleted).toBe(true);

      const foundUser = await db.User.findByPk(createdUser.id);
      expect(foundUser).toBeNull();
    });

    it("should create a new user if the user does not exist", async () => {
      const newData = { name: "Jane Doe", email: "jane.doe@example.com" };
      const [createdUser, wasDeleted] = await user().replaceOne(1, newData);

      expect(createdUser).toMatchObject(newData);
      expect(createdUser.id).toBeDefined();
      expect(wasDeleted).toBe(false);
    });

    it("should throw a ValidationError if the provided data is invalid", async () => {
      const createdUser = await db.User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
      const newData = { name: "Jane Doe" };
      await expect(
        user().replaceOne(createdUser.id, newData)
      ).rejects.toBeInstanceOf(ValidationError);
    });
  });

  describe("updateOne", () => {
    it("should update the user with the provided data", async () => {
      const createdUser = await db.User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
      const newData = { name: "Jane Doe", email: "jane.doe@example.com" };
      const updatedUser = await user().updateOne(createdUser.id, newData);

      expect(updatedUser).toMatchObject(newData);

      const foundUser = await db.User.findByPk(createdUser.id);
      expect(foundUser).toMatchObject(newData);
    });

    it("should return null if the user does not exist", async () => {
      const updatedUser = await user().updateOne(1, { name: "Jane Doe" });
      expect(updatedUser).toBeNull();
    });

    it("should throw a ValidationError if the provided data is invalid", async () => {
      const createdUser = await db.User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
      const newData = { name: "" };
      await expect(
        user().updateOne(createdUser.id, newData)
      ).rejects.toBeInstanceOf(ValidationError);
    });
  });

  describe("deleteOne", () => {
    it("should delete the user", async () => {
      const createdUser = await db.User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
      const wasDeleted = await user().deleteOne(createdUser.id);
      expect(wasDeleted).toBe(true);

      const foundUser = await db.User.findByPk(createdUser.id);
      expect(foundUser).toBeNull();
    });

    it("should return false if the user does not exist", async () => {
      const wasDeleted = await user().deleteOne(1);
      expect(wasDeleted).toBe(false);
    });
  });

  describe("getUserTags", () => {
    it("should return an empty array when there are no tags for the user", async () => {
      const tags = await user().getUserTags(1);
      expect(tags).toEqual([]);
    });

    it("should return all tags for the user", async () => {
      const createdUser = await db.User.create({
        name: "John Doe",
        email: "john.doe@example.com",
      });
      const createdTags = await db.Tag.bulkCreate([
        { name: "tag1", id_user: createdUser.id },
        { name: "tag2", id_user: createdUser.id },
      ]);

      const tags = await user().getUserTags(createdUser.id);
      expect(tags).toHaveLength(2);
      expect(tags.map((t) => t.toJSON())).toEqual(
        createdTags.map((t) => t.toJSON())
      );
    });
  });
});
