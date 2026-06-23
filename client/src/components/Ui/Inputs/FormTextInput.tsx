import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';

type FormInputProps = {
  label: string;
  htmlFor: string;
  type: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
};

export default function FormTextInput({
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
  } = useFormContext();

  const textInputStyle = `shadow-custom rounded-2xl border ${errors && errors[htmlFor] ? 'border-red-500' : 'border-[#6741D9]'} bg-[#EDE9E6] px-3 py-2`;
  const passwordInputStyle = `shadow-custom rounded-2xl border ${errors && errors[htmlFor] ? 'border-red-500' : 'border-[#6741D9]'} bg-[#EDE9E6] px-3 py-2 flex items-center justify-around`;

  const error = errors[htmlFor]?.message as string | undefined;

  // Input types
  const TextArea = (
    <textarea
      {...register(htmlFor)}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={textInputStyle}
    />
  );

  const TextInput = (
    <input
      {...register(htmlFor)}
      placeholder={placeholder}
      type={type}
      required={required}
      className={textInputStyle}
    />
  );

  const PasswordInput = (
    <div className={passwordInputStyle}>
      <input
        {...register(htmlFor)}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
        required={required}
        className={'grow focus:outline-none'}
      />
      {showPassword ? (
        <MdVisibilityOff
          className={'cursor-pointer hover:animate-pulse'}
          size={'22'}
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        />
      ) : (
        <MdVisibility
          className={'cursor-pointer hover:animate-pulse'}
          size={'22'}
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        />
      )}
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
      {type === 'textarea'
        ? TextArea
        : type === 'password'
          ? PasswordInput
          : TextInput}

      {/* Validation error */}
      {htmlFor in errors && errors[htmlFor] && (
        <p className={'px-2 text-sm text-red-500 italic'}>{error}</p>
      )}
    </div>
  );
}
