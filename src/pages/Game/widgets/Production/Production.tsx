import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  contractGameAddress,
  dustTokenId,
  mvxApiUrl,
  sftCollectionId,
  sftCryptId,
  sftHauntedHouseId,
  sftLandsId,
  sftLandsNonce
} from 'config';
import { orderBy } from 'lodash';
import { Button } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faMoneyBill, faTruckLoading, faTruckPickup } from '@fortawesome/free-solid-svg-icons';
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { refreshAccount } from '@multiversx/sdk-dapp/utils/account/refreshAccount';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@multiversx/sdk-core/out';
import { Sft, Token } from 'pages/Game/models';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';

export const Production = ({ sfts = [] }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const [currentRewards, setCurrentRewards] = useState<number>();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

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

  const sendClaimTransaction = async () => {
    const claimTransaction = {
      value: '0',
      data: 'claim',
      receiver: address,
      gasLimit: 20000000
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: claimTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing claim transaction',
        errorMessage: 'An error has occured during claim',
        successMessage: 'Claim transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

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
