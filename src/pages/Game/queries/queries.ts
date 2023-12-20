import { useState } from 'react';
import { contractGameAddress, sftCollectionId, sftLandsNonce } from 'config';
import { refreshAccount, sendTransactions } from 'helpers';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@multiversx/sdk-core/out';
import { numtoHex, strtoHex } from '../utils';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';

export const useCallShadowLandsQuery = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const getRewardsTokenAmountPerDay = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getRewardsTokenAmountPerDay'),
    args: []
  });

  const getNftNonce = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getNftNonce'),
    args: [new AddressValue(new Address(address))]
  });

  const getCurrentRewards = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getCurrentRewards'),
    args: [new AddressValue(new Address(address))]
  });

  return {
    getRewardsTokenAmountPerDay,
    getNftNonce,
    getCurrentRewards
  };
};
