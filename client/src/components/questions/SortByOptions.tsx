import SortListOptionItem from './SortListOptionItem';
import SortOptionItem from './SortOptionItem';

type Props = {
  title: string;
  handleSortChange: (sortOption: string) => void;
  options: string[];
  width?: string;
  margin?: string;
};

export function SortByOptions({
  title,
  handleSortChange,
  options,
  width,
  margin,
}: Props) {
  const selectOptionItems = options.map((option) => (
    <SortOptionItem
      handleSortChange={handleSortChange}
      option={option}
      key={option}
    />
  ));

  const optionsCount = options.length;

  const selectListOptionItems = options.map((option, ind) => {
    if (ind < optionsCount - 1) {
      return (
        <SortListOptionItem
          handleSortChange={handleSortChange}
          option={option}
          separator={true}
          key={option}
        />
      );
    } else {
      return (
        <SortListOptionItem
          handleSortChange={handleSortChange}
          option={option}
          key={option}
        />
      );
    }
  });

  return (
    <div
      className={`${
        margin ?? ''
      } flex items-center justify-center gap-3 text-lg text-[#6741D9] sm:justify-start`}
    >
      <span className="whitespace-nowrap">{title}</span>
      {/* Sort options for small screens */}
      <select
        className={`${
          width ?? ''
        } rounded-full border-b-2 border-black p-2 text-center align-middle sm:hidden`}
      >
        {selectOptionItems}
      </select>
      {/* Sort options for bigger screens */}
      <ul className="hidden cursor-pointer list-none sm:flex">
        {selectListOptionItems}
      </ul>
    </div>
  );
}
