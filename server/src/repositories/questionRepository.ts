import QuestionModel from "../models/questionModel.js";
import userModel from "../models/userModel.js";
import answerModel from "../models/answerModel.js";
import tagModel from "../models/tagModel.js";
import questionModel from "../models/questionModel.js";
import QuestionService from "../services/questionService.js";

class QuestionRepository {

    // Fields to populate
    private readonly populateFields = [
        {
            path: "author",
            select: [
                "user_photo",
                "first_name"
            ]
        },
        {
            path: "answers",
            select: "message votes posted_on author",
            populate: {
                path: "author",
                select: "user_photo first_name"
            }
        },
        {
            path: "tags",
            select: [
                "name"
            ]
        }]


    async findAll(filter: string) {


        // Filter data based on the filter parameter
        if (filter === "All") {
            try {
                return await QuestionModel.find().populate(this.populateFields);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`Error fetching questions: ${errorMessage}`)
            }
        } else if (filter === "Popular") {
            try {
                const aggData = await QuestionModel.aggregate([
                    {
                        $addFields: {
                            answersCount: {$size: "$answers"}
                        }
                    },
                    {
                        $sort: {answersCount: -1}
                    }
                ])
                return await QuestionModel.populate(aggData, this.populateFields);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`Error fetching questions: ${errorMessage}`)
            }
        } else if (filter === "Unanswered") {
            try {
                const aggData = await QuestionModel.aggregate([
                    {
                        $addFields: {
                            answersCount: {$size: "$answers"}
                        }
                    },
                    {
                        $sort: {answersCount: 1}
                    }
                ])
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`Error fetching questions: ${errorMessage}`)
            }
        } else if (filter === "Oldest") {
            try {
                return await QuestionModel.findByDate().populate(this.populateFields);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`Error fetching questions: ${errorMessage}`)
            }
        } else if (filter === "Solved") {
            try {
                return await QuestionModel.find().sort({status: 1})
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                throw new Error(`Error fetching questions: ${errorMessage}`)
            }
        }
    }

    async findById(id: string) {
        try {
            return await QuestionModel.findById(id).populate(this.populateFields);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error fetching selected question: ${errorMessage}`)
        }
    }
}

export default new QuestionRepository();