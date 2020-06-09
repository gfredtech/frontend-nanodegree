const request = require("supertest");
const serv = require("./server.js");

test("Root endpoint", () => {
  const res = request(serv)
    .get("/")
    .then((res) => {
      expect(res.statusCode).toBe(200);
    });
});
