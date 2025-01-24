import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import app from "./index4.js"; // Assuming the app is exported from index4.js

// backend/3.4 Middleware/index4.test.js

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("Express App", () => {
  it("should return index.html on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.header['content-type']).toBe("text/html; charset=UTF-8");
  });

  it("should generate band name on POST /submit", async () => {
    const res = await request(app)
      .post("/submit")
      .send({ pet: "Fluffy", street: "Main" });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Your band name is Fluffy z Main");
  });

  it("should use generateBandName middleware", async () => {
    const req = { body: { pet: "Buddy", street: "Elm" } };
    const res = {};
    const next = jest.fn();

    generateBandName(req, res, next);
    expect(req.body.bandName).toBe("Buddy z Elm");
    expect(next).toHaveBeenCalled();
  });
});