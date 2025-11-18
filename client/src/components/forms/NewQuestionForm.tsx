import React, {ChangeEvent} from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {quillFormats, quillModules} from '@/types/quillTypes';
import {AllTagsQuery, Tag, questionInput} from '@/types/askQuestionTypes';

const QuillEditor = dynamic(() => import('react-quill'), {ssr: false});

type Props = {
  tagData: AllTagsQuery | undefined;
  questionInput: questionInput;
  setQuestionInput: ({}: questionInput) => void;
  setFilteredTags: ([{}]: Tag[]) => void;
  postQuestion: (e: React.FormEvent<HTMLFormElement>) => void;
  errorArr: String[];
  postQCalled: boolean;
};

function NewQuestionForm({
  tagData,
  questionInput,
  setQuestionInput,
  setFilteredTags,
  postQuestion,
  errorArr,
  postQCalled,
}: Props) {
  // --------Collecting user inputs-------------------
  const getUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setQuestionInput({...questionInput, [e.target.name]: e.target.value});
  };

  // Quill editor data
  const handleProblemDescription = (newContent: string) => {
    setQuestionInput({...questionInput, ['problem_description']: newContent});
  };

  const handleTriedSolutions = (newContent: string) => {
    setQuestionInput({...questionInput, ['solution_tried']: newContent});
  };

  const handleCourseType = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterVal = e.target.value;
    const filterData =
      tagData &&
      tagData.getAllTags.filter((tag) => {
        return tag.course_type === filterVal;
      });
    setQuestionInput({...questionInput, ['course_type']: e.target.value});
    setFilteredTags(
      filterData ? filterData : [{id: '', name: '', course_type: ''}]
    );
  };

  return (
    <form
      onSubmit={postQuestion}
      className="mx-auto mt-10 grid justify-center gap-6 p-2 sm:p-5"
    >
      <h1 className="text-3xl text-[#6741D9]">Ask a question</h1>
      <h3 className="text-xl text-[#6741D9]">
        Short description on guidelines to ask a good question
      </h3>

      {/* Question Title */}
      <input
        type="text"
        name="title"
        placeholder="*What is your question"
        className={
          postQCalled
            ? questionInput.title == ''
              ? 'title_err'
              : 'title_ok'
            : 'title_base'
        }
        onChange={getUserInput}
      />

      {/* Problem description */}
      <div
        className={
          postQCalled
            ? questionInput.problem_description === '' ||
              questionInput.problem_description === '<p><br></p>'
              ? 'quill_err'
              : 'quill_ok'
            : 'quill_base'
        }
      >
        <QuillEditor
          value={questionInput.problem_description}
          placeholder="*Describe your problem in details..."
          onChange={handleProblemDescription}
          modules={quillModules}
          formats={quillFormats}
        />
      </div>

      {/* Solutions tried */}
      <div
        className={
          postQCalled
            ? questionInput.solution_tried === '' ||
              questionInput.solution_tried === '<p><br></p>'
              ? 'quill_err'
              : 'quill_ok'
            : 'quill_base'
        }
      >
        <QuillEditor
          value={questionInput.solution_tried}
          placeholder="*What solution(s) did you try?"
          onChange={handleTriedSolutions}
          modules={quillModules}
          formats={quillFormats}
        />
      </div>

      {/* Course type and module */}
      <div className="grid grid-cols-2 gap-4 ">
        <select
          name="course_type"
          id="course_type"
          onChange={handleCourseType}
          className={
            postQCalled
              ? questionInput.course_type == 'none'
                ? 'coursetype_err'
                : 'coursetype_ok'
              : 'coursetype_base'
          }
        >
          <option value="none">*Course type</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Analytics">Data Science</option>
        </select>
        <select
          name="module"
          id="module"
          className="rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
          onChange={getUserInput}
        >
          <option value="none">Select Module</option>
          <option value="MODULE 1">Module 1</option>
          <option value="MODULE 2">Module 2</option>
          <option value="MODULE 3">Module 3</option>
        </select>
      </div>

      {/* GitHub Repo */}
      <input
        type="text"
        placeholder="Link your github repo"
        className="ml-1 block rounded-lg bg-[#EDE9E6] p-1 text-[#6741D9] shadow-custom"
        name="github_repo"
        onChange={getUserInput}
      />
      {/* Validation errors */}
      {errorArr &&
        errorArr.map((err, idx) => {
          return (
            <p className="p-1 font-medium text-red-500" key={idx}>
              {err}
            </p>
          );
        })}
      <h3 className="text-xl text-[#6741D9]">* - Required fields</h3>

      {/* Submit and Cancel button */}
      <div className="flex justify-end">
        <button className="mx-1 my-1 rounded-xl bg-black px-3 py-[0.10rem] text-white">
          cancel
        </button>
        <input
          type="submit"
          value={'Submit'}
          className="mx-1 my-1 cursor-pointer rounded-xl bg-black px-3 py-[0.10rem] text-white"
        />
      </div>
    </form>
  );
}

export default NewQuestionForm;
