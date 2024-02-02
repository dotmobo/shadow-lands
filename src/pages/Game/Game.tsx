import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Button, Card, MxLink } from 'components';
import {
  contractGameAddress,
  sftBankR1Nonce,
  sftBanksNonce,
  sftCryptNonce,
  sftCryptR1Nonce,
  sftHauntedHouseNonce,
  sftHauntedHouseR1Nonce,
  sftLaboNonce,
  sftLaboR1Nonce,
  sftLandsNonce,
  sftTavernNonce,
  sftTavernR1Nonce
} from 'config';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import { Map } from './Map';
import { Sft, WidgetsType } from './models';
import { Account } from './widgets/Account';
import { Production } from './widgets/Production/Production';
import { useCallShadowLandsQuery } from './queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBeer,
  faBook,
  faBuildingColumns,
  faCross,
  faEye,
  faEyeSlash,
  faFlaskVial,
  faHouse,
  faPause,
  faPlay,
  faQuestion,
  faRankingStar,
  faRotate,
  faTree
} from '@fortawesome/free-solid-svg-icons';
import { RouteNamesEnum } from 'localConstants';
import LecteurAudio from 'components/LecteurAudio/LecteurAudio';

const WIDGETS: WidgetsType[] = [
  {
    title: 'Wallet & Market',
    widget: Account,
    description: 'Balance of your wallet'
  },
  {
    title: 'Farm',
    widget: Production,
    description: '$DUST producted by your land'
  }
];

