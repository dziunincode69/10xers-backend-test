require("dotenv").config();
const request = require("supertest");
const app = require("../");
const { Admin, User } = require("../models");

beforeAll(async () => {
  try {
    await User.create({
      email: "user@user.com",
      password: "user123",
    });
  } catch (error) {
    console.log(error);
  }
});
afterAll(async () => {
  try {
    await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("success test for login user", () => {
  test("Success login", async () => {
    try {
      const response = await request(app)
        .post("/login")
        .send({ email: "user@user.com", password: "user123" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    } catch (error) {
      console.log(error);
    }
  });
});

describe("failed test for login user", () => {
  test("Failed Email not found", async () => {
    try {
      const response = await request(app)
        .post("/login")
        .send({ email: "admin@mail.com", password: "wrongpassword" });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Wrong Email / Password");
    } catch (error) {
      console.error(error);
    }
  });
  test("Failed Wrong Password", async () => {
    try {
      const response = await request(app)
        .post("/login")
        .send({ email: "user@user.com", password: "wrongpassword" });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Wrong Email / Password");
    } catch (error) {
      console.error(error);
    }
  });
  test("Failed Email Cannot Blank", async () => {
    try {
      const response = await request(app)
        .post("/login")
        .send({ password: "wrongpassword" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Email cannot blank");
    } catch (error) {
      console.error(error);
    }
  });
  test("Failed Email Cannot Blank", async () => {
    try {
      const response = await request(app)
        .post("/login")
        .send({ email: "admin@mail.com" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Password cannot blank");
    } catch (error) {
      console.error(error);
    }
  });

  test("Email Not Found", async () => {
    try {
      const response = await request(app)
        .post("/login")
        .send({ email: "admin1asd@mail.com", password: "12345" });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Wrong Email / Password");
    } catch (error) {
      console.error(error);
    }
  });
});
