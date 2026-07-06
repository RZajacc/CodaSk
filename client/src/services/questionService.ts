import type {QuestionByQuery, QuestionById} from '../types/QuestionTypes.ts';
import {fetchWithAuthAndRefresh} from './fetchUtils.ts';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const questionService = {
  getAllQuestionsByQuery: async (
    sortBy: string
  ): Promise<QuestionByQuery[]> => {
    const response = await fetch(
      API_BASE_URL + `/question/findByQuery?filter=${sortBy}`,
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

  getQuestionById: async (
    id: string | undefined
  ): Promise<QuestionById | null> => {
    return fetchWithAuthAndRefresh<QuestionById | null>(
      API_BASE_URL + `/question/${id}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    // const response = await fetch(API_BASE_URL + `/question/${id}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    //
    // if (!response.ok) {
    //   throw new Error('Unable to fetch selected question');
    // }
    //
    // return response.json();
  },
};
