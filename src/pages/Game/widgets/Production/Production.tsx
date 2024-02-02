import { useEffect, useState } from 'react';
import { faStore, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Button } from 'components';
import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import { contractGameAddress, totalProducted, totalYield } from 'config';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';
import { useCallShadowLandsQuery } from 'pages/Game/queries';

export const Production = ({ sfts, rewardPerDay }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const { getCurrentRewards } = useCallShadowLandsQuery();

  const [currentRewards, setCurrentRewards] = useState<number>();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendClaimTransaction } = useSendShadowLandsTransaction();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

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

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <div className='w-full bg-slate-200 rounded-full h-2.5 mb-1'>
          <div
            className='bg-green-500 h-2.5 rounded-full'
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
            className='bg-yellow-500 h-2.5 rounded-full'
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
            value={currentRewards ?? 0}
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
      <div className='flex text-black gap-4 mt-4'>
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
          onClick={() => window.open('https://swap.onedex.app/farm')}
        >
          <FontAwesomeIcon icon={faStore} className='mr-1' />
          External Farm
        </Button>
      </div>
    </OutputContainer>
  );
};
