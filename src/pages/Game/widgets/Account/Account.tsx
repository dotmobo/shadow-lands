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
  faShop,
  faStore,
  faTree
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { orderBy } from 'lodash';
import { Button, MxLink } from 'components';
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
  sftTavernR1Id,
  sftBankR1Id,
  sftHauntedHouseR1Id,
  sftCryptR1Id,
  sftLaboR1Id,
  sftTavernR2Id,
  sftBankR2Id,
  sftHauntedHouseR2Id,
  sftCryptR2Id,
  sftLaboR2Id
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
import { RouteNamesEnum } from 'localConstants';

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
  outputLabosR1,
  outputTavernsR2,
  outputBanksR2,
  outputHauntedHousesR2,
  outputCryptsR2,
  outputLabosR2
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

  const [tavernsR2, setTavernsR2] = useState<Sft[]>();
  const [banksR2, setBanksR2] = useState<Sft[]>();
  const [hauntedHousesR2, setHauntedHousesR2] = useState<Sft[]>();
  const [cryptsR2, setCryptsR2] = useState<Sft[]>();
  const [labosR2, setLabosR2] = useState<Sft[]>();

  const [dust, setDustToken] = useState<Token | null>();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendStakeLandTransaction, sendUnstakeLandTransaction } =
    useSendShadowLandsTransaction();

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
        `${mvxApiUrl}/accounts/${address}/nfts?size=3330&identifiers=${sftLandsId},${sftTavernId},${sftBanksId},${sftHauntedHouseId},${sftCryptId},${sftLaboId},${sftTavernR1Id},${sftBankR1Id},${sftHauntedHouseR1Id},${sftCryptR1Id},${sftLaboR1Id},${sftTavernR2Id},${sftBankR2Id},${sftHauntedHouseR2Id},${sftCryptR2Id},${sftLaboR2Id}`
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
        // Taverns R2
        const tavernsR2 = res.filter((x) => x.identifier === sftTavernR2Id);
        setTavernsR2(tavernsR2);
        outputTavernsR2(tavernsR2);
        // Banks R2
        const banksR2 = res.filter((x) => x.identifier === sftBankR2Id);
        setBanksR2(banksR2);
        outputBanksR2(banksR2);
        // Haunted Houses R2
        const hauntedHousesR2 = res.filter(
          (x) => x.identifier === sftHauntedHouseR2Id
        );
        setHauntedHousesR2(hauntedHousesR2);
        outputHauntedHousesR2(hauntedHousesR2);
        // Crypts R2
        const cryptsR2 = res.filter((x) => x.identifier === sftCryptR2Id);
        setCryptsR2(cryptsR2);
        outputCryptsR2(cryptsR2);
        // Labos R2
        const labosR2 = res.filter((x) => x.identifier === sftLaboR2Id);
        setLabosR2(labosR2);
        outputLabosR2(labosR2);
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
            <label className='text-gray-600 hidden md:inline'>
              Lands
            </label>: {lands?.[0]?.balance ?? 0}
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faBeer} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>
                Taverns
              </label>: {taverns?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+1</label>:{' '}
              {tavernsR1?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+2</label>:{' '}
              {tavernsR2?.[0]?.balance ?? 0}
            </span>
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon
                icon={faBuildingColumns}
                size='sm'
                className='mr-1'
              />
              <label className='text-gray-600 hidden md:inline'>Banks</label>:{' '}
              {banks?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+1</label>:{' '}
              {banksR1?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+2</label>:{' '}
              {banksR2?.[0]?.balance ?? 0}
            </span>
          </span>
        </div>
        <div className='flex flex-row text-black mt-2'>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faHouse} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>
                Houses
              </label>: {hauntedHouses?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+1</label>:{' '}
              {hauntedHousesR1?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+2</label>:{' '}
              {hauntedHousesR2?.[0]?.balance ?? 0}
            </span>
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faCross} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>
                Crypts
              </label>: {crypts?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+1</label>:{' '}
              {cryptsR1?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+2</label>:{' '}
              {cryptsR2?.[0]?.balance ?? 0}
            </span>
          </span>
          <span className='flex flex-col w-1/3'>
            <span>
              <FontAwesomeIcon icon={faFlaskVial} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>
                Labos
              </label>: {labos?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+1</label>:{' '}
              {labosR1?.[0]?.balance ?? 0}
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <FontAwesomeIcon icon={faArrowUp} size='sm' className='mr-1' />
              <label className='text-gray-600 hidden md:inline'>+2</label>:{' '}
              {labosR2?.[0]?.balance ?? 0}
            </span>
          </span>
        </div>
      </div>

      <hr className='mt-2 mb-2' />

      <div className='flex flex-row text-black mt-4 gap-4'>
        <MxLink to={RouteNamesEnum.market}>
          <FontAwesomeIcon icon={faShop} className='mr-1' />
          Dust Market
        </MxLink>

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
      </div>

      <hr className='mt-2 mb-2' />

      <div className='flex flex-row text-black mt-4 gap-4'>
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
      </div>
    </OutputContainer>
  );
};
