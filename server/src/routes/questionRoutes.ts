import express, {type Router} from "express";
import {
  // getAllQuestions,
    getAll,
  getQuestionByTagName,
  getQuestionByTitle,
  getQuestionsById,
  getQuestionsByUserId,
} from "../controller/questionController.js";

const router: Router = express.Router();

//GET routes
router.get("/all", getAll);
router.get("/id/:_id", getQuestionsById);
router.get("/userId/:_id", getQuestionsByUserId);
router.get("/tagname/:name", getQuestionByTagName);
router.get("/questionbytitle/:title", getQuestionByTitle);

export default router;
