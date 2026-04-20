import LogInForm from '../../../components/forms/LogInForm';
import {Link} from 'react-router';

export default function Login() {
  return (
    <div className="h-full bg-[#6741D9]">
      <h1 className="p-4 text-center text-xl font-medium text-white md:text-3xl">
        Please log in:
      </h1>
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
          <LogInForm />
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
