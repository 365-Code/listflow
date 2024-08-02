import express from "express";
import { verifyToken } from "../middleware/auth.js";
import userModel from "../models/userModel.js";

const route = express.Router();

route.get("/", verifyToken, async (req, res) => {
  try {
    const labels = await userModel.findById(req.id).select("labels");

    return res.status(200).send({
      success: true,
      labels: labels.labels,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "Internal Servel Error",
    });
  }
});

route.post("/", verifyToken, async (req, res) => {
  try {
    const body = await req.body;

    if (!body) {
      return res.status(404).send({
        success: false,
        msg: "Enter a valid label",
      });
    }

    const label = body.label.toLowerCase();
    const dupLabel = await userModel.findOne({
      _id: req.id,
      labels: {
        $in: [label],
      },
    });

    if (dupLabel) {
      return res.status(404).send({
        success: false,
        msg: "Cannot create duplicate label",
      });
    }
    const newLabel = await userModel.findByIdAndUpdate(req.id, {
      $push: {
        labels: label,
      },
    });

    return res.status(200).send({
      success: true,
      label: newLabel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
});

route.put("/", verifyToken, async (req, res) => {
  try {
    const body = await req.body;
    const labelId = decodeURIComponent(req.query.labelId).toLowerCase();
    if (!body || !labelId) {
      return res.status(404).send({
        success: false,
        msg: "Enter a valid label",
      });
    }

    const newLabel = body.newLabel.toLowerCase();
    const existLabel = await userModel.findOne({
      _id: req.id,
      labels: {
        $in: [labelId],
      },
    });

    if (!existLabel) {
      return res.status(404).send({
        success: false,
        msg: "label not found",
      });
    }

    const dupLabel = await userModel.findOne({
      _id: req.id,
      labels: {
        $in: [newLabel],
      },
    });

    if (dupLabel) {
      return res.status(404).send({
        success: false,
        msg: "cannot create duplicate labels",
      });
    }

    const updLabel = await userModel.updateOne(
      { _id: req.id, labels: labelId },
      { $set: { "labels.$": newLabel } }
    );

    if (!updLabel) {
      res.status(500).send({
        success: false,
        msg: "Error updating label",
      });
    }

    return res.status(200).send({
      success: true,
      label: updLabel,
      msg: "label updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
});

route.delete("/", verifyToken, async (req, res) => {
  try {
    const labelId = decodeURIComponent(req.query.labelId).toLowerCase();
    if (!labelId) {
      return res.status(404).send({
        success: false,
        msg: "Enter a valid label",
      });
    }

    const existLabel = await userModel.findOne({
      _id: req.id,
      labels: {
        $in: [labelId],
      },
    });

    if (!existLabel) {
      return res.status(404).send({
        success: false,
        msg: "label not found",
      });
    }

    const dltLabel = await userModel.updateOne(
      { _id: req.id },
      { $pull: { labels: labelId } }
    );

    if (!dltLabel) {
      res.status(500).send({
        success: false,
        msg: "error deleting label",
      });
    }

    return res.status(200).send({
      success: true,
      label: dltLabel,
      msg: "label deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "Internal Server Error",
    });
  }
});

export default route;
