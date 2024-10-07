import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/minio/event", (req, res) => {
  console.log(
    `${new Date().toISOString()} Received webhook ${req.body.EventName} event on key ${
      req.body.Key
    }`
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
