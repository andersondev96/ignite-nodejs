import express from "express";

const app = express();

app.use(express.json);

app.get("/", (request, response) => response.json({ message: "Hello World" }));

app.post("/courses", (request, response) => {
  const { name } = request.body;
  return response.json({ name });
});

app.listen(3333, () => console.log("Server is running!"));
