import FormInput from '../../components/Ui/Inputs/FormInput';
import {useAuth} from '../../context/AuthContext.tsx';
import {useNavigate} from 'react-router';
import {useForm, type SubmitHandler, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type LoginInputType, LoginSchema} from '../../schemas/AuthSchemas.ts';

export default function LogInForm() {
  const {login, error} = useAuth();
  const navigate = useNavigate();

  const methods = useForm<LoginInputType>({
    resolver: zodResolver(LoginSchema),
  });

  const {handleSubmit} = methods;

  const onSubmit: SubmitHandler<LoginInputType> = async (data) => {
    try {
      const user = await login(data.email, data.password);
      navigate(`/user/profile/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-96 rounded-2xl bg-[#EDE9E6] p-10">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-testid="login-form"
          className="mb-4 grid gap-3"
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
            className="rounded-full bg-black px-4 py-2 font-bold text-white hover:bg-[#B197FC]"
          >
            log in
          </button>

          {error && <div className={'text-center text-red-500'}>{error}</div>}
        </form>
      </FormProvider>
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    signIn('github', {*/}
      {/*      redirect: false,*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  className="rounded border-b-4 border-[#D9D9D9] bg-[#6741D9] px-4 py-2 font-bold text-white hover:border-black hover:bg-[#9AFF80] hover:text-black"*/}
      {/*>*/}
      {/*  <FaGithub style={{fontSize: '2em'}} />*/}
      {/*  log in with Github*/}
      {/*</button>*/}
    </div>
  );
}
