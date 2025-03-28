import React from 'react';
import parse from 'html-react-parser';

type Props = {
  problem: {
    type: string;
    data: string;
  };
  idx: number;
};

function ProblemDescription({problem, idx}: Props) {
  return (
    <div
      className={
        problem.type === 'text'
          ? ''
          : 'my-3 rounded-xl bg-black px-3 py-1 text-white'
      }
      key={idx}
    >
      {parse(problem.data)}
    </div>
  );
}

export default ProblemDescription;
