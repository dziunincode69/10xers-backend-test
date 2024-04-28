require("dotenv").config();
const request = require("supertest");
const app = require("..");
const { Product } = require("../models");
const body = {
  name: "Iphone 11",
  img_url:
    "https://media.very.co.uk/i/very/VPZ1K_SQ1_0000000004_BLACK_SLf?$300x400_retinamobilex2$&$roundel_very$&p1_img=blank_apple",
  description: "BNIB IPHONE",
  price: 190000,
  user_id: 1,
};
const items = ["Samsung", "Iphone 12", "Iphone 13", "Iphone 14"];
beforeAll(async () => {
  try {
    await Promise.all(
      items.map(async (item) => {
        body.name = item;
        await Product.create(body);
      })
    );
  } catch (error) {
    console.error(error);
  }
});
afterAll(async () => {
  try {
    await Product.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  } catch (error) {
    console.log(error);
  }
});

const AdminTOKENACCESS =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbjIuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzE0MzE2MDg1fQ.bCtEru9ru0AmF-_jyeUVmuQgq8jppwobPI2qmezeEtc";

const UserTOKENACCESS =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE3MTQzMTM1MTF9.GJKwn3NRQ9NJNsJecZm7dn3ib1xjWWtnfYOWPHK97eA";

const WRONGJWT = "eyJ00000011233380XX00000000000";

describe("Success Add Product", () => {
  test("Success Add Product By User", async () => {
    try {
      const response = await request(app)
        .post("/product/add")
        .set("access_token", UserTOKENACCESS)
        .send(body);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("name", expect.any(String));
      expect(response.body).toHaveProperty("img_url", expect.any(String));
      expect(response.body).toHaveProperty("description", expect.any(String));
      expect(response.body).toHaveProperty("price", expect.any(Number));
    } catch (error) {
      console.error(error);
    }
  });
  test("Success Add Product By Admin", async () => {
    try {
      const response = await request(app)
        .post("/product/add")
        .set("access_token", AdminTOKENACCESS)
        .send(body);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("name", expect.any(String));
      expect(response.body).toHaveProperty("img_url", expect.any(String));
      expect(response.body).toHaveProperty("description", expect.any(String));
      expect(response.body).toHaveProperty("price", expect.any(Number));
    } catch (error) {
      console.error(error);
    }
  });
});
describe("Failed Add Product", () => {
  test("Failed Jwt Not Provided", async () => {
    const response = await request(app)
      .post("/product/add")
      //   .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "jwt must be provided");
  });
  test("Failed Malformed JWT", async () => {
    const response = await request(app)
      .post("/product/add")
      .set("access_token", WRONGJWT)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });
  test("Failed Name Cannot Blank", async () => {
    const bb = body;
    delete bb.name;
    const response = await request(app)
      .post("/product/add")
      .set("access_token", UserTOKENACCESS)
      .send(bb);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Product name cannot blank"
    );
    bb.name = "Iphone";
  });
  test("Failed img_url Cannot Blank", async () => {
    const bb = body;
    console.log(bb);
    delete bb.img_url;
    const response = await request(app)
      .post("/product/add")
      .set("access_token", UserTOKENACCESS)
      .send(bb);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "image_url cannot blank");
    bb.img_url = "google.com";
  });
  test("Failed Price Cannot Blank", async () => {
    const bb = body;
    console.log(bb);
    delete bb.price;
    const response = await request(app)
      .post("/product/add")
      .set("access_token", UserTOKENACCESS)
      .send(bb);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Price cannot blank");
    bb.price = "123";
  });
  test("Failed Price Not Integer", async () => {
    const bb = body;
    console.log(bb);
    bb.price = "xxxxxx";
    const response = await request(app)
      .post("/product/add")
      .set("access_token", UserTOKENACCESS)
      .send(bb);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Please Input Valid integer"
    );
    bb.price = 123;
  });
});

