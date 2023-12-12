import {Tag} from '@/types/askQuestionTypes';
import Link from 'next/link';
import React, {ChangeEvent} from 'react';
import {c} from 'vitest/dist/reporters-5f784f42.js';

type Props = {
  filteredTags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (data: Tag[]) => void;
  handleTagUpdate: () => void;
  updateQuestionCalled: () => boolean;
  updateTagCalled: boolean;
  UpdateQuestionErr: {
    message: string;
  };
  updateTagError: {
    message: string;
  };
};

function AssignTags({
  filteredTags,
  selectedTags,
  setSelectedTags,
  handleTagUpdate,
  updateQuestionCalled,
  updateTagCalled,
  UpdateQuestionErr,
  updateTagError,
}: Props) {
  const handleTagSelection = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const selectedTag = filteredTags.find(({id}) => id === e.target.value);
      const tempArr = [...selectedTags];
      tempArr.push(selectedTag!);
      setSelectedTags(tempArr);
    } else {
      const tempArr = [...selectedTags];
      const unselectedTagIndex = tempArr.findIndex(
        ({id}) => id === e.target.value
      );
      tempArr.splice(unselectedTagIndex, 1);
      setSelectedTags(tempArr);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-10 w-8/12">
        {!updateQuestionCalled && !updateTagCalled ? (
          <>
            {/* Header text */}
            <div className="mb-6 ">
              <h1 className="text-3xl text-[#6741D9]">Almost there!</h1>
              <h3 className="text-xl text-[#6741D9]">
                To make it easier for others to find your question please select
                few tags:
              </h3>
            </div>
            {/* Tags checkboxes */}
            <div className="mb-6 flex  flex-wrap">
              {filteredTags &&
                filteredTags.map((tag) => {
                  return (
                    <>
                      <div className="m-1 w-44 rounded-lg border-2 border-[#6741D9] bg-[#EDE9E6] p-1 text-[#6741D9]">
                        <input
                          type="checkbox"
                          id={tag.name}
                          name={tag.name}
                          value={tag.id}
                          onChange={handleTagSelection}
                        />
                        <label htmlFor="html" className="p-1">
                          {tag.name}
                        </label>
                      </div>
                    </>
                  );
                })}
            </div>
            <div className="mb-6">
              {selectedTags.length != 0 ? (
                <h3 className="text-xl text-[#6741D9]">Selected tags list:</h3>
              ) : (
                <h3 className="text-xl text-[#6741D9]">
                  No tags selected so far!
                </h3>
              )}

              <ul className="ml-6 list-disc">
                {selectedTags &&
                  selectedTags.map((tag) => {
                    return (
                      <>
                        <li>{tag.name}</li>
                      </>
                    );
                  })}
              </ul>
            </div>
            <div className="mb-6 mr-60 flex justify-end">
              <button
                className="mx-1 my-1 block rounded-xl bg-black px-3 py-[0.10rem] text-white"
                onClick={handleTagUpdate}
              >
                Add tags
              </button>
            </div>
          </>
        ) : !UpdateQuestionErr && !updateTagError ? (
          <>
            {/* ---------STYLING HERE--------------- */}
            <p>Congratulations, everything went well!</p>
            <Link
              href={'/search/question'}
              className="mx-1 hover:font-semibold focus:font-semibold"
            >
              Take me to all questions
            </Link>
          </>
        ) : (
          <>
            <p>{UpdateQuestionErr.message}</p>
            <p>{updateTagError.message}</p>
          </>
        )}
      </div>
    </>
  );
}

export default AssignTags;
