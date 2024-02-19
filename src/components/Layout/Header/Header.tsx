import { faCircleUser, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { mvxApiUrl, nftCollectionDustyBonesId } from 'config';
import { logout } from 'helpers';
import { useGetAccountInfo, useGetIsLoggedIn } from 'hooks';
import { RouteNamesEnum } from 'localConstants';
import { shuffle } from 'lodash';
import { useEffect, useState } from 'react';

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { address, account } = useGetAccountInfo();
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get<any>(
          `${mvxApiUrl}/accounts/${address}/nfts?size=666&collection=${nftCollectionDustyBonesId}`
        )
        .then((response) => {
          // Si on a au moins un NFT Dusty Bones, on prend 1 au hasard et on récupère l'avatar
          if (response.data.length > 0) {
            const randomNft = shuffle(response.data)[0];
            setAvatar(randomNft.url);
          }
        });
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.clear();
    logout(`${window.location.origin}/unlock`, undefined, false);
  };

  return (
    <header className='flex flex-row align-center justify-between pl-6 pr-6 pt-6'>
      <MxLink
        className='flex items-center justify-between'
        to={isLoggedIn ? RouteNamesEnum.game : RouteNamesEnum.home}
      >
        <img src='/sl-simple.png' alt='Shadow Lands' className='h-9' />
      </MxLink>

      <nav className='h-full w-full text-sm sm:relative sm:left-auto sm:top-auto sm:flex sm:w-auto sm:flex-row sm:justify-end sm:bg-transparent'>
        <div className='flex justify-end container mx-auto items-center gap-2'>
          {isLoggedIn ? (
            <>
              <div className='flex items-center'>
                {!!avatar ? (
                  <img
                    src={avatar}
                    alt='Avatar'
                    className='h-9 w-9 rounded-full mr-2'
                  />
                ) : (
                  <FontAwesomeIcon
                    color='#9ca3af'
                    icon={faCircleUser}
                    className='h-9 w-9 rounded-full mr-2'
                  />
                )}
                <span className='text-gray-400'>
                  {address.substring(0, 6) +
                    '...' +
                    address.substring(address.length - 6)}
                </span>
              </div>
              <Button
                aria-label='Close'
                onClick={handleLogout}
                className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-gray-400 hover:text-gray-600 hover:bg-slate-100 mx-0'
              >
                <FontAwesomeIcon icon={faCircleXmark} size='lg' />
              </Button>
            </>
          ) : (
            <MxLink to={RouteNamesEnum.unlock}>Connect</MxLink>
          )}
        </div>
      </nav>
    </header>
  );
};
