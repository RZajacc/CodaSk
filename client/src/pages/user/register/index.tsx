import SignUpForm from '../../../components/forms/SignUpForm';
import {Link} from 'react-router';
import {FormProvider, type SubmitHandler, useForm} from 'react-hook-form';
import {
  type RegisterInputType,
  RegisterSchema,
} from '../../../schemas/AuthSchemas.ts';
import {zodResolver} from '@hookform/resolvers/zod';

export default function Register() {
  //   user_photo:
  //     'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'

  const methods = useForm<RegisterInputType>({
    resolver: zodResolver(RegisterSchema),
  });

  // const {reset} = methods;

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    // * Get the form data
    // const formData = new FormData(e.currentTarget);
    // const email = formData.get('email') as string;
    // const password = formData.get('password') as string;
    //
    // if (email && password) {
    //   if (!email.includes('@') && password.length < 6) {
    //     alert(
    //       'Your email seems to be invalid. \n Your password should be at least 6 characters'
    //     );
    //     return;
    //   } else if (password.length < 6) {
    //     alert('Your password should be at least 6 characters');
    //     return;
    //   } else if (!email.includes('@')) {
    //     alert('Your email seems to be invalid');
    //     return;
    //   }
    //
    //   try {z
    //     const myHeaders = new Headers();
    //     myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    //
    //     const urlencoded = new URLSearchParams();
    //
    //     urlencoded.append('email', newUser.email);
    //     urlencoded.append('password', newUser.password);
    //     urlencoded.append('user_photo', newUser.user_photo);
    //
    //     const requestOptions = {
    //       method: 'POST',
    //       headers: myHeaders,
    //       body: urlencoded,
    //     };
    //
    //     try {
    //       const response = await fetch(
    //         `${FETCH_URL}/api/users/signup`,
    //         requestOptions
    //       );
    //       if (response.ok) {
    //         const result = await response.json();
    //         // console.log('result in register:>> ', result);
    //
    //         setNewUser(result);
    //         alert('Thank you for signing up!  🤓');
    //         // await signIn('credentials', {
    //         //   ...newUser,
    //         //   redirect: false,
    //         // });
    //       }
    //       // router.push('/user/moreinfo');
    //       // location.reload();
    //     } catch (error) {
    //       console.log('error in your /signup fetch:>> ', error);
    //     }
    //   } catch (error) {
    //     console.log('error when adding new user:>> ', error);
    //   }
    // }
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
            <SignUpForm onSubmit={onSubmit} />
          </FormProvider>
          <p className="m-4 text-center font-medium text-white">
            <Link to={'/user/login'}>Already have an account? log in!</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
