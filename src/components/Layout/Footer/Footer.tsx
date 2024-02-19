import { environment } from 'config';
import { version } from '../../../../package.json';

export const Footer = () => {
  return (
    <footer className='mx-auto w-full max-w-prose pb-2 pl-6 pr-6 text-center text-gray-400'>
      <div className='flex flex-col items-center text sm text-gray-400'>
        <div className='flex gap-1 items-center'>
          <a
            target='_blank'
            className='flex items-center text-sm hover:underline'
            href='https://dustybones.xyz/'
          >
            © Dusty Bones
          </a>
          <p className='text-gray-400 text-sm'>-</p>
          <p className='text-gray-400 text-sm'>
            version {version} - {environment}
          </p>
        </div>
      </div>
    </footer>
  );
};
