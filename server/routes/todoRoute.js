import express from "express";
import { verifyToken } from "../middleware/auth.js";
import todoModel from "../models/todoModel.js";
import userModel from "../models/userModel.js";

const route = express.Router();

route.post("/", verifyToken, async (req, res) => {
  try {
    const body = await req.body;
    const user = await userModel.findById(req.id);

    if (!user) {
      return res.status(403).send({
        msg: "UnAuthorized Access",
        success: false,
      });
    }

    const { content, label } = body;
    console.log(body);
    if (!content || !label) {
      return res.status(404).send({
        msg: "Enter valid content or label",
        success: false,
      });
    }

    const newTodo = await todoModel.create({
      content,
      label,
      userId: user.id,
    });

    return res.status(200).send({
      success: true,
      todo: newTodo,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

route.get("/", verifyToken, async (req, res) => {
  try {
    const todos = await todoModel.find({
      userId: req.id,
    });

    return res.send({
      success: true,
      todos,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

route.get("/:id", verifyToken, async (req, res) => {
  try {
    const todos = await todoModel.find({
      label: req.params.id.toLowerCase(),
    });

    return res.send({
      success: true,
      todos,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

route.put("/", verifyToken, async (req, res) => {
  try {
    const body = await req.body;
    const todoId = req.query.todoId;

    const { status, content, label } = body;

    if (!todoId || (!content && !label && !status)) {
      return res.status(404).send({
        msg: "Enter valid content or label",
        success: false,
      });
    }

    const todo = await todoModel.findById(todoId);
    if (!todo) {
      return res.status(404).send({
        msg: "Error 404, node not found",
        success: false,
      });
    }

    const updTodo = await todoModel.findByIdAndUpdate(todoId, body);

    return res.status(200).send({
      success: true,
      todo: updTodo,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});

route.delete("/", verifyToken, async (req, res) => {
  try {
    const todoId = req.query.todoId;
    if (!todoId) {
      return res.status(403).send({
        msg: "Invalid id",
        success: false,
      });
    }

    const todo = await todoModel.findById(todoId);

    if (!todo) {
      return res.send({
        msg: "Error 404, node not found",
        success: false,
      });
    }

    const updTodo = await todoModel.findByIdAndDelete(todoId);

    return res.status(200).send({
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
});


export default route;
