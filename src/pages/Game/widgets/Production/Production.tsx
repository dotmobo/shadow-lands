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
import { contractGameAddress, priceBasicBuilding } from 'config';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';
import { useCallShadowLandsQuery } from 'pages/Game/queries';

export const Production = ({ sfts = [] }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const { getCurrentRewards } = useCallShadowLandsQuery();

  const [currentRewards, setCurrentRewards] = useState<number>();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendClaimTransaction } = useSendShadowLandsTransaction();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 3000
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

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <div className='w-full bg-slate-200 rounded-full h-2.5 mb-1'>
          <div
            className='bg-green-500 h-2.5 rounded-full'
            style={{
              width:
                ((currentRewards ?? 0) /
                  1000000000000000000 /
                  priceBasicBuilding) *
                  100 +
                '%'
            }}
          ></div>
        </div>

        <p className='flex flex-items-center'>
          <Label>Producted $DUST: </Label>
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
      <div className='flex text-black gap-2 mt-4' data-testid='topInfo'>
        <Button
          disabled={hasPendingTransactions || !currentRewards}
          data-testid='sign-auto-send'
          onClick={sendClaimTransaction}
        >
          <FontAwesomeIcon icon={faTruckLoading} className='mr-1' />
          Claim
        </Button>
        <Button
          onClick={() =>
            window.open('https://www.frameit.gg/marketplace/DUSTYBONES-c1fc90')
          }
        >
          <FontAwesomeIcon icon={faStore} className='mr-1' />
          Market
        </Button>
      </div>
    </OutputContainer>
  );
};
