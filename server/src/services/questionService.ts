import questionRepository from "../repositories/questionRepository.js";

class QuestionService {

    async getAllQuestions() {
        return await questionRepository.findAll();
    }

}

export default new QuestionService();