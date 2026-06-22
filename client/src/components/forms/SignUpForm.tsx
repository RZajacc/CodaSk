import FormInput from '../Ui/Inputs/FormInput.tsx';
import {type SubmitHandler, useFormContext} from 'react-hook-form';
import type {LoginInputType} from '../../schemas/AuthSchemas.ts';

type Props = {
  onSubmit: SubmitHandler<any>;
};

function SignUpForm({onSubmit}: Props) {
  const {handleSubmit} = useFormContext<LoginInputType>();

  return (
    <div className="w-96 rounded-2xl bg-[#EDE9E6] p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 grid gap-3">
        <FormInput
          label={'Email'}
          htmlFor={'email'}
          type={'email'}
          placeholder={'email'}
          required={true}
        />
        <FormInput
          label={'Password'}
          htmlFor={'password'}
          type={'password'}
          placeholder={'password'}
          required={true}
        />
        <FormInput
          label={'Confirm Password'}
          htmlFor={'password'}
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
