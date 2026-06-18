import {formatDate} from '../../../../components/questions/Functions';
import parse from 'html-react-parser';
import {FaGithub} from 'react-icons/fa';
import {MdLocationOn} from 'react-icons/md';
import {TbWorld} from 'react-icons/tb';
// import {MdModeEditOutline} from 'react-icons/md';
import {Link} from 'react-router';
import {useAuth} from '../../../../context/AuthContext.tsx';

export default function Profile() {
  // const id = '123';

  const {logout, user} = useAuth();

  const handleDeleteAccount = async (userId: string) => {
    console.log(userId);
    if (window.confirm('Are you SURE you want to delete your account?')) {
      // const requestOptions = {
      //   method: 'DELETE',
      // };
      // try {
      //   const response = await fetch(
      //     `${FETCH_URL}/api/users/deleteuser/${userId}`,
      //     requestOptions
      //   );
      //   await signOut({redirect: false});
      //   router.push('/');
      //   location.reload();
      // } catch (error) {
      //   console.log('error when deleting a user:>> ', error);
      // }
    }
  };

  const handleLogOut = async () => {
    window.confirm('Are you sure you want to log out?');
    await logout();
  };

  const handleQuestionRedirect = (questionID: string) => {
    console.log(questionID);
    // router.push(`${FETCH_URL}/search/questions/${questionID}`);
  };

  const userQuestions = user?.questions.map((question) => {
    if (typeof question === 'string') {
      return <div>{question}</div>;
    }

    return (
      <div
        onClick={() => {
          handleQuestionRedirect(question._id);
        }}
        key={question._id}
        className="mb-2 w-60 cursor-pointer rounded-md p-1 shadow-md"
      >
        <p className="mb-3 truncate overflow-hidden p-1">{question.title}</p>
      </div>
    );
  });

  const userContributions = user?.answers.map((answer) => {
    if (typeof answer === 'string') {
      return <div>{answer}</div>;
    }

    return (
      <div
        onClick={() => {
          handleQuestionRedirect(answer?._id);
        }}
        key={answer._id}
        className="mb-2 w-60 cursor-pointer rounded-md p-1 shadow-md"
      >
        <p className="mb-3 truncate overflow-hidden p-1">
          {parse(answer?.message)}
        </p>
      </div>
    );
  });

  const userTags = user?.saved_tags.map((tag) => {
    if (typeof tag === 'string') {
      return <div>{tag}</div>;
    }

    return (
      <div key={tag._id}>
        <div className="w-min rounded-md bg-black p-2 text-white">
          <Link
            className="no-underline"
            to={{
              pathname: `http://localhost:3000/search/questions/tagged/${tag?._id}`,
            }}
          >
            {tag?.name}
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="mt-8 grid gap-20 p-3 md:mx-auto md:max-w-6xl md:p-10">
      {/* TOP SECTION */}
      <div className="grid items-center justify-center gap-3 lg:flex lg:justify-between">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center justify-center lg:items-end lg:justify-end">
          <img
            className="rounded-full pb-2"
            alt={`profile_photo`}
            src={
              user?.user_photo ||
              'https://res.cloudinary.com/dfm1r4ikr/image/upload/v1701685725/codask/website_photos/user_photo_default.png'
            }
            width={170}
            height={170}
          />
          {user?.location && (
            <span className="flex flex-row pb-2 text-[#6741D9]">
              <MdLocationOn style={{fontSize: '1.5em', color: 'black'}} />
              <p className="text-lg font-semibold">
                {user?.location?.city}, {user?.location?.country}
              </p>
            </span>
          )}
        </div>
        {/* MIDDLE SIDE */}
        <div className="text-center">
          <h3 className="font-bold text-[#6741D9] md:text-3xl lg:text-6xl">
            {user?.first_name} {user?.last_name}
          </h3>
          {user?.course_type && (
            <>
              <h4 className="text-lg font-semibold text-[#6741D9]">in</h4>
              <p className="font-medium">{user?.course_type}</p>
            </>
          )}
          {user?.user_permission && (
            <p className="mb-4 font-semibold">
              {'{ '}
              {user?.user_permission}
              {' }'}
            </p>
          )}

          <p className="mb-3 rounded-full bg-[#B197FC] px-4 py-2 font-medium text-white hover:bg-[#B197FC]">
            {'joined on '}
            {formatDate(user?.member_since as string)}
          </p>
          <p className="rounded-full bg-[#B197FC] px-4 py-2 font-medium text-white hover:bg-[#B197FC]">
            {'last seen on '}
            {formatDate(user?.last_seen as string)}
          </p>
        </div>
        {/* RIGHT SIDE */}
        <div className="mt-2 flex flex-col items-center gap-2 lg:items-end lg:justify-end">
          <div>
            <Link
              className="rounded-full font-semibold text-[#6741D9] no-underline hover:bg-[#B197FC] hover:p-2 hover:text-white"
              to={`/user/update-profile/${user!._id}`}
            >
              edit
            </Link>
            <span> | </span>
            <button
              onClick={handleLogOut}
              className="rounded-full pl-1 font-semibold text-[#6741D9] hover:bg-[#B197FC] hover:p-2 hover:text-white"
            >
              log out
            </button>
          </div>
          <br />
          <div>
            <span className="mb-2 flex flex-row">
              <TbWorld style={{fontSize: '1.5em'}} />
              <button
                className="ml-1"
                onClick={() => window.open(`${user?.website}`, '_blank')}
              >
                Website
              </button>
            </span>
            <span className="flex flex-row">
              <FaGithub style={{fontSize: '1.5em'}} />
              <button
                className="ml-1"
                onClick={() => window.open(`${user?.github}`, '_blank')}
              >
                Github
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION */}
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-[#EDE9E6] p-5">
        <h4 className="mb-2 ml-6 text-lg font-semibold text-[#6741D9]">Bio</h4>
        <div className="shadow-custom mb-4 rounded-2xl border-2 border-[#6741D9] p-3 italic">
          <p className="font-medium">
            {user?.bio ? user.bio : 'No bio written yet...'}
          </p>
        </div>
        <div className="ml-6 flex flex-row justify-between"></div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 justify-between gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* YOUR QUESTIONS */}
        <div className="rounded-2xl bg-[#EDE9E6]">
          <div className="rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">
              your questions ({user?.questions.length})
            </h4>
          </div>
          <div className="p-1">
            <div className="flex flex-col p-4">
              {user && user.questions.length <= 0 ? (
                <p>Nothing saved yet</p>
              ) : (
                userQuestions
              )}
            </div>
          </div>
          <button
            className="m-4 text-[#6741D9] hover:text-black"
            onClick={() => console.log('Button clicked')}
          >
            view all
          </button>
        </div>

        {/* YOUR CONTRIBUTIONS */}
        <div className="rounded-2xl bg-[#EDE9E6]">
          <div className="rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">
              your contributions ({user?.answers.length})
            </h4>
          </div>
          <div className="p-1">
            <div className="flex flex-col p-4">
              {user && user.answers.length <= 0 ? (
                <p>Nothing saved yet</p>
              ) : (
                userContributions
              )}
            </div>
          </div>
          <button
            className="m-4 text-[#6741D9] hover:text-black"
            onClick={() => console.log('Button clicked')}
          >
            view all
          </button>
        </div>

        {/* YOUR TAGS */}
        <div className="rounded-2xl bg-[#EDE9E6]">
          <div className="rounded-xl bg-[#6741D9] p-4 text-white">
            <h4 className="text-lg font-bold">
              your tags ({user?.saved_tags.length})
            </h4>
          </div>
          <div className="flex flex-row flex-wrap gap-2 p-2">
            {user && user.saved_tags.length <= 0 ? (
              <p>Nothing saved yet</p>
            ) : (
              userTags
            )}
          </div>
          <button
            className="m-4 text-[#6741D9] hover:text-black"
            onClick={() => console.log('Button clicked')}
          >
            view all
          </button>
        </div>
      </div>

      {/* DELETE ACCOUNT BUTTON */}
      <div className="mr-16 flex flex-col items-end justify-end">
        <button
          className="rounded-full text-[#6741D9] hover:bg-[#B197FC] hover:p-2 hover:text-white"
          onClick={() => {
            handleDeleteAccount(user!._id);
          }}
        >
          delete account
        </button>
      </div>
      <br />
      <br />
    </div>
  );
}
