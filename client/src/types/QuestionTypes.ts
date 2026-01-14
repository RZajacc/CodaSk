type Question = {
  _id: string;
  answers: string[];
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
