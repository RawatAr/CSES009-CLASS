import http from "http";

const server = http.createServer((req, res) => {
  res.end("Hello world2");
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
