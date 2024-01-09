import { useEffect, useState } from 'react';
import {
  faCartShopping,
  faCircleXmark,
  faPlus,
  faShop,
  faStore
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
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <div className='flex mb-1'>
          <span>
            <Label>Lands: </Label> {lands?.[0]?.balance ?? 0}
          </span>
          <span className='ml-2 mr-2'>|</span>
          <span className='flex'>
            {priceLand}
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
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
              <FontAwesomeIcon icon={faCartShopping} size='sm' className='mr-1' />
              Buy
            </Button>
          </span>
        </div>
        <div className='flex mb-1'>
          <span>
            <Label>Taverns: </Label> {taverns?.[0]?.balance ?? 0}
          </span>
          <span className='ml-2 mr-2'>|</span>
          <span className='flex'>
            {priceBuilding}
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
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
                    nonce: sftTavernNonce
                  },
                  priceBuilding * Math.pow(10, 18)
                )
              }
            >
              <FontAwesomeIcon icon={faCartShopping} size='sm' className='mr-1' />
              Buy
            </Button>
          </span>
        </div>
        <div className='flex mb-1'>
          <span>
            <Label>Banks: </Label> {banks?.[0]?.balance ?? 0}
          </span>
          <span className='ml-2 mr-2'>|</span>
          <span className='flex'>
            {priceBuilding}
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
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
                    nonce: sftBanksNonce
                  },
                  priceBuilding * Math.pow(10, 18)
                )
              }
            >
              <FontAwesomeIcon icon={faCartShopping} size='sm' className='mr-1' />
              Buy
            </Button>
          </span>
        </div>
        <div className='flex mb-1'>
          <span>
            <Label>Houses: </Label> {hauntedHouses?.[0]?.balance ?? 0}
          </span>
          <span className='ml-2 mr-2'>|</span>
          <span className='flex'>
            {priceBuilding}
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
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
                    nonce: sftHauntedHouseNonce
                  },
                  priceBuilding * Math.pow(10, 18)
                )
              }
            >
              <FontAwesomeIcon icon={faCartShopping} size='sm' className='mr-1' />
              Buy
            </Button>
          </span>
        </div>
        <div className='flex mb-1'>
          <span>
            <Label>Crypts: </Label> {crypts?.[0]?.balance ?? 0}
          </span>
          <span className='ml-2 mr-2'>|</span>
          <span className='flex'>
            {priceBuilding}
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
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
                    nonce: sftCryptNonce
                  },
                  priceBuilding * Math.pow(10, 18)
                )
              }
            >
              <FontAwesomeIcon icon={faCartShopping} size='sm' className='mr-1' />
              Buy
            </Button>
          </span>
        </div>
        <div className='flex mb-1'>
          <span>
            <Label>Labos: </Label> {labos?.[0]?.balance ?? 0}
          </span>
          <span className='ml-2 mr-2'>|</span>
          <span className='flex'>
            {priceBuilding}
            <span>
              <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
            </span>
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
                    nonce: sftLaboNonce
                  },
                  priceBuilding * Math.pow(10, 18)
                )
              }
            >
              <FontAwesomeIcon icon={faCartShopping} size='sm' className='mr-1' />
              Buy
            </Button>
          </span>
        </div>
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
