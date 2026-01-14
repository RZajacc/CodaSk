import QuestionModel from "../models/questionModel.js";
import userModel from "../models/userModel.js";
import answerModel from "../models/answerModel.js";
import tagModel from "../models/tagModel.js";

class QuestionRepository {

    async findAll() {
        try {
            return await QuestionModel.find().populate([
                {
                    path: "author",
                    select: [
                        "user_photo",
                        "first_name"
                    ]
                },
                {
                    path: "tags",
                    select: [
                        "name"
                    ]
                }
            ]);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error fetching questions: ${errorMessage}`)
        }
    }
}

export default new QuestionRepository();