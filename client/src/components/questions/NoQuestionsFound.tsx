import {Link} from 'react-router';

function NoQuestionsFound() {
  return (
    <div className="text-center">
      <p className="my-14 font-medium text-[#6741D9] md:text-3xl">
        No questions match that search.
      </p>
      <Link
        className="rounded-full font-normal no-underline hover:bg-[#B197FC] hover:p-2 hover:text-white"
        to={'/search/questions/askQuestion'}
      >
        Be the first to ask one!
      </Link>
    </div>
  );
}

export default NoQuestionsFound;
