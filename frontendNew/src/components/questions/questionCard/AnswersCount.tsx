import React from 'react';
import {FaCheckCircle} from 'react-icons/fa';

type Props = {
  status: string;
  count: number;
};

function AnswersCount({status, count}: Props) {
  return (
    <section className="answers mb-3 flex items-center gap-1 px-3">
      {status === 'Solved' && <FaCheckCircle color="#088F8F" />}
      {count === 1 ? (
        <>
          <span className="font-bold"> {count}</span> answer
        </>
      ) : (
        <>
          <span className="font-bold">{count}</span>
          answers
        </>
      )}
    </section>
  );
}

export default AnswersCount;
