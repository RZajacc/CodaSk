import questionModel from "../models/questionModel.js";
import userModel from "../models/userModel.js";
import answerModel from "../models/answerModel.js";
import tagModel from "../models/tagModel.js";

import type {RequestHandler} from "express";
import questionService from "../services/questionService.js";


const getAll: RequestHandler = async (req, res) => {

  try {
    const questions = await questionService.getAllQuestions();
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      success: false,
      error: errorMessage
    })
  }
  // const allQuestions = await questionModel.find().populate([{path: "author"}]).limit(1);
};

// const getAllQuestions: RequestHandler = async (req, res) => {
//   const allQuestions = await questionModel.find().populate([
//     {
//       path: "author",
//       select: [
//         "first_name",
//         "last_name",
//         "bio",
//         "member_since",
//         "user_photo",
//         "course_type",
//       ],
//     },
//     {
//       path: "answers",
//       select: ["author", "message", "votes", "posted_on"],
//       populate: [
//         {
//           path: "author",
//           select: [
//             "first_name",
//             "last_name",
//             "member_since",
//             "user_photo",
//             "course_type",
//           ],
//         },
//         {
//           path: "votes",
//           select: ["first_name"],
//         },
//       ],
//     },
//     {
//       path: "saved_by",
//       select: ["first_name"],
//     },
//     {
//       path: "tags",
//       select: ["first_name"],
//     },
//   ]);
//
//   res.json({
//     number: allQuestions.length,
//     data: allQuestions,
//   });
// };

const getQuestionByTitle: RequestHandler = async (req, res) => {
  const { title } = req.params;
  console.log("title :>> ", title);

  if (title) {
    try {
      // const questionByTitle = await questionModel.find({ title: title });

      const agg = [
        //Stages
        //stage 1: search
        {
          $search: {
            autocomplete: {
              query: title,
              path: "title",
              fuzzy: {
                maxEdits: 2,
              },
            },
          },
        },
        //stage 2: results limit
        {
          $limit: 5,
        },
        //stage 3: fields to import
        {
          $project: {
            _id: 1,
            author: 1,
            posted_on: 1,
            title: 1,
            problem_description: 1,
            solution_tried: 1,
            module: 1,
            github_repo: 1,
            tags: 1,
            answers: 1,
            saved_by: 1,
            status: 1,
          },
        },
      ];

      const questionByTitle = await questionModel.aggregate(agg);

      res.status(200).json({
        number: questionByTitle.length,
        data: questionByTitle,
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(400).json({
        response: null,
        error: "something went wrong in your search request",
      });
    }
  }

  if (!title) {
    res.status(400).json({
      response: null,
      error: "You need to eneter a question title",
    });
  }
};

const getQuestionsById: RequestHandler = async (req, res) => {};

const getQuestionsByUserId: RequestHandler = async (req, res) => {};

const getQuestionByTagName: RequestHandler = async (req, res) => {};

export {
  getAll,
  // getAllQuestions,
  getQuestionsByUserId,
  getQuestionsById,
  getQuestionByTagName,
  getQuestionByTitle,
};
