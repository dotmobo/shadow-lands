import { useEffect, useState } from 'react';
import {
  faBeer,
  faBuildingColumns,
  faCartShopping,
  faCircleXmark,
  faCross,
  faFlaskVial,
  faHouse,
  faPlus,
  faShop,
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
  sftLaboNonce
} from 'config';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { Sft, Token } from 'pages/Game/models';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';

export const Account = ({
  sfts = [],
  outputTaverns,
  outputBanks,
  outputHauntedHouses,
  outputLabos,
  outputCrypts
}) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const [lands, setLandsList] = useState<Sft[]>();
  const [taverns, setTavernsList] = useState<Sft[]>();
  const [banks, setBanksList] = useState<Sft[]>();
  const [hauntedHouses, setHauntedHousesList] = useState<Sft[]>();
  const [crypts, setCryptsList] = useState<Sft[]>();
  const [labos, setLabosList] = useState<Sft[]>();
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
        `${mvxApiUrl}/accounts/${address}/nfts?size=3330&identifiers=${sftLandsId},${sftTavernId},${sftBanksId},${sftHauntedHouseId},${sftCryptId},${sftLaboId}`
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
      });
  }, [hasPendingTransactions]);

  return (
    <OutputContainer>
      <div className='flex flex-row'>
        <div className='flex flex-col text-black'>
          <span className='mb-2'>
            <FontAwesomeIcon icon={faTree} size='sm' className='mr-1' />
            <Label>Lands: </Label> {lands?.[0]?.balance ?? 0}
          </span>
          <span className='mb-2'>
            <FontAwesomeIcon icon={faBeer} size='sm' className='mr-1' />
            <Label>Taverns: </Label> {taverns?.[0]?.balance ?? 0}
          </span>
          <span className='mb-2'>
            <FontAwesomeIcon
              icon={faBuildingColumns}
              size='sm'
              className='mr-1'
            />
            <Label>Banks: </Label> {banks?.[0]?.balance ?? 0}
          </span>
          <span className='mb-2'>
            <FontAwesomeIcon icon={faHouse} size='sm' className='mr-1' />
            <Label>Houses: </Label> {hauntedHouses?.[0]?.balance ?? 0}
          </span>
          <span className='mb-2'>
            <FontAwesomeIcon icon={faCross} size='sm' className='mr-1' />
            <Label>Crypts: </Label> {crypts?.[0]?.balance ?? 0}
          </span>
          <span className='mb-2'>
            <FontAwesomeIcon icon={faFlaskVial} size='sm' className='mr-1' />
            <Label>Labos: </Label> {labos?.[0]?.balance ?? 0}
          </span>
        </div>

        <div className='flex flex-col text-black ml-auto'>
          <span className='flex mb-1'>
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
                onClick={() =>
                  sendBuyItemTransaction(
                    {
                      collection: sftCollectionId,
                      nonce: sftLandsNonce
                    },
                    priceLand * Math.pow(10, 18)
                  )
                }
              >
                <FontAwesomeIcon icon={faTree} size='sm' className='mr-1' />
                Buy 1 land
              </Button>
            </span>
          </span>
          <span className='flex mb-1'>
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
                onClick={() =>
                  sendBuyItemTransaction(
                    {
                      collection: sftCollectionId,
                      nonce: sftTavernNonce
                    },
                    priceBuilding * Math.pow(10, 18)
                  )
                }
              >
                <FontAwesomeIcon icon={faBeer} size='sm' className='mr-1' />
                Buy 1 tavern
              </Button>
            </span>
          </span>
          <span className='flex mb-1'>
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
                onClick={() =>
                  sendBuyItemTransaction(
                    {
                      collection: sftCollectionId,
                      nonce: sftBanksNonce
                    },
                    priceBuilding * Math.pow(10, 18)
                  )
                }
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
          <span className='flex mb-1'>
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
                onClick={() =>
                  sendBuyItemTransaction(
                    {
                      collection: sftCollectionId,
                      nonce: sftHauntedHouseNonce
                    },
                    priceBuilding * Math.pow(10, 18)
                  )
                }
              >
                <FontAwesomeIcon icon={faHouse} size='sm' className='mr-1' />
                Buy 1 house
              </Button>
            </span>
          </span>
          <span className='flex mb-1'>
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
                onClick={() =>
                  sendBuyItemTransaction(
                    {
                      collection: sftCollectionId,
                      nonce: sftCryptNonce
                    },
                    priceBuilding * Math.pow(10, 18)
                  )
                }
              >
                <FontAwesomeIcon icon={faCross} size='sm' className='mr-1' />
                Buy 1 crypt
              </Button>
            </span>
          </span>
          <span className='flex mb-1'>
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
                onClick={() =>
                  sendBuyItemTransaction(
                    {
                      collection: sftCollectionId,
                      nonce: sftLaboNonce
                    },
                    priceBuilding * Math.pow(10, 18)
                  )
                }
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
        </div>
      </div>

      <div className='flex flex-col text-black'>
        <p className='flex items-center mt-4'>
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
      <div className='flex text-black gap-2 mt-4' data-testid='topInfo'>
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
          onClick={sendUnstakeLandTransaction}
        >
          <FontAwesomeIcon icon={faCircleXmark} className='mr-1' />
          Destroy the land
        </Button>
      </div>
    </OutputContainer>
  );
};
