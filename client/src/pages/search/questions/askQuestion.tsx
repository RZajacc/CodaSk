import {gql, useMutation, useQuery} from '@apollo/client';
import {RefObject, useRef, useState} from 'react';
import NewQuestionForm from './NewQuestionForm';
import AssignTags from './AssignTags';
import {
  AllTagsQuery,
  Tag,
  addQuestionDataType,
  questionInput,
} from '@/types/askQuestionTypes';
import {validateInputs} from '@/utils/questionValidator';

// --------QUERIES--------------
const GET_ALLTAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
      course_type
    }
  }
`;

// --------MUTATIONS-------------
const POST_NEWQUESTION = gql`
  mutation AddQuestion($newQuestion: newQuestionInput) {
    addQuestion(newQuestion: $newQuestion) {
      id
    }
  }
`;

const UPDATE_TAGS = gql`
  mutation UpdateTags($updateTagsId: [ID], $editInput: editTagInput) {
    updateTags(id: $updateTagsId, editInput: $editInput) {
      name
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation Mutation($updateQuestionId: ID, $editInput: editQuestionInput) {
    updateQuestion(id: $updateQuestionId, editInput: $editInput) {
      title
    }
  }
`;

function AskQuestion() {
  // Initialize user question object
  const [questionInput, setQuestionInput] = useState<questionInput>({
    title: '',
    problem_description: '',
    solutions_tried: '',
    github_repo: '',
    module: '',
    course_type: 'none',
  });

  // Input validation errors
  const [errorArr, setErrorArr] = useState<String[]>([]);

  // Filter tags by user selection
  const [filteredTags, setFilteredTags] = useState<Tag[]>([
    {id: '', name: '', course_type: ''},
  ]);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // --------Queries-------------
  const {data: tagData} = useQuery<AllTagsQuery>(GET_ALLTAGS);

  // --------Mutations-----------
  const [
    addQuestion,
    {data: addQuestionData, called: addQuestionCalled, error: addQuestionErr},
  ] = useMutation<addQuestionDataType>(POST_NEWQUESTION);

  const [updateTag, {called: updateTagCalled, error: updateTagError}] =
    useMutation(UPDATE_TAGS);

  const [
    updateQuestion,
    {called: updateQuestionCalled, error: UpdateQuestionErr},
  ] = useMutation(UPDATE_QUESTION);

  // ! TEMPORARY ID
  const userID = '656b4777d89e223b1e928c33';

  // References to fields that require validation
  const titleRef = useRef<HTMLInputElement>(null);
  const problemDescRef = useRef<HTMLSpanElement>(null);
  const solutionTriedRef = useRef<HTMLSpanElement>(null);
  const courseTypeRef = useRef<HTMLSelectElement>(null);

  const postQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errArr = validateInputs(
      questionInput,
      titleRef,
      problemDescRef,
      solutionTriedRef,
      courseTypeRef
    );

    if (errArr.length !== 0) {
      setErrorArr(errArr);
    } else {
      addQuestion({
        variables: {
          newQuestion: {
            title: questionInput.title,
            author: userID,
            problem_description: questionInput.problem_description,
            solution_tried: questionInput.solutions_tried,
            posted_on: Date.now(),
            github_repo: questionInput.github_repo,
            tags: selectedTags,
            answers: [],
            saved_by: [],
            module: questionInput.module,
          },
        },
      });
    }
  };

  const handleTagUpdate = () => {
    updateTag({
      variables: {
        updateTagsId: selectedTags,
        editInput: {
          id: addQuestionData ? addQuestionData.addQuestion.id : undefined,
        },
      },
    });
    updateQuestion({
      variables: {
        updateQuestionId: addQuestionData
          ? addQuestionData.addQuestion.id
          : undefined,
        editInput: {
          tags: selectedTags,
        },
      },
    });
  };

  return (
    <>
      {!addQuestionCalled ? (
        <NewQuestionForm
          tagData={tagData ? tagData : undefined}
          questionInput={questionInput}
          setQuestionInput={setQuestionInput}
          setFilteredTags={setFilteredTags}
          postQuestion={postQuestion}
          titleRef={titleRef}
          problemDescRef={problemDescRef}
          solutionTriedRef={solutionTriedRef}
          courseTypeRef={courseTypeRef}
          errorArr={errorArr}
        />
      ) : !addQuestionErr ? (
        <AssignTags
          filteredTags={filteredTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          handleTagUpdate={handleTagUpdate}
          updateQuestionCalled={updateQuestionCalled}
          updateTagCalled={updateTagCalled}
          UpdateQuestionErr={UpdateQuestionErr}
          updateTagError={updateTagError}
        />
      ) : (
        <>
          <div className="container mx-auto mb-6 mt-10 w-8/12 text-center">
            <p className="text-3xl text-red-600">{addQuestionErr.message}</p>
          </div>
        </>
      )}
    </>
  );
}

export default AskQuestion;