export const Game = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const [taverns, setTavernsList] = useState<Sft[]>([]);
  const [banks, setBanksList] = useState<Sft[]>([]);
  const [hauntedHouses, setHauntedHousesList] = useState<Sft[]>([]);
  const [crypts, setCryptsList] = useState<Sft[]>([]);
  const [labos, setLabosList] = useState<Sft[]>([]);

  const [tavernsR1, setTavernsR1List] = useState<Sft[]>([]);
  const [banksR1, setBanksR1List] = useState<Sft[]>([]);
  const [hauntedHousesR1, setHauntedHousesR1List] = useState<Sft[]>([]);
  const [cryptsR1, setCryptsR1List] = useState<Sft[]>([]);
  const [labosR1, setLabosR1List] = useState<Sft[]>([]);

  const [rewardsTokenAmountPerDay, setRewardsTokenAmountPerDay] =
    useState<number>(0);
  const { getRewardsTokenAmountPerDay, getNftNonce } =
    useCallShadowLandsQuery();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const [sfts, setSftsList] = useState<number[]>();

  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [fpsView, setFpsView] = useState<boolean>(false);

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

  useEffect(() => {
    proxy
      .queryContract(getNftNonce)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setSftsList([]);
            break;
          case '':
            setSftsList([]);
            break;
          default: {
            const decoded: Uint8Array = Buffer.from(encoded, 'base64');
            const filteredNumbers = Array.from(decoded).filter(
              (x, i) => (i + 1) % 8 === 0
            );
            setSftsList(filteredNumbers);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  useEffect(() => {
    proxy
      .queryContract(getRewardsTokenAmountPerDay)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setRewardsTokenAmountPerDay(0);
            break;
          case '':
            setRewardsTokenAmountPerDay(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setRewardsTokenAmountPerDay(
              parseInt(decoded, 16) / Math.pow(10, 18)
            );
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  return (
    <AuthRedirectWrapper>
      <PageWrapper>
        <div className='flex flex-col lg:flex-row items-center h-full w-full'>
          <div className='flex flex-col items-start lg:items-center h-screen lg:h-full w-full lg:bg-center bg-slate-900'>
            {sfts !== undefined && (
              <>
                <div className='flex w-full ml-1.5 mt-2 mb-2 text-slate-300'>
                  <span className='mr-1.5'>
                    <LecteurAudio src='/music.mp3' />
                  </span>
                  <span className='mr-1.5'>
                    <Button
                      aria-label='toggle auto rotate'
                      onClick={() => {
                        setAutoRotate(!autoRotate);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faRotate}
                        size='sm'
                        className='mr-1.5'
                      />
                      {autoRotate && (
                        <FontAwesomeIcon icon={faPause} size='sm' />
                      )}
                      {!autoRotate && (
                        <FontAwesomeIcon icon={faPlay} size='sm' />
                      )}
                    </Button>
                  </span>
                  <Button
                    aria-label='toggle fps view'
                    onClick={() => {
                      setFpsView(!fpsView);
                    }}
                  >
                    {fpsView && <FontAwesomeIcon icon={faEye} size='sm' />}
                    {!fpsView && (
                      <FontAwesomeIcon icon={faEyeSlash} size='sm' />
                    )}
                  </Button>
                  <span className='ml-1.5'>
                    <MxLink to={RouteNamesEnum.cards}>
                      <FontAwesomeIcon icon={faBook} size='sm' />
                    </MxLink>
                  </span>
                  <span className='ml-1.5'>
                    <MxLink to={RouteNamesEnum.leaderboard}>
                      <FontAwesomeIcon icon={faRankingStar} size='sm' />
                    </MxLink>
                  </span>
                  <span className='ml-1.5'>
                    <MxLink to={RouteNamesEnum.help}>
                      <FontAwesomeIcon icon={faQuestion} size='sm' />
                    </MxLink>
                  </span>
                </div>
                <div className='flex w-full justify-center gap-4 text-slate-300'>
                  <span title='Land'>
                    <FontAwesomeIcon icon={faTree} size='sm' />{' '}
                    {sfts.filter((x) => x === sftLandsNonce).length} / 1
                  </span>
                  <span title='Tavern'>
                    <FontAwesomeIcon icon={faBeer} size='sm' />{' '}
                    {sfts.filter((x) => x === sftTavernNonce).length}
                    {sfts.filter((x) => x === sftTavernR1Nonce).length > 0 && (
                      <span className='text-sm'>&nbsp;(+1)</span>
                    )}
                    {sfts.filter((x) => x === sftTavernR1Nonce).length ===
                      0 && <span className='text-sm'>&nbsp;(+0)</span>}
                    &nbsp;/&nbsp;1
                  </span>
                  <span title='Bank'>
                    <FontAwesomeIcon icon={faBuildingColumns} size='sm' />{' '}
                    {sfts.filter((x) => x === sftBanksNonce).length}
                    {sfts.filter((x) => x === sftBankR1Nonce).length > 0 && (
                      <span className='text-sm'>&nbsp;(+1)</span>
                    )}
                    {sfts.filter((x) => x === sftBankR1Nonce).length === 0 && (
                      <span className='text-sm'>&nbsp;(+0)</span>
                    )}
                    &nbsp;/&nbsp;1
                  </span>
                </div>
                <div className='flex w-full mt-2 justify-center gap-4 text-slate-300'>
                  <span title='Haunted House'>
                    <FontAwesomeIcon icon={faHouse} size='sm' />{' '}
                    {sfts.filter((x) => x === sftHauntedHouseNonce).length}
                    {sfts.filter((x) => x === sftHauntedHouseR1Nonce).length >
                      0 && <span className='text-sm'>&nbsp;(+1)</span>}
                    {sfts.filter((x) => x === sftHauntedHouseR1Nonce).length ===
                      0 && <span className='text-sm'>&nbsp;(+0)</span>}
                    &nbsp;/&nbsp;1
                  </span>
                  <span title='Crypt'>
                    <FontAwesomeIcon icon={faCross} size='sm' />{' '}
                    {sfts.filter((x) => x === sftCryptNonce).length}
                    {sfts.filter((x) => x === sftCryptR1Nonce).length > 0 && (
                      <span className='text-sm'>&nbsp;(+1)</span>
                    )}
                    {sfts.filter((x) => x === sftCryptR1Nonce).length === 0 && (
                      <span className='text-sm'>&nbsp;(+0)</span>
                    )}
                    &nbsp;/&nbsp;1
                  </span>
                  <span title='Laboratory'>
                    <FontAwesomeIcon icon={faFlaskVial} size='sm' />{' '}
                    {sfts.filter((x) => x === sftLaboNonce).length}
                    {sfts.filter((x) => x === sftLaboR1Nonce).length > 0 && (
                      <span className='text-sm'>&nbsp;(+1)</span>
                    )}
                    {sfts.filter((x) => x === sftLaboR1Nonce).length === 0 && (
                      <span className='text-sm'>&nbsp;(+0)</span>
                    )}
                  </span>
                </div>
                {sfts.filter((x) => x === sftLandsNonce).length > 0 && (
                  <Map
                    sfts={sfts}
                    walletTaverns={taverns}
                    walletBanks={banks}
                    walletHauntedHouses={hauntedHouses}
                    walletCrypts={crypts}
                    walletLabos={labos}
                    walletTavernsR1={tavernsR1}
                    walletBanksR1={banksR1}
                    walletHauntedHousesR1={hauntedHousesR1}
                    walletCryptsR1={cryptsR1}
                    walletLabosR1={labosR1}
                    rewardsPerDay={rewardsTokenAmountPerDay}
                    defaultAutoRotate={autoRotate}
                    fpsView={fpsView}
                  />
                )}
              </>
            )}
          </div>
          <div className='flex items-start lg:items-center h-full w-full lg:w-1/2 lg:bg-center bg-slate-900 pr-4 pl-4'>
            <div className='flex flex-col gap-4 max-w-3xl w-full'>
              {sfts !== undefined &&
                WIDGETS.map((element) => {
                  const {
                    title,
                    widget: MxWidget,
                    description,
                    props = {}
                  } = element;

                  props['sfts'] = sfts;
                  props['rewardPerDay'] = rewardsTokenAmountPerDay;
                  props['outputTaverns'] = setTavernsList;
                  props['outputBanks'] = setBanksList;
                  props['outputHauntedHouses'] = setHauntedHousesList;
                  props['outputCrypts'] = setCryptsList;
                  props['outputLabos'] = setLabosList;
                  props['outputTavernsR1'] = setTavernsR1List;
                  props['outputBanksR1'] = setBanksR1List;
                  props['outputHauntedHousesR1'] = setHauntedHousesR1List;
                  props['outputCryptsR1'] = setCryptsR1List;
                  props['outputLabosR1'] = setLabosR1List;

                  return (
                    <Card key={title} title={title} description={description}>
                      <MxWidget {...props} />
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
