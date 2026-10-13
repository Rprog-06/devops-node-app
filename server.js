const http = require("http");
const { MongoClient } = require("mongodb");

const mongoUrl = process.env.MONGO_URL || "mongodb://mongodb:27017";
const client = new MongoClient(mongoUrl);

async function startServer() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    const db = client.db("devopsdb");

    const server = http.createServer(async (req, res) => {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Node.js app is running!");
      } else if (req.url === "/db") {
        try {
          await db.command({ ping: 1 });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            message: "Node.js connected to MongoDB successfully!"
          }));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Database connection failed");
        }
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });

    const port = process.env.PORT || 3000;

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}