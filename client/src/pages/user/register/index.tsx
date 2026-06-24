import SignUpForm from '../../../components/forms/SignUpForm';
import {Link} from 'react-router';
import {FormProvider, type SubmitHandler, useForm} from 'react-hook-form';
import {
  type RegisterInputType,
  RegisterSchema,
} from '../../../schemas/AuthSchemas.ts';
import {zodResolver} from '@hookform/resolvers/zod';
import {authService} from '../../../services/authService.ts';
import {useState} from 'react';

export default function Register() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const methods = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterSchema),
  });

  const {reset} = methods;

  const onSubmit: SubmitHandler<RegisterInputType> = async (data) => {
    const {email, password} = data;
    try {
      const result = await authService.register({email, password});
      setErrorMessage(null);
      setSuccessMessage(result);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setSuccessMessage(null);
      }
    }
  };

  return (
    <div className="h-full bg-[#6741D9]">
      <h1 className="p-4 text-center text-xl font-medium text-white md:text-3xl">
        Please sign up:
      </h1>
      <div className="grid justify-center">
        <div className="relative z-20">
          <img
            className="absolute -top-20 -right-24 -z-10 hidden sm:block"
            width={200}
            height={200}
            alt="green-cloud"
            src={
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701533894/codask/website_photos/pngtree-element-green-blob-png-image_6578665_zxdtvn.png'
            }
          />
          <FormProvider {...methods}>
            <SignUpForm
              onSubmit={onSubmit}
              errorMessage={errorMessage}
              successMessage={successMessage}
            />
          </FormProvider>
          <p className="m-4 text-center font-medium text-white">
            <Link to={'/user/login'}>Already have an account? log in!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
