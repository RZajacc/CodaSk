export type UserType = {
  id: string;
  first_name: string;
  user_photo: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Answer = {
  id: string;
  posted_on: string;
  message: string;
  votes: [{id: string}];
  author: {
    id: string;
    first_name: string;
    user_photo: string;
  };
};

export type QuestionType = {
  id: string;
  author: UserType;
  github_repo: string;
  module: string;
  posted_on: string;
  status: string;
  problem_description: string;
  solution_tried: string;
  title: string;
  tags: Tag[];
  answers: Answer[];
};

export type questionDetailsType = {
  getQuestionById: QuestionType;
};

// QUESTION QUERIES TYPES
export type questionQuery = {
  getAllQuestions: [
    {
      id: string;
      author: {
        id: string;
        first_name: string;
        user_photo: string;
      };
      posted_on: Date | string;
      title: string;
      problem_description: string;
      solution_tried: string;
      module: string;
      tags: [
        {
          id: string;
          name: string;
        },
      ];
      answers: [
        {
          id: string;
        },
      ];
      saved_by: [
        {
          first_name: string;
        },
      ];
      status: string;
    },
  ];
};
