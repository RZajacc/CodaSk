import React from 'react';

type Props = {
  handleSortChange: (option: string) => void;
  option: string;
};

function SortOptionItem({handleSortChange, option}: Props) {
  return (
    <option
      onClick={() => {
        handleSortChange(option);
      }}
    >
      {option}
    </option>
  );
}

export default SortOptionItem;
