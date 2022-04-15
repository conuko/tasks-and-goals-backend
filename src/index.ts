import { PrismaClient } from "@prisma/client";
import express from "express";

import bodyParser from "body-parser";

const user = require("../controllers/auth.controller");

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Get all users */
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/* Get all tasks */
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    include: { author: true },
  });
  res.json(tasks);
});

/* Get one specific task with its unique ID */
app.get(`/task/:id`, async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: String(id) },
  });
  res.json(task);
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
    where: { id: String(id) },
    data: { checked: true },
  });
  res.json(task);
});

/* Update: Uncheck the checked field */
app.put("/task/uncheck/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.update({
    where: { id: String(id) },
    data: { checked: false },
  });
  res.json(task);
});

/* Delete a task */
app.delete(`/task/:id`, async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: { id: String(id) },
  });
  res.json(task);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
