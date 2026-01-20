import type {RequestHandler} from "express";
import questionService from "../services/questionService.js";
import questionModel from "../models/questionModel.js";


const getAll: RequestHandler = async (req, res) => {
  const filter = req.query.filter as string | undefined;
  try {
    const questions = await questionService.getAllQuestions(filter ? filter : "All");

    if(!questions) {
      return res.status(404).json({
        fail: true,
        error: "No questions found"
      })
    }

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
};

const getQuestionById: RequestHandler<{_id: string}> = async (req, res) => {
  const { _id } = req.params;

    try {
      const question = await questionService.getQuestionById(_id);

      if(!question) {
        return res.status(404).json({
          fail: true,
          error: "No question found with this id"
        })
      }

      return res.status(200).json({
        success: true,
        count: 1,
        data: question
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        success: false,
        error: errorMessage
      })
    }
};


// const getQuestionByTitle: RequestHandler = async (req, res) => {
//   const { title } = req.params;
//   console.log("title :>> ", title);
//
//   if (title) {
//     try {
//       // const questionByTitle = await questionModel.find({ title: title });
//
//       const agg = [
//         //Stages
//         //stage 1: search
//         {
//           $search: {
//             autocomplete: {
//               query: title,
//               path: "title",
//               fuzzy: {
//                 maxEdits: 2,
//               },
//             },
//           },
//         },
//         //stage 2: results limit
//         {
//           $limit: 5,
//         },
//         //stage 3: fields to import
//         {
//           $project: {
//             _id: 1,
//             author: 1,
//             posted_on: 1,
//             title: 1,
//             problem_description: 1,
//             solution_tried: 1,
//             module: 1,
//             github_repo: 1,
//             tags: 1,
//             answers: 1,
//             saved_by: 1,
//             status: 1,
//           },
//         },
//       ];
//
//       const questionByTitle = await questionModel.aggregate(agg);
//
//       res.status(200).json({
//         number: questionByTitle.length,
//         data: questionByTitle,
//       });
//     } catch (error) {
//       console.log("error :>> ", error);
//       res.status(400).json({
//         response: null,
//         error: "something went wrong in your search request",
//       });
//     }
//   }
//
//   if (!title) {
//     res.status(400).json({
//       response: null,
//       error: "You need to eneter a question title",
//     });
//   }
// };

// const getQuestionsByUserId: RequestHandler = async (req, res) => {};
//
// const getQuestionByTagName: RequestHandler = async (req, res) => {};

export {
  getAll,
  getQuestionById,
  // getQuestionsByUserId,
  // getQuestionByTagName,
  // getQuestionByTitle,
};
