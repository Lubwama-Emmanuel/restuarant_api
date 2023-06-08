const mongoose = require("mongoose");
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../app");

const api = request(app);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

describe("Restuarant Endpoints", () => {
  // Connecting to database before each test
  beforeEach(async () => {
    jest.setTimeout(30000);
    await mongoose.connect(DB);
  });

  // Close database connection after each test
  afterEach(async () => {
    await mongoose.connection.close();
  });

  const newRestuarant = {
    name: "test restuarant",
    title: "test title",
    cuisineType: "test cuisine",
    location: "test location",
  };

  test("should create a restuarant and return 201", async () => {
    const response = await api
      .post("/api/v1/newRestuarant")
      .send(newRestuarant);
    expect(response.statusCode).toBe(201);
  });

  test("should update a restuarant and return 200", async () => {
    const response = await api
      .patch("/api/v1/updateRestuarant/64808d9622cb16969f2eee3f")
      .send(newRestuarant);
    expect(response.statusCode).toBe(200);
  });

  test("should return resturant by id, and statusCode 200", async () => {
    const response = await api.get(
      "/api/v1/getRestuarant/64808d9622cb16969f2eee3f"
    );
    expect(response.statusCode).toBe(200);
  });

  test("should return all restuarants, and statusCode 200", async () => {
    const response = await api.get("/api/v1/getAllRestuarants");
    expect(response.statusCode).toBe(200);
  });

  test("should delete resturant by id, and statusCode 204", async () => {
    const response = await api.delete(
      "/api/v1/deleteRestuarant/64808d9622cb16969f2eee3f"
    );
    expect(response.statusCode).toBe(204);
  });
});
