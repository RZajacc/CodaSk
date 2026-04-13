import React from 'react';

type Props = {
  handleSortChange: (label: string) => void;
  option: string;
  separator?: boolean;
};

function SortListOptionItem({handleSortChange, option, separator}: Props) {
  return (
    <li
      onClick={() => handleSortChange(option)}
      className=" px-1"
      value={option}
    >
      {option}
      {separator && <span className="font-semibold text-black"> | </span>}
    </li>
  );
}

export default SortListOptionItem;
