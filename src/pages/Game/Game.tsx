import { useEffect, useState } from 'react';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Card } from 'components';
import {
  contractGameAddress,
  sftBanksNonce,
  sftLandsNonce,
  sftTavernNonce
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
  faBuildingColumns,
  faTree,
} from '@fortawesome/free-solid-svg-icons';

const WIDGETS: WidgetsType[] = [
  {
    title: 'Wallet',
    widget: Account,
    description: 'Balance of your wallet',
    reference: 'https://dusty-bones.netlify.app/'
  },
  {
    title: 'Farm',
    widget: Production,
    description: '$DUST producted by your land',
    reference: 'https://dusty-bones.netlify.app/'
  }
];

export const Game = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const [taverns, setTavernsList] = useState<Sft[]>([]);
  const [banks, setBanksList] = useState<Sft[]>([]);
  const [rewardsTokenAmountPerDay, setRewardsTokenAmountPerDay] =
    useState<number>(0);
  const { getRewardsTokenAmountPerDay, getNftNonce } =
    useCallShadowLandsQuery();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const [sfts, setSftsList] = useState<number[]>();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 3000
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
        <div className='flex flex-col sm:flex-row items-center h-full w-full'>
          <div className='flex flex-col items-start sm:items-center h-screen sm:h-full w-full sm:bg-center bg-slate-900'>
            {sfts !== undefined &&
              sfts.filter((x) => x === sftLandsNonce).length > 0 && (
                <>
                  <div className='flex w-full mt-4 justify-center gap-5 text-slate-300'>
                    <span title='Land'>
                      <FontAwesomeIcon icon={faTree} size='sm' />{' '}
                      {sfts.filter((x) => x === sftLandsNonce).length} / 1
                    </span>
                    <span title='Tavern'>
                      <FontAwesomeIcon icon={faBeer} size='sm' />{' '}
                      {sfts.filter((x) => x === sftTavernNonce).length} / 1
                    </span>
                    <span title='Bank'>
                      <FontAwesomeIcon icon={faBuildingColumns} size='sm' />{' '}
                      {sfts.filter((x) => x === sftBanksNonce).length} / 1
                    </span>
                  </div>
                  <Map
                    sfts={sfts}
                    walletTaverns={taverns}
                    walletBanks={banks}
                    rewardsPerDay={rewardsTokenAmountPerDay}
                  />
                </>
              )}
          </div>
          <div className='flex items-start sm:items-center h-full w-full sm:w-1/2 sm:bg-center bg-slate-900 pr-4 pl-4'>
            <div className='flex flex-col gap-6 max-w-3xl w-full'>
              {sfts !== undefined &&
                WIDGETS.map((element) => {
                  const {
                    title,
                    widget: MxWidget,
                    description,
                    props = {},
                    reference
                  } = element;

                  props['sfts'] = sfts;
                  props['rewardPerDay'] = rewardsTokenAmountPerDay;
                  props['outputTaverns'] = setTavernsList;
                  props['outputBanks'] = setBanksList;

                  return (
                    <Card
                      key={title}
                      title={title}
                      description={description}
                      reference={reference}
                    >
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
