type Props = {
  tagName: string;
  tagId: string;
};

function TagPill({tagName}: Props) {
  return (
    <div className="rounded-md bg-black p-2 whitespace-nowrap text-white no-underline">
      {tagName}
    </div>
  );
}

export default TagPill;
