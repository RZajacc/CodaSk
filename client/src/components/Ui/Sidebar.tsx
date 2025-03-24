import Link from 'next/link';

function Sidebar() {
  return (
    <section id="desktop-sidebar" className="border-r-2">
      <div className="mx-4 my-10">
        <h3 className="mb-2 text-lg font-extralight">SEARCH BY: </h3>
        <ul className="list-none ">
          <li className="mb-2">
            <Link
              className="font-light no-underline"
              href={'/search/questions'}
            >
              Questions
            </Link>
          </li>
          <li className="mb-2">
            <Link className="font-light no-underline" href={'/search/tags'}>
              Tags
            </Link>
          </li>
          <li>
            <Link className="font-light no-underline" href={'/search/modules'}>
              Modules
            </Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className="mx-4 my-10">
        <h3 className=" mb-2 text-lg font-extralight">DISCOVER: </h3>
        <ul className=" list-none">
          <li className="mb-2">
            <Link
              className="font-light no-underline"
              href={'/discover/studentprojects'}
            >
              Student Projects
            </Link>
          </li>
          <li className="mb-2">
            <Link className="font-light no-underline " href={'/discover/polls'}>
              Polls
            </Link>
          </li>
          <li>
            <Link
              className="font-light no-underline"
              href={'/discover/discussions'}
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
            <Link className=" no-underline" href={'/connect'}>
              CONNECT
            </Link>
          </li>
          <li className="mb-5 text-lg font-extralight">
            <Link className=" no-underline" href={'/about'}>
              ABOUT
            </Link>
          </li>
          <li className="mb-5 text-lg font-extralight">
            <Link className=" no-underline" href={'/contact'}>
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;
