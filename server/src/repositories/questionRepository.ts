import QuestionModel from "../models/questionModel.js";

class QuestionRepository {

    async findAll() {
        try {
            return await QuestionModel.find();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Error fetching questions: ${errorMessage}`)
        }
    }
}

export default new QuestionRepository();