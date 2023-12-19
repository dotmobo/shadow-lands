import { useEffect, useState } from 'react';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
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
import { contractGameAddress } from 'config';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { useSendShadowLandsTransaction } from 'pages/Game/transactions';

export const Production = ({ sfts = [] }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const [currentRewards, setCurrentRewards] = useState<number>();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const { sendClaimTransaction } = useSendShadowLandsTransaction();

  useEffect(() => {
    const query = new Query({
      address: new Address(contractGameAddress),
      func: new ContractFunction('getCurrentRewards'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
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
        <p>
          <Label>Producted $DUST: </Label>
          <FormatAmount
            value={currentRewards ?? 0}
            egldLabel='$DUST'
            data-testid='balance'
          />
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
      </div>
    </OutputContainer>
  );
};
