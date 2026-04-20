import {useState} from 'react';
import NewQuestionForm from '../../../../components/forms/NewQuestionForm';
import AssignTags from '../../../../components/questions/AssignTags';
import type {
  AllTagsQuery,
  Tag,
  addQuestionDataType,
  questionInput,
} from '../../../../types/askQuestionTypes';
import {validateInputs} from '../../../../utils/QuestionValidator';

function AskQuestion() {
  // Initialize user question object
  const [questionInput, setQuestionInput] = useState<questionInput>({
    title: '',
    problem_description: '',
    solution_tried: '',
    github_repo: '',
    module: '',
    course_type: 'none',
  });

  // Check if postQuestion was called (important for inputs styling)
  const [postQCalled, setPostQCalled] = useState(false);

  // Input validation errors
  const [errorArr, setErrorArr] = useState<string[]>([]);

  // Filter tags by user selection
  const [filteredTags, setFilteredTags] = useState<Tag[]>([
    {id: '', name: '', course_type: ''},
  ]);

  // List of tags selected by a user
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // // ! TEMPORARY ID
  // const userID = '656b4777d89e223b1e928c33';

  // Post a new question if no errors in form
  const postQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Inform app that function was attempted to use
    setPostQCalled(true);
    // const errArr = validateInputs(questionInput);

    // if (errArr.length !== 0) {
    //   setErrorArr(errArr);
    // } else {
    //   addQuestion({
    //     variables: {
    //       newQuestion: {
    //         title: questionInput.title,
    //         author: userID,
    //         problem_description: questionInput.problem_description,
    //         solution_tried: questionInput.solution_tried,
    //         posted_on: Date.now(),
    //         github_repo: questionInput.github_repo,
    //         tags: selectedTags,
    //         answers: [],
    //         saved_by: [],
    //         module: questionInput.module,
    //       },
    //     },
    //   });
    // }
  };

  // Reduce array of objects to array of strings with their id
  const selectedTagId = selectedTags.map((tag) => {
    return tag.id;
  });

  const handleTagUpdate = () => {
    // updateTag({
    //   variables: {
    //     updateTagsId: selectedTagId,
    //     editInput: {
    //       id: addQuestionData ? addQuestionData.addQuestion.id : undefined,
    //     },
    //   },
    // });
    // updateQuestion({
    //   variables: {
    //     updateQuestionId: addQuestionData
    //       ? addQuestionData.addQuestion.id
    //       : undefined,
    //     editInput: {
    //       tags: selectedTagId,
    //     },
    //   },
    // });
  };
  // console.log(questionInput);

  return (
    <div className="h-full min-h-screen">
      <h1>Ask a question page</h1>
      {/*{!addQuestionCalled ? (*/}
      {/*  <NewQuestionForm*/}
      {/*    tagData={tagData ? tagData : undefined}*/}
      {/*    questionInput={questionInput}*/}
      {/*    setQuestionInput={setQuestionInput}*/}
      {/*    setFilteredTags={setFilteredTags}*/}
      {/*    postQuestion={postQuestion}*/}
      {/*    errorArr={errorArr}*/}
      {/*    postQCalled={postQCalled}*/}
      {/*  />*/}
      {/*) : !addQuestionErr ? (*/}
      {/*  <AssignTags*/}
      {/*    filteredTags={filteredTags}*/}
      {/*    selectedTags={selectedTags}*/}
      {/*    setSelectedTags={setSelectedTags}*/}
      {/*    handleTagUpdate={handleTagUpdate}*/}
      {/*    updateQuestionCalled={updateQuestionCalled}*/}
      {/*    updateTagCalled={updateTagCalled}*/}
      {/*    UpdateQuestionErr={UpdateQuestionErr}*/}
      {/*    updateTagError={updateTagError}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <div className="container mx-auto mb-6 mt-10 w-8/12 text-center">*/}
      {/*      <p className="text-3xl text-red-600">{addQuestionErr.message}</p>*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
}

export default AskQuestion;
