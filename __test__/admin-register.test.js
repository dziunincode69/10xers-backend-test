require("dotenv").config();
const request = require("supertest");
const app = require("../index");
const { Admin } = require("../models");

beforeAll(async () => {
  try {
    await Admin.create({
      email: "admin@admin.com",
      password: "Admin123",
    });
  } catch (error) {
    console.log(error);
  }
});
afterAll(async () => {
  try {
    await Admin.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("success test for register user", () => {
  test("Success register", async () => {
    try {
      const response = await request(app)
        .post("/admin/register")
        .send({ email: "admin@admin123.com", password: "Admin123" });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    } catch (error) {
      console.log(error);
    }
  });
});

describe("failed test for Register user", () => {
  test("Failed Email Blank", async () => {
    try {
      const response = await request(app)
        .post("/admin/register")
        .send({ password: "1234" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email cannot blank");
    } catch (error) {
      console.log(error);
    }
  });

  test("Failed Password Blank", async () => {
    try {
      const response = await request(app)
        .post("/admin/register")
        .send({ email: "admin1asd@mail.com" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password cannot blank");
    } catch (error) {
      console.log(error);
    }
  });
  test("Email Already Used", async () => {
    try {
      const response = await request(app)
        .post("/admin/register")
        .send({ email: "admin@admin.com", password: "asdasdas" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email must be unique");
    } catch (error) {
      console.log(error);
    }
  });
});
