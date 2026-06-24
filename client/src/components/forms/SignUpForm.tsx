import FormTextInput from '../Ui/Inputs/FormTextInput.tsx';
import {type SubmitHandler, useFormContext} from 'react-hook-form';
import type {RegisterInputType} from '../../schemas/AuthSchemas.ts';

type Props = {
  onSubmit: SubmitHandler<any>;
};

function SignUpForm({onSubmit}: Props) {
  const {handleSubmit} = useFormContext<RegisterInputType>();

  return (
    <div className="mb-4 grid w-96 gap-3 rounded-2xl bg-[#EDE9E6] p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 grid gap-3">
        <FormTextInput
          label={'Email'}
          htmlFor={'email'}
          type={'email'}
          placeholder={'email'}
          required={true}
        />
        <FormTextInput
          label={'Password'}
          htmlFor={'password'}
          type={'password'}
          placeholder={'password'}
          required={true}
        />
        <FormTextInput
          label={'Confirm Password'}
          htmlFor={'confirmPassword'}
          type={'password'}
          placeholder={'password'}
          required={true}
        />
        <button
          type="submit"
          className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
        >
          sign up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
