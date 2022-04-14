import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

/* Get all users */
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

/* Get all tasks */
app.get("/feed", async (req, res) => {
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

/* Create new user */
app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: { ...req.body },
  });
  res.json(result);
});

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

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);