import {Link} from 'react-router';

function LinksNoUser() {
  return (
    <>
      <li>
        <Link
          to={'/user/register'}
          className="mx-1 text-white no-underline hover:font-semibold focus:font-semibold"
        >
          Sign up
        </Link>
      </li>
      <li>
        <Link
          to={'/user/login'}
          className="mx-1 text-white no-underline hover:font-semibold focus:font-semibold"
        >
          | Log in
        </Link>
      </li>
    </>
  );
}

export default LinksNoUser;
