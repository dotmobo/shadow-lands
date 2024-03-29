import { useState } from 'react';
import {
  contractGameAddress,
  contractMarketAddress,
  contractMarketDbAddress,
  dustTokenId,
  priceChooseFaction,
  priceDonate,
  sftCollectionId,
  sftLandsNonce
} from 'config';
import { refreshAccount, sendTransactions } from 'helpers';
import { Address } from '@multiversx/sdk-core/out';
import { largeNumberToHex, numtoHex, strtoHex } from '../utils';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { Sft } from '../models';

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
      receiver: contractGameAddress,
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

  const sendBuyItemTransaction = async (sft: Sft, price: number) => {
    const getBuyItemData = (item: Sft) => {
      return (
        'ESDTTransfer@' +
        strtoHex(dustTokenId) +
        '@' +
        largeNumberToHex(
          !!price
            ? price.toLocaleString('fullwide', { useGrouping: false })
            : '0'
        ) +
        '@' +
        strtoHex('buy') +
        '@' +
        strtoHex(item.collection) +
        '@' +
        numtoHex(item.nonce)
      );
    };
    const buyItemTransaction = {
      value: '0',
      data: getBuyItemData(sft),
      receiver: contractMarketAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: buyItemTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing buy item transaction',
        errorMessage: 'An error has occured during buy item',
        successMessage: 'Buy item transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendBuyDustyBonesTransaction = async (sft: Sft, price: number) => {
    const getBuyItemData = (item: Sft) => {
      return (
        'ESDTTransfer@' +
        strtoHex(dustTokenId) +
        '@' +
        largeNumberToHex(
          !!price
            ? price.toLocaleString('fullwide', { useGrouping: false })
            : '0'
        ) +
        '@' +
        strtoHex('buy') +
        '@' +
        strtoHex(item.collection) +
        '@' +
        numtoHex(item.nonce)
      );
    };
    const buyDustyBonesTransaction = {
      value: '0',
      data: getBuyItemData(sft),
      receiver: contractMarketDbAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: buyDustyBonesTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing buy item transaction',
        errorMessage: 'An error has occured during buy item',
        successMessage: 'Buy item transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendChooseFactionTransaction = async (faction: number) => {
    const getChooseFactionData = (f: number) => {
      const price = priceChooseFaction * Math.pow(10, 18);
      return (
        'ESDTTransfer@' +
        strtoHex(dustTokenId) +
        '@' +
        largeNumberToHex(
          price.toLocaleString('fullwide', { useGrouping: false })
        ) +
        '@' +
        strtoHex('choose_faction') +
        '@' +
        numtoHex(f)
      );
    };
    const buyChooseFactionTransaction = {
      value: '0',
      data: getChooseFactionData(faction),
      receiver: contractGameAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: buyChooseFactionTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing choose faction transaction',
        errorMessage: 'An error has occured during choose faction',
        successMessage: 'Choose faction transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendDonateFaction = async (faction: number) => {
    const getDonateFactionData = (f: number) => {
      const price = priceDonate * Math.pow(10, 18);
      return (
        'ESDTTransfer@' +
        strtoHex(dustTokenId) +
        '@' +
        largeNumberToHex(
          price.toLocaleString('fullwide', { useGrouping: false })
        ) +
        '@' +
        strtoHex('donate') +
        '@' +
        numtoHex(f)
      );
    };
    const donateFactionTransaction = {
      value: '0',
      data: getDonateFactionData(faction),
      receiver: contractGameAddress,
      gasLimit: '5000000'
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: donateFactionTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing donate transaction',
        errorMessage: 'An error has occured during donate',
        successMessage: 'Donate transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const sendReferTransaction = async (referrer: string) => {
    const referTransaction = {
      value: '0',
      data: 'refer@' + Address.fromBech32(referrer).hex(),
      receiver: contractGameAddress,
      gasLimit: 20000000
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: referTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Refering a friend',
        errorMessage: 'Refering a friend failed',
        successMessage: 'Refering a friend succeeded'
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
    sendStakeBuildingTransaction,
    sendBuyItemTransaction,
    sendBuyDustyBonesTransaction,
    sendChooseFactionTransaction,
    sendDonateFaction,
    sendReferTransaction
  };
};
