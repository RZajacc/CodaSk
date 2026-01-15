import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  posted_on: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  problem_description: {
    type: String,
    required: true,
  },
  solution_tried: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: false,
  },
  github_repo: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "unanswered",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answer",
    },
  ],
  saved_by: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
}, {
  statics: {
    findByDate() {
      // return this.find().sort({ $expr: {$size: "$answers"} }, -1);
    return this.find().sort({posted_on: 1});
    }
  }
});

const questionModel = mongoose.model("question", questionSchema);

export default questionModel;
