import React, {useState} from 'react';

type FormInputProps = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
};

export default function FormInput({
  label,
  htmlFor,
  type,
  placeholder,
  rows = 5,
  required = false,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const generatedInput =
    type === 'textarea' ? (
      <textarea
        rows={rows}
        name={htmlFor}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border-2 border-[#6741D9] bg-[#EDE9E6] px-3 py-2 shadow-custom"
      />
    ) : (
      <input
        className="w-full rounded-2xl border-2 border-[#6741D9] bg-[#EDE9E6] px-3 py-2 shadow-custom"
        type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
        name={htmlFor}
        placeholder={placeholder}
        required={required}
      />
    );

  return (
    <div className={'grid w-full gap-2'}>
      <label
        className="mb-1 ml-1 font-medium text-[#6741D9] first-letter:capitalize"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {generatedInput}
      {type === 'password' && (
        <div className={'flex gap-1 align-baseline'}>
          <p className={'p-1'}>Show password</p>
          <input
            type="checkbox"
            checked={showPassword}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
      )}
    </div>
  );
}
