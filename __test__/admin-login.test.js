require("dotenv").config();
const request = require("supertest");
const app = require("..");
const { Admin } = require("../models");

beforeAll(async () => {
  try {
    await Admin.create({
      email: "admin@admin.com",
      password: "admin123",
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

describe("success test for admin user", () => {
  test("Success login", async () => {
    try {
      const response = await request(app)
        .post("/admin/login")
        .send({ email: "admin@admin.com", password: "admin123" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    } catch (error) {
      console.log(error);
    }
  });
});

describe("failed test for login admin", () => {
  test("Failed Password", async () => {
    try {
      const response = await request(app)
        .post("/admin/login")
        .send({ email: "admin@admin.com", password: "wrongpassword" });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Wrong Email / Password");
    } catch (error) {
      console.error(error);
    }
  });

  test("Email Not Found", async () => {
    try {
      const response = await request(app)
        .post("/admin/login")
        .send({ email: "admin1asd@mail.com", password: "12345" });
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Wrong Email / Password");
    } catch (error) {
      console.error(error);
    }
  });
  test("Email Blank", async () => {
    try {
      const response = await request(app)
        .post("/admin/login")
        .send({ password: "12345" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email cannot blank");
    } catch (error) {
      console.error(error);
    }
  });
  test("Password Blank", async () => {
    try {
      const response = await request(app)
        .post("/admin/login")
        .send({ email: "admin1asd@mail.com" });
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password cannot blank");
    } catch (error) {
      console.error(error);
    }
  });
});
