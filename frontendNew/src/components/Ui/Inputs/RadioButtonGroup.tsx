import React from 'react';

type RadioButtonGroupProps = {
  htmlFor: string;
  inputOptions: string[];
};

export default function RadioButtonGroup({
  htmlFor,
  inputOptions,
}: RadioButtonGroupProps) {
  return inputOptions.map((option) => {
    return (
      <div className="flex">
        <input
          value={option}
          className="mx-2 font-medium "
          type="radio"
          name={htmlFor}
        />
        <label className="mx-2 font-medium text-black" htmlFor={htmlFor}>
          {option}
        </label>
      </div>
    );
  });
}
