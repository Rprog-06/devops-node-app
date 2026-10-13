const request = require("supertest");
const http = require("http");
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");

let server;

before(() => {
  server = http.createServer((req, res) => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Node.js app is running!");
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });
});

after(() => {
  server.close();
});

test("GET / returns the expected message", async () => {
  const response = await request(server)
    .get("/")
    .expect(200);

  assert.equal(response.text, "Node.js app is running!");
});
