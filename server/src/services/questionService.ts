import questionRepository from "../repositories/questionRepository.js";

class QuestionService {

    async getAllQuestions(filter: string) {
        return await questionRepository.findAll(filter);
    }

}

export default new QuestionService();