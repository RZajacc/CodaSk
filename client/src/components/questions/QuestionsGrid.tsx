import QuestionCard from './QuestionCard';
import LoadingScreen from '../Ui/LoadingScreen.tsx';
import NoQuestionsFound from './NoQuestionsFound';
import type {QuestionByQuery} from '../../types/QuestionTypes.ts';

type Props = {
  questionsData: QuestionByQuery[];
  dataCount: number;
  loading: boolean;
};

function QuestionsGrid({questionsData, dataCount, loading}: Props) {
  return (
    <div className="mt-4 grid gap-4">
      {/* Loading and empty array states */}
      {loading && <LoadingScreen />}
      {!loading && dataCount === 0 && <NoQuestionsFound />}

      {/* Display all questions */}
      {questionsData &&
        questionsData.map((questionObj) => {
          return (
            <QuestionCard key={questionObj._id} questionObj={questionObj} />
          );
        })}
    </div>
  );
}

export default QuestionsGrid;
