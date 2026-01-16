import questionModel from "../models/questionModel.js";
import answerModel from "../models/answerModel.js";
import type {RequestHandler} from "express";

const getAllAnswers: RequestHandler = async (req, res) => {
  const allAnswers = await answerModel.find().populate([
    {
      path: "author",
      select: [
        "first_name",
        "last_name",
        "member_since",
        "user_photo",
        "course_type",
      ],
    },
    {
      path: "question",
      select: ["author", "title", "posted_on"],
      populate: {
        path: "author",
        select: ["first_name", "last_name", "user_photo", "course_type"],
      },
    },
    {
      path: "votes",
      select: ["first_name"],
    },
  ]);

  res.json({
    number: allAnswers.length,
    data: allAnswers,
  });
};

const getAnswersByUserId: RequestHandler = async (req, res) => {};

const getAnswerById: RequestHandler = async (req, res) => {};

export { getAllAnswers, getAnswersByUserId, getAnswerById };
