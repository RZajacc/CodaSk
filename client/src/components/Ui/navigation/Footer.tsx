import {FaGithub} from 'react-icons/fa';
import {Link} from 'react-router';

function Footer() {
  return (
    <footer className="flex h-[80px] flex-col justify-center bg-black text-white sm:h-[96px]">
      <p className="my-1 text-center">CODASK Team</p>
      <div className="flex justify-center gap-3">
        <Link
          className="flex gap-1 font-light no-underline hover:animate-pulse"
          to={'https://github.com/helene-abiassi'}
          target="_blank"
        >
          <FaGithub style={{fontSize: '1.3em'}} />
          Hélène
        </Link>{' '}
        |{' '}
        <Link
          className="flex gap-1 font-light no-underline"
          to={'https://github.com/ThairOr'}
          target="_blank"
        >
          <FaGithub style={{fontSize: '1.3em'}} />
          Thair
        </Link>
        |{' '}
        <Link
          className="flex gap-1 font-light no-underline"
          to={'https://github.com/RZajacc'}
          target="_blank"
        >
          <FaGithub style={{fontSize: '1.3em'}} />
          Rafał
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
