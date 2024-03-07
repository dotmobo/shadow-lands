import { useState } from 'react';
import { contractGameAddress, contractMarketAddress } from 'config';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query,
  U64Value
} from '@multiversx/sdk-core/out';
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

  const getPriceLand = new Query({
    address: new Address(contractMarketAddress),
    func: new ContractFunction('getPriceLand'),
    args: []
  });

  const getPriceBuilding = new Query({
    address: new Address(contractMarketAddress),
    func: new ContractFunction('getPriceBuilding'),
    args: []
  });

  const getPriceChooseFaction = new Query({
    address: new Address(contractMarketAddress),
    func: new ContractFunction('getPriceChooseFaction'),
    args: []
  });

  const getMyFaction = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getMyFaction'),
    args: [new AddressValue(new Address(address))]
  });

  const getFactionMembers1 = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getFactionMembers'),
    args: [new U64Value(1)]
  });

  const getFactionMembers2 = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getFactionMembers'),
    args: [new U64Value(2)]
  });

  const getFactionMembers3 = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getFactionMembers'),
    args: [new U64Value(3)]
  });

  const getFactionMembers4 = new Query({
    address: new Address(contractGameAddress),
    func: new ContractFunction('getFactionMembers'),
    args: [new U64Value(4)]
  });

  return {
    getRewardsTokenAmountPerDay,
    getNftNonce,
    getCurrentRewards,
    getPriceLand,
    getPriceBuilding,
    getPriceChooseFaction,
    getFactionMembers1,
    getFactionMembers2,
    getFactionMembers3,
    getFactionMembers4,
    getMyFaction
  };
};