describe("Success Edit Product", () => {
  test("Success Edit Product by Admin", async () => {
    const response = await request(app)
      .put("/product/edit/1")
      .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("img_url", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("price", expect.any(Number));
  });
});
describe("Failed Edit Product", () => {
  test("Failed Jwt Not Provided", async () => {
    const response = await request(app)
      .put("/product/edit")
      //   .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "jwt must be provided");
  });
  test("Failed Malformed JWT", async () => {
    const response = await request(app)
      .put("/product/edit")
      .set("access_token", WRONGJWT)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "jwt malformed");
  });
  test("Failed Product Id Cannot blank", async () => {
    delete body.name;
    const response = await request(app)
      .put("/product/edit")
      .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "product_id cannot blank");
    body.name = "abcd";
  });
  test("Failed Product Not Found", async () => {
    delete body.name;
    const response = await request(app)
      .put("/product/edit/1337")
      .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product Not Found");
    body.name = "abcd";
  });
  test("Failed Name Cannot blank", async () => {
    delete body.name;
    const response = await request(app)
      .put("/product/edit/1")
      .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Product name cannot blank"
    );
    body.name = "abcd";
  });
  test("Failed img_url Cannot blank", async () => {
    delete body.img_url;
    const response = await request(app)
      .put("/product/edit/1")
      .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "image_url cannot blank");
    body.img_url = "google.com";
  });
  test("Failed Price Cannot blank", async () => {
    delete body.price;
    const response = await request(app)
      .put("/product/edit/1")
      .set("access_token", AdminTOKENACCESS)
      .send(body);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Price cannot blank");
    body.img_url = 1337;
  });
  test("Failed Price Not Integer", async () => {
    const bb = body;
    console.log(bb);
    bb.price = "xxxxxx";
    const response = await request(app)
      .put("/product/edit/1")
      .set("access_token", AdminTOKENACCESS)
      .send(bb);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Please Input Valid integer"
    );
    bb.price = 123;
  });
});

describe("Error by User", () => {
  test("User Trying To Edit Product", async () => {
    try {
      const response = await request(app)
        .put("/product/edit/1")
        .set("access_token", UserTOKENACCESS)
        .send(body);
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty(
        "message",
        "Cannot Perform This Action"
      );
    } catch (error) {
      console.error(error);
    }
  });
  test("User Trying To Delete Product", async () => {
    try {
      const response = await request(app)
        .delete("/product/delete/2")
        .set("access_token", UserTOKENACCESS)
        .send(body);
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty(
        "message",
        "Cannot Perform This Action"
      );
    } catch (error) {
      console.error(error);
    }
  });
});

describe("Delete product success", () => {
  test("Delete Product success By Admin", async () => {
    try {
      const response = await request(app)
        .delete("/product/delete/4")
        .set("access_token", AdminTOKENACCESS)
        .send(body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", expect.any(String));
    } catch (error) {
      console.error(error);
    }
  });
});
describe("Failed Delete product", () => {
  test("Delete Product Cannot Find Id", async () => {
    try {
      const response = await request(app)
        .delete("/product/delete/1337")
        .set("access_token", AdminTOKENACCESS)
        .send(body);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Product Not Found");
    } catch (error) {
      console.error(error);
    }
  });
  test("Delete Product ID Cannot blank", async () => {
    try {
      const response = await request(app)
        .delete("/product/delete")
        .set("access_token", AdminTOKENACCESS)
        .send(body);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "product_id cannot blank"
      );
    } catch (error) {
      console.error(error);
    }
  });
});
describe("Get All Products", () => {
  test("should return a list of products", async () => {
    const response = await request(app)
      .get("/product/show")
      .set("access_token", UserTOKENACCESS);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((product) => {
      expect(product).toHaveProperty("id", expect.any(Number));
      expect(product).toHaveProperty("name", expect.any(String));
      expect(product).toHaveProperty("description", expect.any(String));
      expect(product).toHaveProperty("img_url", expect.any(String));
      expect(product).toHaveProperty("price", expect.any(Number));
      expect(product).toHaveProperty("user_id", expect.any(Number));
      expect(product).toHaveProperty("createdAt", expect.any(String));
      expect(product).toHaveProperty("updatedAt", expect.any(String));
    });
  });
});
