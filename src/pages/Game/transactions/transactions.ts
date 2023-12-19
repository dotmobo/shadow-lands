import { useState } from 'react';
import { contractGameAddress, sftCollectionId, sftLandsNonce } from 'config';
import { refreshAccount, sendTransactions } from 'helpers';
import { Address } from '@multiversx/sdk-core/out';
import { numtoHex, strtoHex } from '../utils';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';

export const useSendShadowLandsTransaction = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const sendStakeLandTransaction = async () => {
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

  const sendUnstakeLandTransaction = async () => {
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
        processingMessage: 'Claiming rewards',
        errorMessage: 'Claiming rewards failed',
        successMessage: 'Claiming rewards succeeded'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendStakeBuildingTransaction = async (nonce: number) => {
    const data =
      'MultiESDTNFTTransfer@' +
      new Address(contractGameAddress).hex() +
      '@' +
      numtoHex(1) +
      '@' +
      strtoHex(sftCollectionId) +
      '@' +
      numtoHex(nonce) +
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
        processingMessage: `Adding the type ${nonce} building to the current map.`,
        errorMessage: `The type ${nonce} building could not be added. Are you sure you have an SFT?`,
        successMessage: `The type ${nonce} building has been successfully added.`
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  return {
    sendStakeLandTransaction,
    sendUnstakeLandTransaction,
    sendClaimTransaction,
    sendStakeBuildingTransaction
  };
};
