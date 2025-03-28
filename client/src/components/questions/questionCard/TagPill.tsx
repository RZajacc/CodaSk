import React from 'react';

type Props = {
  tagName: string;
  tagId: string;
};

function TagPill({tagName, tagId}: Props) {
  return (
    <div className="whitespace-nowrap rounded-md bg-black p-2 text-white no-underline">
      {tagName}
    </div>
  );
}

export default TagPill;
