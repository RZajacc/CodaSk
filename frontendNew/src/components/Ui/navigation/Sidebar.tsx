import {Link} from 'react-router';

function Sidebar() {
  return (
    <section id="desktop-sidebar" className="hidden border-r md:block">
      <div className="mx-4 my-10">
        <h3 className="mb-2 text-lg font-extralight">SEARCH BY: </h3>
        <ul className="list-none">
          <li className="mb-2">
            <Link className="font-light no-underline" to={'/search/questions'}>
              Questions
            </Link>
          </li>
          <li className="mb-2">
            <Link className="font-light no-underline" to={'/search/tags'}>
              Tags
            </Link>
          </li>
          <li>
            <Link className="font-light no-underline" to={'/search/modules'}>
              Modules
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="mx-4 my-10">
        <h3 className="mb-2 text-lg font-extralight">DISCOVER: </h3>
        <ul className="list-none">
          <li className="mb-2">
            <Link
              className="font-light no-underline"
              to={'/discover/studentprojects'}
            >
              Student Projects
            </Link>
          </li>
          <li className="mb-2">
            <Link className="font-light no-underline" to={'/discover/polls'}>
              Polls
            </Link>
          </li>
          <li>
            <Link
              className="font-light no-underline"
              to={'/discover/discussions'}
            >
              Discussions
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="mx-4 my-10">
        <ul className="list-none">
          <li className="mb-5 text-lg font-extralight">
            <Link className="no-underline" to={'/connect'}>
              CONNECT
            </Link>
          </li>
          <li className="mb-5 text-lg font-extralight">
            <Link className="no-underline" to={'/about'}>
              ABOUT
            </Link>
          </li>
          <li className="mb-5 text-lg font-extralight">
            <Link className="no-underline" to={'/contact'}>
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;
