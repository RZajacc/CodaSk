import React, {useState} from 'react';

type FormInputProps = {
  htmlFor: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

export default function FormInput({
  htmlFor,
  type,
  placeholder,
  required = false,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label
        className="mb-1 ml-1 font-medium text-[#6741D9] first-letter:capitalize"
        htmlFor={htmlFor}
      >
        {htmlFor}
      </label>
      <input
        className="w-full rounded-2xl bg-[#EDE9E6] px-3 py-2 shadow-custom"
        type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
        name={htmlFor}
        placeholder={placeholder}
        required={required}
      />
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
    </>
  );
}
