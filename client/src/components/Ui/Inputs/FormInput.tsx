import {useState} from 'react';

type FormInputProps = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder: string;
  error?: string | null;
  rows?: number;
  required?: boolean;
};

export default function FormInput({
  label,
  htmlFor,
  type,
  placeholder,
  error,
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
        className={`shadow-custom w-full rounded-2xl border ${error ? 'border-red-500' : 'border-[#6741D9]'} bg-[#EDE9E6] px-3 py-2`}
      />
    ) : (
      <input
        className={`shadow-custom w-full rounded-2xl border ${error ? 'border-red-500' : 'border-[#6741D9]'} bg-[#EDE9E6] px-3 py-2`}
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
            defaultChecked={showPassword}
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
        </div>
      )}
    </div>
  );
}
