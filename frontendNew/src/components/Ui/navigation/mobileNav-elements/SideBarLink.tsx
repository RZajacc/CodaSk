import {NavLink} from 'react-router';

type Props = {
  handleSideNavVisibility: () => void;
  url: string;
  text: string;
};

function SideBarLink({handleSideNavVisibility, url, text}: Props) {
  return (
    <li className="border-b-2 py-2 hover:bg-slate-100">
      <NavLink
        to={url}
        onClick={handleSideNavVisibility}
        className={({isActive}) =>
          isActive
            ? 'text-lg font-bold hover:animate-pulse hover:cursor-default'
            : 'hover:animate-pulse hover:text-[#6741D9]'
        }
        // className={`no-underline ${
        //   pathname === url
        //     ? 'text-lg font-bold hover:animate-pulse hover:cursor-default'
        //     : 'hover:animate-pulse hover:text-[#6741D9]'
        // }`}
      >
        {text}
      </NavLink>
    </li>
  );
}

export default SideBarLink;
