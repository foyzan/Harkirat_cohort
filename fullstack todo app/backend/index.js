const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { todo } = require("./db");
const app = express();
app.listen(3000, function () {
  console.log("server is running " + 3000);
});

app.use(express.json());

app.get("/todo", async function (req, res) {
  const todoList = await todo.find({});

  res.json({
    todoList,
  });
});

app.post("/todos", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "invalid input",
    });
  }

  try {
    await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });

    return res.json({
      msg: "todo created",
    });
  } catch (err) {
    return res.status(404).json({
      msg: err,
    });
  }
});

app.put("/completed", async function (req, res) {
  const updatedPayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatedPayload);
  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "invalid input",
    });
  }

  await todo.updateOne(
    { _id: updatedPayload.id },
    { $set: { completed: true } }
  );

  return res.json({
    msg: "todo updated",
  });
});
