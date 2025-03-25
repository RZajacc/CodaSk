import Link from 'next/link';
import {FaGithub} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="flex h-[80px] flex-col justify-center bg-black text-white sm:h-[96px]">
      <p className="my-1 text-center">CODASK Team</p>
      <div className="flex justify-center gap-2">
        <Link
          className="flex gap-1 font-light no-underline hover:animate-pulse"
          href={'https://github.com/helene-abiassi'}
          target="_blank"
        >
          <FaGithub style={{fontSize: '1.3em'}} />
          Hélène Abi Assi
        </Link>{' '}
        |{' '}
        <Link
          className="flex gap-1 font-light no-underline"
          href={'https://github.com/ThairOr'}
          target="_blank"
        >
          <FaGithub style={{fontSize: '1.3em'}} />
          Thair Orfali{' '}
        </Link>
        |{' '}
        <Link
          className="flex gap-1 font-light no-underline"
          href={'https://github.com/RZajacc'}
          target="_blank"
        >
          <FaGithub style={{fontSize: '1.3em'}} />
          Rafał Zając
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
