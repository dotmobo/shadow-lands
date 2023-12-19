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
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { refreshAccount } from '@multiversx/sdk-dapp/utils/account/refreshAccount';
import { Address } from '@multiversx/sdk-core/out';
import { numtoHex, strtoHex } from 'pages/Game/utils';
import { Sft, Token } from 'pages/Game/models';

export const Account = ({ sfts = [] }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const [lands, setLandsList] = useState<Sft[]>();
  const [crypts, setCryptsList] = useState<Sft[]>();
  const [hauntedHouses, setHauntedHousesList] = useState<Sft[]>();
  const [dust, setDustToken] = useState<Token | null>();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

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
        `${mvxApiUrl}/accounts/${address}/nfts?size=25&identifiers=${sftLandsId}`
      )
      .then((response) => {
        setLandsList(
          orderBy(response.data, ['collection', 'nonce'], ['desc', 'asc'])
        );
      });
  }, [hasPendingTransactions]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${address}/nfts?size=25&identifiers=${sftCryptId}`
      )
      .then((response) => {
        setCryptsList(
          orderBy(response.data, ['collection', 'nonce'], ['desc', 'asc'])
        );
      });
  }, [hasPendingTransactions]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${address}/nfts?size=25&identifiers=${sftHauntedHouseId}`
      )
      .then((response) => {
        setHauntedHousesList(
          orderBy(response.data, ['collection', 'nonce'], ['desc', 'asc'])
        );
      });
  }, [hasPendingTransactions]);

  const sendStakeTransaction = async () => {
    const data =
      'MultiESDTNFTTransfer@' +
      new Address(contractGameAddress).hex() +
      '@' +
      numtoHex(1) +
      '@' +
      strtoHex(sftCollectionId) +
      '@' +
      numtoHex(sftLandsNonce) +
      '@' +
      numtoHex(1) +
      '@' +
      strtoHex('stake');

    const stakeTransaction = {
      value: '0',
      data: data,
      receiver: address,
      gasLimit: 10000000
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing stake transaction',
        errorMessage: 'An error has occured during stake',
        successMessage: 'Stake transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendUnstakeTransaction = async () => {
    const unstakeTransaction = {
      value: '0',
      data: 'unstake',
      receiver: contractGameAddress,
      gasLimit: 10000000
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: unstakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing unstake transaction',
        errorMessage: 'An error has occured during unstake',
        successMessage: 'Unstake transaction successful'
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
          <Label>Lands: </Label> {lands?.[0]?.balance ?? 0}
        </p>
        <p>
          <Label>Crypts: </Label> {crypts?.[0]?.balance ?? 0}
        </p>
        <p>
          <Label>Haunted Houses: </Label> {hauntedHouses?.[0]?.balance ?? 0}
        </p>
        <p>
          <Label>$DUST: </Label>
          <FormatAmount
            value={dust?.balance ?? 0}
            egldLabel='$DUST'
            data-testid='balance'
          />
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
          onClick={sendStakeTransaction}
        >
          <FontAwesomeIcon icon={faArrowUp} className='mr-1' />
          Add a land
        </Button>
        <Button
          disabled={
            hasPendingTransactions ||
            sfts.filter((x) => x === sftLandsNonce).length === 0
          }
          data-testid='sign-auto-send'
          onClick={sendUnstakeTransaction}
        >
          <FontAwesomeIcon icon={faArrowDown} className='mr-1' />
          Remove a land
        </Button>
      </div>
    </OutputContainer>
  );
};
