import { faCircleArrowLeft, faSkull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { Loader, MxLink } from 'components';
import { RouteNamesEnum } from 'localConstants';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import {
  mvxApiUrl,
  sftLandsNonce,
  sftCollectionId,
  priceLand,
  sftTavernNonce,
  priceBuilding,
  sftBanksNonce,
  sftHauntedHouseNonce,
  sftCryptNonce,
  sftLaboNonce,
  priceBuildingR1,
  sftTavernR1Nonce,
  sftBankR1Nonce,
  sftHauntedHouseR1Nonce,
  sftCryptR1Nonce,
  sftLaboR1Nonce,
  priceDustyBone,
  nftCollectionDustyBonesId,
  contractMarketDbAddress,
  priceBuildingR2,
  sftTavernR2Nonce,
  sftBankR2Nonce,
  sftHauntedHouseR2Nonce
} from 'config';
import { Button } from 'components';
import { confirmAlert } from 'react-confirm-alert';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';
import {
  faArrowUp,
  faBeer,
  faBuildingColumns,
  faCross,
  faFlaskVial,
  faHouse,
  faTree
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Sft } from 'pages/Game/models';
import { shuffle } from 'lodash';

export const Market = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendBuyItemTransaction, sendBuyDustyBonesTransaction } =
    useSendShadowLandsTransaction();

  const [dbList, setDbList] = useState<Sft[]>();

  useEffect(() => {
    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${contractMarketDbAddress}/nfts?size=10000&collections=${nftCollectionDustyBonesId}`
      )
      .then((response) => {
        setDbList(shuffle(response.data));
      });
  }, [hasPendingTransactions]);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-2 ml-2 mr-2'>
            Dust Market
          </h1>
          <span className='ml-2 mr-2 mb-8 italic'>
            Utilize your diligently acquired Dust to purchase items !
          </span>

          <h2 className='text-2xl sm:text-2xl font-bold mt-4 mb-2 ml-2 mr-2'>
            Shadow Lands cards
          </h2>

          <div className='flex flex-col text-black bg-slate-200 w-full md:w-3/4 p-2 rounded-xl'>
            <span className='flex flex-row md:w-1/3 mb-1'>
              {priceLand}
              <span>
                <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
              </span>
              <span className='ml-2'>
                <Button
                  className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                  aria-label='Buy a land'
                  disabled={hasPendingTransactions}
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
            <span className='flex flex-col md:flex-row bg-slate-300 mb-1'>
              <span className='flex md:w-1/3'>
                {priceBuilding}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a tavern'
                    disabled={hasPendingTransactions}
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
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0'>
                {priceBuildingR1}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a tavern +1'
                    disabled={hasPendingTransactions}
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
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0'>
                {priceBuildingR2}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a tavern +2'
                    disabled={hasPendingTransactions}
                    onClick={() => {
                      confirmAlert({
                        title: 'Buy 1 tavern +2',
                        message:
                          'Are you sure you want to buy 1 tavern +2 for 1200 $DUST ?',
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () =>
                              sendBuyItemTransaction(
                                {
                                  collection: sftCollectionId,
                                  nonce: sftTavernR2Nonce
                                },
                                priceBuildingR2 * Math.pow(10, 18)
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
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      size='sm'
                      className='mr-1'
                    />
                    Buy 1 tavern +2
                  </Button>
                </span>
              </span>
            </span>
            <span className='flex flex-col md:flex-row mb-1'>
              <span className='flex md:w-1/3 '>
                {priceBuilding}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a bank'
                    disabled={hasPendingTransactions}
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
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0'>
                {priceBuildingR1}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a bank +1'
                    disabled={hasPendingTransactions}
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
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0'>
                {priceBuildingR2}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a bank +1'
                    disabled={hasPendingTransactions}
                    onClick={() => {
                      confirmAlert({
                        title: 'Buy 1 bank +2',
                        message:
                          'Are you sure you want to buy 1 bank +2 for 1200 $DUST ?',
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () =>
                              sendBuyItemTransaction(
                                {
                                  collection: sftCollectionId,
                                  nonce: sftBankR2Nonce
                                },
                                priceBuildingR2 * Math.pow(10, 18)
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
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      size='sm'
                      className='mr-1'
                    />
                    Buy 1 bank +2
                  </Button>
                </span>
              </span>
            </span>
            <span className='flex flex-col md:flex-row bg-slate-300 mb-1'>
              <span className='flex md:w-1/3 '>
                {priceBuilding}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a haunted house'
                    disabled={hasPendingTransactions}
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
                    <FontAwesomeIcon
                      icon={faHouse}
                      size='sm'
                      className='mr-1'
                    />
                    Buy 1 house
                  </Button>
                </span>
              </span>
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0'>
                {priceBuildingR1}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a haunted house +1'
                    disabled={hasPendingTransactions}
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
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0'>
                {priceBuildingR2}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a haunted house +2'
                    disabled={hasPendingTransactions}
                    onClick={() => {
                      confirmAlert({
                        title: 'Buy 1 haunted house +2',
                        message:
                          'Are you sure you want to buy 1 haunted house +2 for 1200 $DUST ?',
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () =>
                              sendBuyItemTransaction(
                                {
                                  collection: sftCollectionId,
                                  nonce: sftHauntedHouseR2Nonce
                                },
                                priceBuildingR2 * Math.pow(10, 18)
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
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      size='sm'
                      className='mr-1'
                    />
                    Buy 1 house +2
                  </Button>
                </span>
              </span>
            </span>
            <span className='flex flex-col md:flex-row mb-1'>
              <span className='flex md:w-1/3'>
                {priceBuilding}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a crypt'
                    disabled={hasPendingTransactions}
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
                    <FontAwesomeIcon
                      icon={faCross}
                      size='sm'
                      className='mr-1'
                    />
                    Buy 1 crypt
                  </Button>
                </span>
              </span>
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0'>
                {priceBuildingR1}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a crypt +1'
                    disabled={hasPendingTransactions}
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
            <span className='flex flex-col md:flex-row bg-slate-300'>
              <span className='flex md:w-1/3'>
                {priceBuilding}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a labo'
                    disabled={hasPendingTransactions}
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
              <span className='flex md:w-1/3 md:ml-2 mt-1 md:mt-0 mb-1'>
                {priceBuildingR1}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a labo +1'
                    disabled={hasPendingTransactions}
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

          <h2 className='text-2xl sm:text-2xl font-bold mt-12 mb-2 ml-2 mr-2'>
            Dusty Bones
          </h2>

          {(dbList === undefined || dbList.length === 0) && (
            <div className='flex'>
              <Loader />
            </div>
          )}
          {dbList !== undefined && dbList.length > 0 && (
            <div className='flex flex-col text-black bg-slate-200 w-full md:w-3/4 p-2 rounded-xl'>
              <span className='flex flex-row md:w-1/3 mb-1'>
                {priceDustyBone}
                <span>
                  <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                </span>
                <span className='ml-2'>
                  <Button
                    className='inline-block rounded-lg px-3 py-0.5 text-center hover:no-underline my-0 bg-blue-600 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
                    aria-label='Buy a dusty bone'
                    disabled={hasPendingTransactions}
                    onClick={() => {
                      confirmAlert({
                        title: 'Buy 1 dusty bone',
                        message:
                          'Are you sure you want to buy 1 dusty bone for 2000 $DUST ?',
                        buttons: [
                          {
                            label: 'Yes',
                            onClick: () =>
                              sendBuyDustyBonesTransaction(
                                {
                                  collection: nftCollectionDustyBonesId,
                                  nonce: dbList.slice(0, 1)[0].nonce
                                },
                                priceDustyBone * Math.pow(10, 18)
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
                      icon={faSkull}
                      size='sm'
                      className='mr-1'
                    />
                    Buy 1 dusty bone
                  </Button>
                </span>
              </span>
            </div>
          )}

          <span className='mb-2 mt-8'>
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
