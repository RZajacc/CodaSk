import FormInput from '../../components/Ui/Inputs/FormInput';
import {type SubmitHandler, useFormContext} from 'react-hook-form';
import {type LoginInputType} from '../../schemas/AuthSchemas.ts';

type Props = {
  onSubmit: SubmitHandler<LoginInputType>;
  loginError: string | null;
};

export default function LogInForm({onSubmit, loginError}: Props) {
  const {handleSubmit} = useFormContext<LoginInputType>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="login-form"
      className="mb-4 grid w-96 gap-3 rounded-2xl bg-[#EDE9E6] p-6"
    >
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

      <button
        type="submit"
        className="mb-4 rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
      >
        log in
      </button>

      {loginError && (
        <div className={'text-center text-red-500'}>{loginError}</div>
      )}
    </form>
  );
}
