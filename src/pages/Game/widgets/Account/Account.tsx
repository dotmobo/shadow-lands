import { useEffect, useState } from 'react';
import {
  faArrowUp,
  faBeer,
  faBuildingColumns,
  faCircleXmark,
  faCross,
  faFlaskVial,
  faHouse,
  faPlus,
  faStore,
  faTree
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { orderBy } from 'lodash';
import { Button } from 'components';
import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import {
  dustTokenId,
  mvxApiUrl,
  sftTavernId,
  sftBanksId,
  sftLandsId,
  sftLandsNonce,
  sftHauntedHouseId,
  sftCryptId,
  sftLaboId,
  sftCollectionId,
  priceLand,
  sftTavernNonce,
  priceBuilding,
  sftBanksNonce,
  sftHauntedHouseNonce,
  sftCryptNonce,
  sftLaboNonce,
  sftTavernR1Id,
  priceBuildingR1,
  sftTavernR1Nonce,
  sftBankR1Id,
  sftBankR1Nonce,
  sftHauntedHouseR1Id,
  sftHauntedHouseR1Nonce,
  sftCryptR1Nonce,
  sftCryptR1Id,
  sftLaboR1Id,
  sftLaboR1Nonce
} from 'config';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { Sft, Token } from 'pages/Game/models';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const Account = ({
  sfts = [],
  outputTaverns,
  outputBanks,
  outputHauntedHouses,
  outputLabos,
  outputCrypts,
  outputTavernsR1,
  outputBanksR1,
  outputHauntedHousesR1,
  outputCryptsR1,
  outputLabosR1
}) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const [lands, setLandsList] = useState<Sft[]>();
  const [taverns, setTavernsList] = useState<Sft[]>();
  const [banks, setBanksList] = useState<Sft[]>();
  const [hauntedHouses, setHauntedHousesList] = useState<Sft[]>();
  const [crypts, setCryptsList] = useState<Sft[]>();
  const [labos, setLabosList] = useState<Sft[]>();

  const [tavernsR1, setTavernsR1] = useState<Sft[]>();
  const [banksR1, setBanksR1] = useState<Sft[]>();
  const [hauntedHousesR1, setHauntedHousesR1] = useState<Sft[]>();
  const [cryptsR1, setCryptsR1] = useState<Sft[]>();
  const [labosR1, setLabosR1] = useState<Sft[]>();

  const [dust, setDustToken] = useState<Token | null>();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const {
    sendStakeLandTransaction,
    sendUnstakeLandTransaction,
    sendBuyItemTransaction
  } = useSendShadowLandsTransaction();

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${mvxApiUrl}/accounts/${address}/tokens/${dustTokenId}`)
      .then((response) => {
        setDustToken(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setDustToken(null);
        }
      });
  }, [hasPendingTransactions]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${address}/nfts?size=3330&identifiers=${sftLandsId},${sftTavernId},${sftBanksId},${sftHauntedHouseId},${sftCryptId},${sftLaboId},${sftTavernR1Id},${sftBankR1Id},${sftHauntedHouseR1Id},${sftCryptR1Id},${sftLaboR1Id}`
      )
      .then((response) => {
        const res = orderBy(
          response.data,
          ['collection', 'nonce'],
          ['desc', 'asc']
        );
        // Lands
        const lands = res.filter((x) => x.identifier === sftLandsId);
        setLandsList(lands);
        // Taverns
        const taverns = res.filter((x) => x.identifier === sftTavernId);
        setTavernsList(taverns);
        outputTaverns(taverns);
        // Banks
        const banks = res.filter((x) => x.identifier === sftBanksId);
        setBanksList(banks);
        outputBanks(banks);
        // Haunted Houses
        const hauntedHouses = res.filter(
          (x) => x.identifier === sftHauntedHouseId
        );
        setHauntedHousesList(hauntedHouses);
        outputHauntedHouses(hauntedHouses);
        // Crypts
        const crypts = res.filter((x) => x.identifier === sftCryptId);
        setCryptsList(crypts);
        outputCrypts(crypts);
        // Labos
        const labos = res.filter((x) => x.identifier === sftLaboId);
        setLabosList(labos);
        outputLabos(labos);
        // Taverns R1
        const tavernsR1 = res.filter((x) => x.identifier === sftTavernR1Id);
        setTavernsR1(tavernsR1);
        outputTavernsR1(tavernsR1);
        // Banks R1
        const banksR1 = res.filter((x) => x.identifier === sftBankR1Id);
        setBanksR1(banksR1);
        outputBanksR1(banksR1);
        // Haunted Houses R1
        const hauntedHousesR1 = res.filter(
          (x) => x.identifier === sftHauntedHouseR1Id
        );
        setHauntedHousesR1(hauntedHousesR1);
        outputHauntedHousesR1(hauntedHousesR1);
        // Crypts R1
        const cryptsR1 = res.filter((x) => x.identifier === sftCryptR1Id);
        setCryptsR1(cryptsR1);
        outputCryptsR1(cryptsR1);
        // Labos R1
        const labosR1 = res.filter((x) => x.identifier === sftLaboR1Id);
        setLabosR1(labosR1);
        outputLabosR1(labosR1);
      });
  }, [hasPendingTransactions]);

  return (
    <OutputContainer>
      <div className='flex flex-col'>
        <div className='flex flex-col text-black'>
          <p className='flex items-center'>
            <Label>$DUST: </Label>
            <FormatAmount
              value={dust?.balance ?? 0}
              egldLabel='$DUST'
              showLabel={false}
              digits={0}
              data-testid='balance'
            />
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
          </p>
        </div>

        <hr className='mt-2 mb-2' />

        <div className='flex flex-row text-black'>
          <span className='w-1/3'>
            <FontAwesomeIcon icon={faTree} size='sm' className='mr-1' />
            <label className='text-gray-500 hidden md:inline'>
              Lands
            </label>: {lands?.[0]?.balance ?? 0}
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faBeer} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>
                Taverns
              </label>: {taverns?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>+1</label>:{' '}
              {tavernsR1?.[0]?.balance ?? 0}
            </span>
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon
                icon={faBuildingColumns}
                size='sm'
                className='mr-1'
              />
              <label className='text-gray-500 hidden md:inline'>Banks</label>:{' '}
              {banks?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>+1</label>:{' '}
              {banksR1?.[0]?.balance ?? 0}
            </span>
          </span>
        </div>
        <div className='flex flex-row text-black mt-2'>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faHouse} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>
                Houses
              </label>: {hauntedHouses?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>+1</label>:{' '}
              {hauntedHousesR1?.[0]?.balance ?? 0}
            </span>
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faCross} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>
                Crypts
              </label>: {crypts?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>+1</label>:{' '}
              {cryptsR1?.[0]?.balance ?? 0}
            </span>
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faFlaskVial} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>
                Labos
              </label>: {labos?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-500 hidden md:inline'>+1</label>:{' '}
              {labosR1?.[0]?.balance ?? 0}
            </span>
          </span>
        </div>

        <hr className='mt-2 mb-2' />

        <div className='flex flex-col text-black'>
          <span className='flex flex-row w-1/2 mb-1'>
            {priceLand}
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
            <span className='ml-2'>
              <Button
                className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                aria-label='Buy a land'
                disabled={
                  hasPendingTransactions ||
                  sfts === undefined ||
                  lands === undefined
                }
                onClick={() => {
                  confirmAlert({
                    title: 'Buy 1 land',
                    message:
                      'Are you sure you want to buy 1 land for 150 $DUST ?',
                    buttons: [
                      {
                        label: 'Yes',
                        onClick: () =>
                          sendBuyItemTransaction(
                            {
                              collection: sftCollectionId,
                              nonce: sftLandsNonce
                            },
                            priceLand * Math.pow(10, 18)
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
                <FontAwesomeIcon icon={faTree} size='sm' className='mr-1' />
                Buy 1 land
              </Button>
            </span>
          </span>
          <span className='flex flex-row bg-slate-200 mb-1'>
            <span className='flex w-1/2'>
              {priceBuilding}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a tavern'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 tavern',
                      message:
                        'Are you sure you want to buy 1 tavern for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftTavernNonce
                              },
                              priceBuilding * Math.pow(10, 18)
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
                  <FontAwesomeIcon icon={faBeer} size='sm' className='mr-1' />
                  Buy 1 tavern
                </Button>
              </span>
            </span>
            <span className='flex w-1/2 ml-2'>
              {priceBuildingR1}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a tavern +1'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 tavern +1',
                      message:
                        'Are you sure you want to buy 1 tavern +1 for 400 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftTavernR1Nonce
                              },
                              priceBuildingR1 * Math.pow(10, 18)
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
                    icon={faArrowUp}
                    size='sm'
                    className='mr-1'
                  />
                  Buy 1 tavern +1
                </Button>
              </span>
            </span>
          </span>
          <span className='flex flex-row mb-1'>
            <span className='flex w-1/2 '>
              {priceBuilding}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a bank'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 bank',
                      message:
                        'Are you sure you want to buy 1 bank for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftBanksNonce
                              },
                              priceBuilding * Math.pow(10, 18)
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
                    icon={faBuildingColumns}
                    size='sm'
                    className='mr-1'
                  />
                  Buy 1 bank
                </Button>
              </span>
            </span>
            <span className='flex w-1/2 ml-2'>
              {priceBuildingR1}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a bank +1'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 bank +1',
                      message:
                        'Are you sure you want to buy 1 bank +1 for 400 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftBankR1Nonce
                              },
                              priceBuildingR1 * Math.pow(10, 18)
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
                    icon={faArrowUp}
                    size='sm'
                    className='mr-1'
                  />
                  Buy 1 bank +1
                </Button>
              </span>
            </span>
          </span>
          <span className='flex flex-row bg-slate-200 mb-1'>
            <span className='flex w-1/2 '>
              {priceBuilding}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a haunted house'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 haunted house',
                      message:
                        'Are you sure you want to buy 1 haunted house for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftHauntedHouseNonce
                              },
                              priceBuilding * Math.pow(10, 18)
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
                  <FontAwesomeIcon icon={faHouse} size='sm' className='mr-1' />
                  Buy 1 house
                </Button>
              </span>
            </span>
            <span className='flex w-1/2 ml-2'>
              {priceBuildingR1}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a haunted house +1'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 haunted house +1',
                      message:
                        'Are you sure you want to buy 1 haunted house +1 for 400 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftHauntedHouseR1Nonce
                              },
                              priceBuildingR1 * Math.pow(10, 18)
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
                    icon={faArrowUp}
                    size='sm'
                    className='mr-1'
                  />
                  Buy 1 house +1
                </Button>
              </span>
            </span>
          </span>
          <span className='flex flex-row mb-1'>
            <span className='flex w-1/2'>
              {priceBuilding}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a crypt'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 crypt',
                      message:
                        'Are you sure you want to buy 1 crypt for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftCryptNonce
                              },
                              priceBuilding * Math.pow(10, 18)
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
                  <FontAwesomeIcon icon={faCross} size='sm' className='mr-1' />
                  Buy 1 crypt
                </Button>
              </span>
            </span>
            <span className='flex w-1/2 ml-2'>
              {priceBuildingR1}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a crypt +1'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 crypt +1',
                      message:
                        'Are you sure you want to buy 1 crypt +1 for 400 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftCryptR1Nonce
                              },
                              priceBuildingR1 * Math.pow(10, 18)
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
                    icon={faArrowUp}
                    size='sm'
                    className='mr-1'
                  />
                  Buy 1 crypt +1
                </Button>
              </span>
            </span>
          </span>
          <span className='flex flex-row- bg-slate-200'>
            <span className='flex mb-1 w-1/2'>
              {priceBuilding}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a labo'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 labo',
                      message:
                        'Are you sure you want to buy 1 labo for 100 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftLaboNonce
                              },
                              priceBuilding * Math.pow(10, 18)
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
                    icon={faFlaskVial}
                    size='sm'
                    className='mr-1'
                  />
                  Buy 1 labo
                </Button>
              </span>
            </span>
            <span className='flex w-1/2 ml-2'>
              {priceBuildingR1}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a labo +1'
                  disabled={
                    hasPendingTransactions ||
                    sfts === undefined ||
                    lands === undefined
                  }
                  onClick={() => {
                    confirmAlert({
                      title: 'Buy 1 labo +1',
                      message:
                        'Are you sure you want to buy 1 labo +1 for 400 $DUST ?',
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: () =>
                            sendBuyItemTransaction(
                              {
                                collection: sftCollectionId,
                                nonce: sftLaboR1Nonce
                              },
                              priceBuildingR1 * Math.pow(10, 18)
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
                    icon={faArrowUp}
                    size='sm'
                    className='mr-1'
                  />
                  Buy 1 labo +1
                </Button>
              </span>
            </span>
          </span>
        </div>
      </div>

      <div className='flex text-black mt-4 gap-1' data-testid='topInfo'>
        <span className='flex flex-row w-2/3 gap-1'>
          <Button
            disabled={
              hasPendingTransactions ||
              sfts === undefined ||
              sfts.filter((x) => x === sftLandsNonce).length > 0 ||
              lands === undefined ||
              lands?.length === 0
            }
            data-testid='sign-auto-send'
            onClick={sendStakeLandTransaction}
          >
            <FontAwesomeIcon icon={faPlus} className='mr-1' />
            Add the land
          </Button>
          <Button
            className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-red-600 text-white hover:bg-red-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
            disabled={
              hasPendingTransactions ||
              sfts.filter((x) => x === sftLandsNonce).length === 0
            }
            data-testid='sign-auto-send'
            onClick={() => {
              confirmAlert({
                title: 'Destroy the land',
                message:
                  "Are you sure you want to withdraw the land and all buildings? You won't be able to claim your $DUST rewards after that.",
                buttons: [
                  {
                    label: 'Yes',
                    onClick: () => sendUnstakeLandTransaction()
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
            <FontAwesomeIcon icon={faCircleXmark} className='mr-1' />
            Destroy the land
          </Button>
        </span>
        <span className='flex flex-row w-1/4'>
          <Button
            className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-purple-600 text-white hover:bg-purple-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
            onClick={() =>
              window.open(
                'https://www.frameit.gg/marketplace/SHALAN-55b9a9/items'
              )
            }
          >
            <FontAwesomeIcon icon={faStore} className='mr-1' />
            External Market
          </Button>
        </span>
      </div>
    </OutputContainer>
  );
};
