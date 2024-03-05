import { library } from '@fortawesome/fontawesome-svg-core';
import {
  IconName,
  faCircleArrowLeft,
  faShieldCat,
  faShieldDog,
  faShieldHeart,
  faShieldVirus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Button, MxLink } from 'components';
import {
  contractGameAddress,
  contractMarketAddress,
  contractMarketDbAddress,
  factions,
  mvxExplorerUrl
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useCallShadowLandsQuery } from 'pages/Game/queries';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

library.add(faShieldCat, faShieldDog, faShieldVirus, faShieldHeart);

export const Factions = () => {
  const { network } = useGetNetworkConfig();

  const { getNftNonce } = useCallShadowLandsQuery();

  const { hasPendingTransactions } = useGetPendingTransactions();

  const { sendChooseFactionTransaction } = useSendShadowLandsTransaction();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

  const virus = factions.find((x) => x.id === 1);
  const heart = factions.find((x) => x.id === 2);
  const dog = factions.find((x) => x.id === 3);
  const cat = factions.find((x) => x.id === 4);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
            Choose your faction
          </h1>
          <div className='flex flex-wrap justify-center px-4'>
            <div className='w-full sm:w-1/2 mb-8'>
              <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
                <FontAwesomeIcon
                  title={virus?.name}
                  color='#9ca3af'
                  icon={virus?.icon as IconName}
                  className='h-9 w-9 rounded-full mr-2'
                />
                {virus?.name}
              </h2>
              <p className='ml-8 mb-8 mr-2'>
                Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <span className='ml-8 mr-2'>
                <Button
                  aria-label='Join the Virus faction'
                  disabled={hasPendingTransactions}
                  onClick={() => {
                    confirmAlert({
                      title: 'Join the Virus faction',
                      message:
                        'Are you sure you want to join the Virus faction for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendChooseFactionTransaction(virus?.id ?? 0)
                        },
                        {
                          label: 'No',
                          onClick: () => {
                            return;
                          }
                        }
                      ]
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={virus?.icon as IconName}
                    size='sm'
                    className='mr-1'
                  />
                  Join the Virus faction
                </Button>
              </span>
            </div>
            <div className='w-full sm:w-1/2 mb-8'>
              <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
                <FontAwesomeIcon
                  title={heart?.name}
                  color='#9ca3af'
                  icon={heart?.icon as IconName}
                  className='h-9 w-9 rounded-full mr-2'
                />
                {heart?.name}
              </h2>
              <p className='ml-8 mb-8 mr-2'>
                Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <span className='ml-8 mb-8 mr-2'>
                <Button
                  aria-label='Join the Heart faction'
                  disabled={hasPendingTransactions}
                  onClick={() => {
                    confirmAlert({
                      title: 'Join the Heart faction',
                      message:
                        'Are you sure you want to join the Heart faction for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendChooseFactionTransaction(heart?.id ?? 0)
                        },
                        {
                          label: 'No',
                          onClick: () => {
                            return;
                          }
                        }
                      ]
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={heart?.icon as IconName}
                    size='sm'
                    className='mr-1'
                  />
                  Join the Heart faction
                </Button>
              </span>
            </div>
            <div className='w-full sm:w-1/2 mb-8'>
              <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
                <FontAwesomeIcon
                  title={dog?.name}
                  color='#9ca3af'
                  icon={dog?.icon as IconName}
                  className='h-9 w-9 rounded-full mr-2'
                />
                {dog?.name}
              </h2>
              <p className='ml-8 mb-8 mr-2'>
                Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <span className='ml-8 mb-8 mr-2'>
                <Button
                  aria-label='Join the Dog faction'
                  disabled={hasPendingTransactions}
                  onClick={() => {
                    confirmAlert({
                      title: 'Join the Dog faction',
                      message:
                        'Are you sure you want to join the Dog faction for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendChooseFactionTransaction(dog?.id ?? 0)
                        },
                        {
                          label: 'No',
                          onClick: () => {
                            return;
                          }
                        }
                      ]
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={dog?.icon as IconName}
                    size='sm'
                    className='mr-1'
                  />
                  Join the Dog faction
                </Button>
              </span>
            </div>
            <div className='w-full sm:w-1/2 mb-8'>
              <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
                <FontAwesomeIcon
                  title={cat?.name}
                  color='#9ca3af'
                  icon={cat?.icon as IconName}
                  className='h-9 w-9 rounded-full mr-2'
                />
                {cat?.name}
              </h2>
              <p className='ml-8 mb-8 mr-2'>
                Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <span className='ml-8 mb-8 mr-2'>
                <Button
                  aria-label='Join the Cat faction'
                  disabled={hasPendingTransactions}
                  onClick={() => {
                    confirmAlert({
                      title: 'Join the Cat faction',
                      message:
                        'Are you sure you want to join the Cat faction for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendChooseFactionTransaction(cat?.id ?? 0)
                        },
                        {
                          label: 'No',
                          onClick: () => {
                            return;
                          }
                        }
                      ]
                    });
                  }}
                >
                  <FontAwesomeIcon
                    icon={cat?.icon as IconName}
                    size='sm'
                    className='mr-1'
                  />
                  Join the Cat faction
                </Button>
              </span>
            </div>
          </div>
          <span className='mb-2'>
            <MxLink to={RouteNamesEnum.game}>
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                size='sm'
                className='mr-2'
              />
              Return to the game
            </MxLink>
          </span>
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
