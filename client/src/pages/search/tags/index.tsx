import TagsGrid from '../../../components/tags/TagsGrid';
import {SortByOptions} from '../../../components/questions/SortByOptions';
import {useEffect, useState} from 'react';
import {Link} from 'react-router';

/// QUERIES ///
export type tagQuery = {
  course_type: string;
  description: string;
  _id: string;
  name: string;
  related_questions: {
    id: string;
  }[];
};

export default function Tags() {
  const filteredTags = {};
  const [sortBy, setSortBy] = useState('All');

  const [tagData, setTagData] = useState<tagQuery[]>();

  useEffect(() => {
    fetch('http://localhost:5000/tag')
      .then((res) => res.json())
      .then((data) => {
        console.log('DATA :>> ', data);
        setTagData(data);
      });
  }, [sortBy]);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  return (
    <div className="p-2">
      {/* TOP SECTION */}
      <div className="grid justify-center px-6 sm:flex sm:justify-between">
        <h1 className="mt-4 text-left text-2xl font-medium text-[#6741D9] md:text-3xl">
          {/*Search among {filteredTags?.getAllTags.length} tags*/}
          Search among {5} tags
        </h1>

        <Link
          className="my-2 rounded-full bg-black px-4 py-2 text-center font-bold text-white no-underline hover:bg-[#B197FC]"
          to={'/search/questions/askQuestion'}
        >
          Ask a question
        </Link>
      </div>
      {/* SEARCH BAR */}
      <div className="grid justify-center gap-2 border-b-2 border-b-[#D9D9D9] px-6 sm:justify-start">
        {/* <input
          type="search"
          id="default-search"
          className="placeholder:text-gray-black w-72 rounded-3xl border bg-[#EDE9E6] p-2 text-sm text-gray-900  placeholder:text-base placeholder:font-extralight md:justify-self-center "
          placeholder="search for keywords, tags, questions..."
          required
          onChange={handleSearchInput}
          value={searchInput}
        /> */}
        <h2 className="text-center font-medium text-[#6741D9] sm:text-start md:text-2xl">
          Search options:
        </h2>
        <SortByOptions
          title="Course:"
          handleSortChange={handleSortChange}
          options={['All', 'Web Development', 'Data Analytics']}
          // width="w-full"
        />

        <SortByOptions
          title="Sort by:"
          handleSortChange={handleSortChange}
          options={['All', 'Popular', 'Oldest', 'Unanswered', 'Solved']}
          width="w-full"
          margin="mb-4"
        />
      </div>
      {/* TAGS GRID */}
      <div className="mx-8">
        <TagsGrid
          data={tagData}
          // bookmarkTag={bookmarkTag}
          // unbookmarkTag={unbookmarkTag}
          // userData={userData}
          // loading={loading}
          // searchInput={searchInput}
          // setSearchInput={setSearchInput}
        />
      </div>
    </div>
  );
}
