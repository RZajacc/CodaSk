import questionRepository from "../repositories/questionRepository.js";

class QuestionService {

    async getAllQuestions(filter: string) {
        return await questionRepository.findAll(filter);
    }

    async getQuestionById(id: string) {
        return await questionRepository.findById(id);
    }

}

export default new QuestionService();