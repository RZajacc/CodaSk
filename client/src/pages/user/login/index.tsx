import LogInForm from '../../../components/forms/LogInForm';
import {Link, useNavigate} from 'react-router';
import {useAuth} from '../../../context/AuthContext.tsx';
import {FormProvider, type SubmitHandler, useForm} from 'react-hook-form';
import {
  type LoginInputType,
  LoginSchema,
} from '../../../schemas/AuthSchemas.ts';
import {zodResolver} from '@hookform/resolvers/zod';

export default function Login() {
  const {login, error} = useAuth();
  const navigate = useNavigate();

  const methods = useForm<LoginInputType>({
    resolver: zodResolver(LoginSchema),
  });

  const {reset} = methods;

  const onSubmit: SubmitHandler<LoginInputType> = async (data) => {
    try {
      const user = await login(data.email, data.password);
      if (user) {
        navigate(`/user/profile/${user._id}`);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full bg-[#6741D9]">
      {/* TITLE */}
      <h1 className="p-4 text-center text-xl font-medium text-white md:text-3xl">
        Please log in:
      </h1>

      {/* BOX CONTAINING FORM AND OPTIONAL IMAGE */}
      <div className="grid justify-center">
        <div className="relative z-20">
          <img
            className="absolute -right-36 -bottom-12 -z-10 hidden sm:block"
            width={200}
            height={200}
            alt="green-cloud"
            src={
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701535913/codask/website_photos/pngtree-element-abstract-yellow-pastel-blob-png-image_6568008_l2qiel.png'
            }
          />

          {/* FORM WITH A FORM WRAPPER */}
          <FormProvider {...methods}>
            <LogInForm onSubmit={onSubmit} loginError={error} />
          </FormProvider>

          {/* LINK TO REGISTER FORM */}
          <p className="m-4 text-center font-medium text-white">
            <Link to={'/user/register'}>
              Don't have an account yet? sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
