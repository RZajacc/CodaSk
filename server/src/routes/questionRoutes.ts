import express, {type Router} from "express";
import {
    getAll,
    getQuestionById,
  // getQuestionByTagName,
  // getQuestionByTitle,
  // getQuestionsByUserId,
} from "../controller/questionController.js";

const router: Router = express.Router();

//GET routes
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

router.get("/:_id", getQuestionById);


// router.get("/userId/:_id", getQuestionsByUserId);
// router.get("/tagname/:name", getQuestionByTagName);
// router.get("/questionbytitle/:title", getQuestionByTitle);

export default router;
