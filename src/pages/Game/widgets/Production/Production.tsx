import { useEffect, useState } from 'react';
import {
  faStar,
  faStore,
  faTruckLoading,
  faCoins
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Button } from 'components';
import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import {
  contractGameAddress,
  mvxApiUrl,
  totalProducted,
  totalYield
} from 'config';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';
import { useCallShadowLandsQuery } from 'pages/Game/queries';
import axios from 'axios';

export const Production = ({ sfts, rewardPerDay }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const { getCurrentRewards } = useCallShadowLandsQuery();

  const [currentRewards, setCurrentRewards] = useState<number>();
  const [claimStrike, setClaimStrike] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);

  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendClaimTransaction } = useSendShadowLandsTransaction();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysSinceLastMonday = (dayOfWeek + 6) % 7;

    const lastMonday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - daysSinceLastMonday,
      0,
      0,
      0,
      0
    );

    const lastMondayTimestampInSeconds = Math.floor(
      lastMonday.getTime() / 1000
    );

    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${contractGameAddress}/transactions?size=10000&function=claim&fields=timestamp&sender=${address}&after=${lastMondayTimestampInSeconds}`
      )

      .then((response) => {
        const strikes = [false, false, false, false, false, false, false];

        response.data.forEach((tx: any) => {
          const date = new Date(tx.timestamp * 1000);
          strikes[(date.getDay() + 6) % 7] = true;
        });

        setClaimStrike(strikes);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setClaimStrike([false, false, false, false, false, false, false]);
        }
      });
  }, [hasPendingTransactions]);

  useEffect(() => {
    proxy
      .queryContract(getCurrentRewards)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setCurrentRewards(0);
            break;
          case '':
            setCurrentRewards(0);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setCurrentRewards(parseInt(decoded, 16));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  const calculateWidth = (value, max) => {
    const exponent = 2;
    return (1 - Math.exp((-value / max) * exponent)) * 100 + '%';
  };

  const dayLabel = (index: number) => {
    switch (index) {
      case 0:
        return 'MON';
      case 1:
        return 'TUE';
      case 2:
        return 'WED';
      case 3:
        return 'THU';
      case 4:
        return 'FRI';
      case 5:
        return 'SAT';
      case 6:
        return 'SUN';
      default:
        return '';
    }
  };

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <div className='w-full bg-slate-200 rounded-full h-2.5 mb-1'>
          <div
            className={`bg-green-500 h-2.5 rounded-full ${
              (rewardPerDay * sfts.length) / totalYield === 1
                ? 'ring-4 ring-green-300'
                : ''
            }`}
            style={{
              width: ((rewardPerDay * sfts.length) / totalYield) * 100 + '%'
            }}
          ></div>
        </div>

        <p className='flex flex-items-center'>
          <Label>Daily yield: </Label>
          <span>{rewardPerDay * sfts.length}</span>
          <span>
            <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
          </span>
        </p>

        <div className='w-full bg-slate-200 rounded-full h-2.5 mb-1 mt-2'>
          <div
            className='bg-yellow-500 h-2.5 rounded-full animate-pulse'
            style={{
              width: calculateWidth(
                currentRewards ?? 0,
                Math.pow(10, 18) * totalProducted
              )
            }}
          ></div>
        </div>

        <p className='flex flex-items-center'>
          <Label>Claimable tokens: </Label>
          <FormatAmount
            value={BigInt(currentRewards ?? 0).toString()}
            showLabel={false}
            egldLabel='$DUST'
            digits={0}
            data-testid='balance'
          />
          <span>
            <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
          </span>
        </p>
      </div>

      <div className='flex mt-4 gap-2 text-gray-600'>
        {claimStrike.map((strike, index) =>
          strike === true ? (
            <div className='flex flex-col' key={index}>
              <span className='text-xs'>{dayLabel(index)}</span>
              <FontAwesomeIcon icon={faStar} />
            </div>
          ) : (
            <div className='flex flex-col' key={index}>
              <span className='text-xs'>{dayLabel(index)}</span>
              <FontAwesomeIcon icon={faStarRegular} />
            </div>
          )
        )}
      </div>

      <div className='flex flex-row text-black gap-4 mt-4'>
        <Button
          disabled={hasPendingTransactions || !currentRewards}
          data-testid='sign-auto-send'
          onClick={sendClaimTransaction}
        >
          <FontAwesomeIcon icon={faTruckLoading} className='mr-1' />
          Claim
        </Button>
        <Button
          className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-purple-600 text-white hover:bg-purple-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
          onClick={() =>
            (window.location.href = 'https://swap.onedex.app/farm')
          }
        >
          <FontAwesomeIcon icon={faStore} className='mr-1' />
          Farm
        </Button>
        <Button
          className='inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-purple-600 text-white hover:bg-purple-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed'
          onClick={() =>
            (window.location.href = 'https://swap.onedex.app/staking')
          }
        >
          <FontAwesomeIcon icon={faCoins} className='mr-1' />
          Stake
        </Button>
      </div>
    </OutputContainer>
  );
};
