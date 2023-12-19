import { useEffect, useState } from 'react';
import {
  faArrowDown,
  faArrowUp,
  faCirclePlus,
  faCircleXmark,
  faCross,
  faPlus,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Address } from '@multiversx/sdk-core/out';
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';
import { refreshAccount } from '@multiversx/sdk-dapp/utils/account/refreshAccount';
import axios from 'axios';
import { orderBy } from 'lodash';
import { Button } from 'components';
import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
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
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { Sft, Token } from 'pages/Game/models';
import { numtoHex, strtoHex } from 'pages/Game/utils';

export const Account = ({ sfts = [], outputCrypts }) => {
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
        const res = orderBy(
          response.data,
          ['collection', 'nonce'],
          ['desc', 'asc']
        );
        setCryptsList(res);
        outputCrypts(res);
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
        processingMessage: 'Adding the land.',
        errorMessage:
          'The land could not be added. Are you sure you have an SFT?',
        successMessage: 'The land has been successfully added.'
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
        processingMessage: 'Destroying the land.',
        errorMessage: 'Impossible to destroy the land.',
        successMessage: 'The land has been successfully destroyed.'
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
          onClick={sendUnstakeTransaction}
        >
          <FontAwesomeIcon icon={faCircleXmark} className='mr-1' />
          Destroy the land
        </Button>
      </div>
    </OutputContainer>
  );
};
