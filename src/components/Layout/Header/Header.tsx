import {
  IconName,
  faCircleUser,
  faCircleXmark,
  faPeopleGroup,
  faShieldCat,
  faShieldDog,
  faShieldHeart,
  faShieldVirus
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import axios from 'axios';
import { Button } from 'components/Button';
import { MxLink } from 'components/MxLink';
import { factions, mvxApiUrl, nftCollectionDustyBonesId } from 'config';
import { logout } from 'helpers';
import {
  useGetAccountInfo,
  useGetIsLoggedIn,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { RouteNamesEnum } from 'localConstants';
import { shuffle } from 'lodash';
import { useCallShadowLandsQuery } from 'pages/Game/queries';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

library.add(faShieldCat, faShieldDog, faShieldVirus, faShieldHeart);

export const Header = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { address, account } = useGetAccountInfo();
  const [avatar, setAvatar] = useState<string>();
  const [faction, setFaction] = useState<number>();

  const { network } = useGetNetworkConfig();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { getMyFaction } = useCallShadowLandsQuery();
  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

  const aleblade = factions.find((x) => x.id === 1);
  const stormbrew = factions.find((x) => x.id === 2);
  const goldpick = factions.find((x) => x.id === 3);
  const sanctigrail = factions.find((x) => x.id === 4);

  useEffect(() => {
    if (isLoggedIn) {
      proxy
        .queryContract(getMyFaction)
        .then(({ returnData }) => {
          const [encoded] = returnData;
          switch (encoded) {
            case undefined:
              setFaction(0);
              break;
            case '':
              setFaction(0);
              break;
            default: {
              const decoded = Buffer.from(encoded, 'base64').toString('hex');
              setFaction(parseInt(decoded, 16));
              break;
            }
          }
        })
        .catch((err) => {
          console.error('Unable to call VM query', err);
        });
    }
  }, [hasPendingTransactions, isLoggedIn]);

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
                {!!faction ? (
                  <Link
                    title='Choose your faction'
                    to={RouteNamesEnum.factions}
                    className={`inline-block rounded-lg px-1 py-0 text-center hover:no-underline my-0 text-white mr-2 
                    ${
                      faction === aleblade?.id
                        ? 'hover:bg-red-700 bg-red-600'
                        : faction === stormbrew?.id
                        ? 'hover:bg-green-700 bg-green-600'
                        : faction === goldpick?.id
                        ? 'hover:bg-yellow-700 bg-yellow-600'
                        : faction === sanctigrail?.id
                        ? 'hover:bg-violet-700 bg-violet-600'
                        : 'hover:bg-blue-700 bg-blue-600'
                    }
                    `}
                  >
                    {faction === aleblade?.id && (
                      <img
                        src='/aleblade.jpg'
                        alt={aleblade?.name}
                        className='h-9 w-9 rounded-full'
                      />
                    )}
                    {faction === stormbrew?.id && (
                      <img
                        src='/stormbrew.jpg'
                        alt={stormbrew?.name}
                        className='h-9 w-9 rounded-full'
                      />
                    )}
                    {faction === goldpick?.id && (
                      <img
                        src='/goldpick.jpg'
                        alt={goldpick?.name}
                        className='h-9 w-9 rounded-full'
                      />
                    )}
                    {faction === sanctigrail?.id && (
                      <img
                        src='/sanctigrail.jpg'
                        alt={sanctigrail?.name}
                        className='h-9 w-9 rounded-full'
                      />
                    )}
                  </Link>
                ) : (
                  <Link
                    title='Choose your faction'
                    to={RouteNamesEnum.factions}
                    className='inline-block rounded-lg px-1 py-0 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-2'
                  >
                    <FontAwesomeIcon
                      icon={faPeopleGroup}
                      className='h-9 w-9 rounded-full'
                    />
                  </Link>
                )}
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
