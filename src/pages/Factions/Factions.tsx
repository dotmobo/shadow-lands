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
  mvxExplorerUrl,
  priceChooseFaction
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
  }, [faction]);

  const aleblade = factions.find((x) => x.id === 1);
  const stormbrew = factions.find((x) => x.id === 2);
  const goldpick = factions.find((x) => x.id === 3);
  const sanctigrail = factions.find((x) => x.id === 4);

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
                    faction === aleblade?.id ? 'bg-red-900 rounded-lg' : ''
                  }`}
                >
                  <h2 className='text-2xl sm:text-2xl font-bold mb-8 flex items-center'>
                    <img
                      src='/aleblade.jpg'
                      alt={aleblade?.name}
                      className='h-32 w-32 rounded-2xl mr-2'
                    />
                    {aleblade?.name}
                  </h2>
                  <p className='ml-8 mb-8 mr-2'>
                    A fierce and resilient warrior faction, whose members are as
                    skilled in battle as they are in celebrating their
                    victories. Their courage is bolstered by ale, symbolizing
                    their brotherhood and strength.
                  </p>
                  <span className='flex flex-row ml-8 items-center'>
                    {priceChooseFaction}
                    <span>
                      <img
                        src='/dust-logo.png'
                        alt='Dust'
                        className='ml-1 w-5'
                      />
                    </span>
                    <span className='ml-2'>
                      <Button
                        aria-label='Join the Aleblade faction'
                        disabled={hasPendingTransactions || faction !== 0}
                        onClick={() => {
                          confirmAlert({
                            title: 'Join the Aleblade faction',
                            message:
                              'Are you sure you want to join the Aleblade faction for 100 $DUST ?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () =>
                                  sendChooseFactionTransaction(
                                    aleblade?.id ?? 0
                                  )
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
                          icon={aleblade?.icon as IconName}
                          size='sm'
                          className='mr-1'
                        />
                        Join the Aleblade faction
                      </Button>
                    </span>
                  </span>
                </div>
                <div
                  className={`w-full sm:w-1/2 mb-8 p-2 ${
                    faction === stormbrew?.id ? 'bg-green-900 rounded-lg' : ''
                  }`}
                >
                  <h2 className='text-2xl sm:text-2xl font-bold mb-8 flex items-center'>
                    <img
                      src='/stormbrew.jpg'
                      alt={stormbrew?.name}
                      className='h-32 w-32 rounded-2xl mr-2'
                    />
                    {stormbrew?.name}
                  </h2>
                  <p className='ml-8 mb-8 mr-2'>
                    Magicians and alchemists who manipulate natural elements to
                    brew powerful potions. Their mastery over storms makes them
                    formidable, capable of unleashing the fury of the skies upon
                    their enemies.
                  </p>
                  <span className='flex flex-row ml-8 items-center'>
                    {priceChooseFaction}
                    <span>
                      <img
                        src='/dust-logo.png'
                        alt='Dust'
                        className='ml-1 w-5'
                      />
                    </span>
                    <span className='ml-2'>
                      <Button
                        aria-label='Join the Stormbrew faction'
                        disabled={hasPendingTransactions || faction !== 0}
                        onClick={() => {
                          confirmAlert({
                            title: 'Join the Stormbrew faction',
                            message:
                              'Are you sure you want to join the Stormbrew faction for 100 $DUST ?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () =>
                                  sendChooseFactionTransaction(
                                    stormbrew?.id ?? 0
                                  )
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
                          icon={stormbrew?.icon as IconName}
                          size='sm'
                          className='mr-1'
                        />
                        Join the Stormbrew faction
                      </Button>
                    </span>
                  </span>
                </div>
                <div
                  className={`w-full sm:w-1/2 mb-8 p-2 ${
                    faction === goldpick?.id ? 'bg-yellow-900 rounded-lg' : ''
                  }`}
                >
                  <h2 className='text-2xl sm:text-2xl font-bold mb-8 flex items-center'>
                    <img
                      src='/goldpick.jpg'
                      alt={goldpick?.name}
                      className='h-32 w-32 rounded-2xl mr-2'
                    />
                    {goldpick?.name}
                  </h2>
                  <p className='ml-8 mb-8 mr-2'>
                    Experts in mining and gathering riches, this faction excels
                    at extracting gold and hidden treasures from the earth's
                    depths. Their prosperity is built on their ability to
                    discover and exploit precious resources.
                  </p>
                  <span className='flex flex-row ml-8 items-center'>
                    {priceChooseFaction}
                    <span>
                      <img
                        src='/dust-logo.png'
                        alt='Dust'
                        className='ml-1 w-5'
                      />
                    </span>
                    <span className='ml-2'>
                      <Button
                        aria-label='Join the Goldpick faction'
                        disabled={hasPendingTransactions || faction !== 0}
                        onClick={() => {
                          confirmAlert({
                            title: 'Join the Goldpick faction',
                            message:
                              'Are you sure you want to join the Goldpick faction for 100 $DUST ?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () =>
                                  sendChooseFactionTransaction(
                                    goldpick?.id ?? 0
                                  )
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
                          icon={goldpick?.icon as IconName}
                          size='sm'
                          className='mr-1'
                        />
                        Join the Goldpick faction
                      </Button>
                    </span>
                  </span>
                </div>
                <div
                  className={`w-full sm:w-1/2 mb-8 p-2 ${
                    faction === sanctigrail?.id
                      ? 'bg-violet-900 rounded-lg'
                      : ''
                  }`}
                >
                  <h2 className='text-2xl sm:text-2xl font-bold mb-8 flex items-center'>
                    <img
                      src='/sanctigrail.jpg'
                      alt={sanctigrail?.name}
                      className='h-32 w-32 rounded-2xl mr-2'
                    />
                    {sanctigrail?.name}
                  </h2>
                  <p className='ml-8 mb-8 mr-2'>
                    Mystics and spiritual seekers, members of this faction are
                    in pursuit of answers and ancient relics. Their devotion
                    drives them to seek the sacred grail, symbolizing their
                    quest for ultimate purity and truth.
                  </p>
                  <span className='flex flex-row ml-8 items-center'>
                    {priceChooseFaction}
                    <span>
                      <img
                        src='/dust-logo.png'
                        alt='Dust'
                        className='ml-1 w-5'
                      />
                    </span>
                    <span className='ml-2'>
                      <Button
                        aria-label='Join the Sanctigrail faction'
                        disabled={hasPendingTransactions || faction !== 0}
                        onClick={() => {
                          confirmAlert({
                            title: 'Join the Sanctigrail faction',
                            message:
                              'Are you sure you want to join the Sanctigrail faction for 100 $DUST ?',
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () =>
                                  sendChooseFactionTransaction(
                                    sanctigrail?.id ?? 0
                                  )
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
                          icon={sanctigrail?.icon as IconName}
                          size='sm'
                          className='mr-1'
                        />
                        Join the Sanctigrail faction
                      </Button>
                    </span>
                  </span>
                </div>
              </div>
            </>
          )}
          {faction !== undefined && factionMembers === undefined && (
            <div className='flex'>
              <Loader />
            </div>
          )}
          {faction !== undefined &&
            faction !== 0 &&
            factionMembers !== undefined && (
              <>
                <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
                  Your allies
                </h1>

                <div
                  className={`border-4 ${
                    faction === aleblade?.id
                      ? 'border-red-500 bg-red-900'
                      : faction === stormbrew?.id
                      ? 'border-green-500 bg-green-900'
                      : faction === goldpick?.id
                      ? 'border-yellow-500 bg-yellow-900'
                      : faction === sanctigrail?.id
                      ? 'border-violet-500 bg-violet-900'
                      : 'border-slate-500 bg-slate-900'
                  } rounded mb-4 p-2`}
                >
                  <h2
                    className={`text-xl font-bold ${
                      faction === aleblade?.id
                        ? 'bg-red-500'
                        : faction === stormbrew?.id
                        ? 'bg-green-500'
                        : faction === goldpick?.id
                        ? 'bg-yellow-500'
                        : faction === sanctigrail?.id
                        ? 'bg-violet-500'
                        : 'bg-slate-500'
                    } text-white p-2 rounded text-center flex`}
                  >
                    {faction === aleblade?.id && (
                      <img
                        src='/aleblade.jpg'
                        alt={aleblade?.name}
                        className='h-9 w-9 rounded mr-2'
                      />
                    )}
                    {faction === stormbrew?.id && (
                      <img
                        src='/stormbrew.jpg'
                        alt={stormbrew?.name}
                        className='h-9 w-9 rounded mr-2'
                      />
                    )}
                    {faction === goldpick?.id && (
                      <img
                        src='/goldpick.jpg'
                        alt={goldpick?.name}
                        className='h-9 w-9 rounded mr-2'
                      />
                    )}
                    {faction === sanctigrail?.id && (
                      <img
                        src='/sanctigrail.jpg'
                        alt={sanctigrail?.name}
                        className='h-9 w-9 rounded mr-2'
                      />
                    )}
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
