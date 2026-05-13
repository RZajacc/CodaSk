import type {Question} from '../types/QuestionTypes.ts';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const questionService = {
  getAllQuestions: async (sortBy: string): Promise<Question[]> => {
    const response = await fetch(
      API_BASE_URL + `/question/search?filter=${sortBy}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Unable to fetch questions');
    }

    return response.json();
  },

  getQuestionById: async (id: string | undefined): Promise<Question | null> => {
    const response = await fetch(API_BASE_URL + `/question/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Unable to fetch selected question');
    }

    return response.json();
  },
};
