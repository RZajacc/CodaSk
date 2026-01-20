import express, {type Router} from "express";
import {
    getAll,
    getQuestionById,
  // getQuestionByTagName,
  // getQuestionByTitle,
  // getQuestionsByUserId,
} from "../controller/questionController.js";

const router: Router = express.Router();

/**
 * @openapi
 * /api/questions:
 *   get:
 *     summary: Get all questions, including some basic filter options.
 *     tags:
 *       - Questions
 *     parameters:
 *      - in: query
 *        name: filter
 *        schema:
 *          type: string
 *        required: false
 *        description: Filter questions by populartiy (Popular), unanswered first (Unanswered), Oldest, Solved.
 *     responses:
 *       200:
 *         description: List of all questions
 *       404:
 *          description: No questions found
 *       500:
 *          description: Internal server error
 */
router.get("/", getAll);

/**
 * @openapi
 * /api/questions/{_id}:
 *   get:
 *     summary: Get question by its id.
 *     tags:
 *       - Questions
 *     parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *        description: Get one question by its id.
 *     responses:
 *       200:
 *         description: Requested question object
 *       404:
 *          description: No question found with this id
 *       500:
 *          description: Internal server error
 */
router.get("/:_id", getQuestionById);


// router.get("/userId/:_id", getQuestionsByUserId);
// router.get("/tagname/:name", getQuestionByTagName);
// router.get("/questionbytitle/:title", getQuestionByTitle);

export default router;
