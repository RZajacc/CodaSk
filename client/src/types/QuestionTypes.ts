type Question = {
  _id: string;
  answers: {
    _id: string;
    posted_on: string;
    message: string;
    author: {_id: string; first_name: string; user_photo: string};
    votes: string[];
  }[];
  author: {
    _id: string;
    first_name: string;
    user_photo: string;
  };
  github_repo: string;
  module: string;
  posted_on: string;
  problem_description: string;
  solved_by: string[];
  solution_tried: string;
  status: string;
  tags: {_id: string; name: string}[];
  title: string;
};
