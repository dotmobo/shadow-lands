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
import { Address } from '@multiversx/sdk-core/out';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Button, Loader, MxLink } from 'components';
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
  const { address } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendChooseFactionTransaction } = useSendShadowLandsTransaction();
  const {
    getMyFaction,
    getFactionMembers1,
    getFactionMembers2,
    getFactionMembers3,
    getFactionMembers4
  } = useCallShadowLandsQuery();
  const [faction, setFaction] = useState<number>();
  const [factionMembers, setFactionMembers] = useState<string[]>();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

  useEffect(() => {
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
  }, [hasPendingTransactions]);

  useEffect(() => {
    if (!!faction) {
      let factionFunction;

      switch (faction) {
        case 1:
          factionFunction = getFactionMembers1;
          break;
        case 2:
          factionFunction = getFactionMembers2;
          break;
        case 3:
          factionFunction = getFactionMembers3;
          break;
        default:
          factionFunction = getFactionMembers4;
          break;
      }
      proxy
        .queryContract(factionFunction)
        .then(({ returnData }) => {
          const encoded = returnData;
          console.log('encoded', encoded);
          switch (encoded) {
            case undefined:
              setFactionMembers([]);
              break;
            case '':
              setFactionMembers([]);
              break;
            default: {
              const decoded = encoded.map((x) =>
                Address.fromHex(
                  Buffer.from(x, 'base64').toString('hex')
                ).toString()
              );
              setFactionMembers(decoded);
              break;
            }
          }
        })
        .catch((err) => {
          console.error('Unable to call VM query', err);
        });
    }
  }, [hasPendingTransactions, faction]);

  const virus = factions.find((x) => x.id === 1);
  const heart = factions.find((x) => x.id === 2);
  const dog = factions.find((x) => x.id === 3);
  const cat = factions.find((x) => x.id === 4);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          {faction === undefined && (
            <div className='flex'>
              <Loader />
            </div>
          )}

          {faction !== undefined && (
            <>
              <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
                Choose your faction
              </h1>
              <div className='flex flex-wrap justify-center px-4'>
                <div
                  className={`w-full sm:w-1/2 mb-8 p-2 ${
                    faction === virus?.id ? 'bg-green-900 rounded-lg' : ''
                  }`}
                >
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
                    Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <span className='ml-8 mr-2'>
                    <Button
                      aria-label='Join the Virus faction'
                      disabled={hasPendingTransactions || faction !== 0}
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
                <div
                  className={`w-full sm:w-1/2 mb-8 p-2 ${
                    faction === heart?.id ? 'bg-green-900 rounded-lg' : ''
                  }`}
                >
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
                    Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <span className='ml-8 mb-8 mr-2'>
                    <Button
                      aria-label='Join the Heart faction'
                      disabled={hasPendingTransactions || faction !== 0}
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
                <div
                  className={`w-full sm:w-1/2 mb-8 p-2 ${
                    faction === dog?.id ? 'bg-green-900 rounded-lg' : ''
                  }`}
                >
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
                    Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <span className='ml-8 mb-8 mr-2'>
                    <Button
                      aria-label='Join the Dog faction'
                      disabled={hasPendingTransactions || faction !== 0}
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
                <div
                  className={`w-full sm:w-1/2 mb-8 p-2 ${
                    faction === cat?.id ? 'bg-green-900 rounded-lg' : ''
                  }`}
                >
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
                    Lorel ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <span className='ml-8 mb-8 mr-2'>
                    <Button
                      aria-label='Join the Cat faction'
                      disabled={hasPendingTransactions || faction !== 0}
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
            </>
          )}
          {faction !== undefined &&
            faction !== 0 &&
            factionMembers !== undefined && (
              <>
                <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
                  Your allies
                </h1>

                <div className='border-4 border-green-500 bg-green-900 rounded mb-4 p-2'>
                  <h2 className='text-xl font-bold bg-green-500 text-white p-2 rounded text-center'>
                    <FontAwesomeIcon
                      icon={factions.find((x) => x.id === faction)?.icon}
                      className='mr-2'
                    />
                    {factions.find((x) => x.id === faction)?.name}
                  </h2>
                  <div className='p-4 border-green-500 rounded'>
                    <ol start={1} className='list-decimal ml-4'>
                      {factionMembers.map((item, idx) => (
                        <li className='mb-2 text-white' key={idx}>
                          <span className='flex flex-items-center'>
                            <a
                              className={`mb-2 ${
                                item === address
                                  ? 'text-yellow-400'
                                  : 'hover:text-slate-400'
                              }`}
                              href={`${mvxExplorerUrl}/accounts/${item}`}
                            >
                              {item.substring(0, 6) +
                                '...' +
                                item.substring(item.length - 6)}
                            </a>
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </>
            )}

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
