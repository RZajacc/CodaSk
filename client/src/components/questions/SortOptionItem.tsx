import React from 'react';

type Props = {
  handleSortChange: (label: string) => void;
  option: string;
};

function SortOptionItem({handleSortChange, option}: Props) {
  return (
    <li
      onClick={() => handleSortChange(option)}
      className=" px-1"
      value={option}
    >
      {option}
      <span className="font-semibold text-black"> | </span>
    </li>
  );
}

export default SortOptionItem;
