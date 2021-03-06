const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}; */

app.use(cors());

/* Get all tasks of one user */
app.get(`/tasks/author/:email`, auth, async (req, res) => {
  const { email } = req.params;
  const tasks = await prisma.task.findMany({
    where: {
      authorId: { equals: email },
    },
  });
  res.json(tasks);
});

/* Register new user */
app.post(`/auth`, user.register);

/* Login as a user */
app.post(`/auth/login`, user.login);

/* Create new task which is connected via email with the user */
app.post(`/task`, async (req, res) => {
  const { content, authorEmail } = req.body;
  const result = await prisma.task.create({
    data: {
      content,
      checked: false,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
});

/* Update: Check the checked field */
app.put("/task/check/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.update({
    where: { id },
    data: { checked: true },
  });
  res.json(task);
});

/* Update: Uncheck the checked field */
app.put("/task/uncheck/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.update({
    where: { id },
    data: { checked: false },
  });
  res.json(task);
});

/* Delete a task */
app.delete(`/task/:id`, async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: { id },
  });
  res.json(task);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
