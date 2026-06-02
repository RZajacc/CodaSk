import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import type {LoginInputType} from '../../../schemas/AuthSchemas.ts';

type FormInputProps = {
  label: string;
  htmlFor: keyof LoginInputType;
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

  const {
    register,
    formState: {errors},
  } = useFormContext<LoginInputType>();

  // Input types
  const TextArea = (
    <textarea
      {...register(htmlFor)}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`shadow-custom w-full rounded-2xl border ${errors && errors[htmlFor] ? 'border-red-500' : 'border-[#6741D9]'} bg-[#EDE9E6] px-3 py-2`}
    />
  );

  const TextInput = (
    <input
      {...register(htmlFor)}
      placeholder={placeholder}
      type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
      required={required}
      className={`shadow-custom w-full rounded-2xl border ${errors && errors[htmlFor] ? 'border-red-500' : 'border-[#6741D9]'} bg-[#EDE9E6] px-3 py-2`}
    />
  );

  // Show/Hide password checkbox
  const ShowPasswordCheckbox = (
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
  );

  return (
    <div className={'grid w-full gap-2'}>
      <label
        className="mb-1 ml-1 font-medium text-[#6741D9] first-letter:capitalize"
        htmlFor={htmlFor}
      >
        {label}
      </label>

      {/* Render appropriate fields*/}
      {type === 'textarea' ? TextArea : TextInput}

      {/* Validation error */}
      {errors && errors[htmlFor] && (
        <p className={'text-red-500'}>{errors[htmlFor].message}</p>
      )}

      {/*If its a password render also show password checkbox*/}
      {type === 'password' && ShowPasswordCheckbox}
    </div>
  );
}
