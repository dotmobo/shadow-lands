import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const environment = EnvironmentsEnum.mainnet;

// Shadow Lands
export const mvxApiUrl = 'https://api.multiversx.com';
export const mvxExplorerUrl = 'https://explorer.multiversx.com';
export const sftCollectionId = 'SHALAN-55b9a9';
export const sftLandsId = 'SHALAN-55b9a9-01';
export const sftLandsNonce = 1;
export const sftTavernId = 'SHALAN-55b9a9-02';
export const sftTavernNonce = 2;
export const sftBanksId = 'SHALAN-55b9a9-03';
export const sftBanksNonce = 3;
export const sftHauntedHouseId = 'SHALAN-55b9a9-04';
export const sftHauntedHouseNonce = 4;
export const sftCryptId = 'SHALAN-55b9a9-05';
export const sftCryptNonce = 5;
export const sftLaboId = 'SHALAN-55b9a9-06';
export const sftLaboNonce = 6;
export const dustTokenId = 'DUST-e7e490';
export const contractGameAddress =
  'erd1qqqqqqqqqqqqqpgq6px7uzxhcsagfkguf269kj937dg766282krscvp908';
export const contractMarketAddress =
  'erd1qqqqqqqqqqqqqpgqc4s83k0ut7c2p6v3rqlddz4wtz7djhq42krs0m3afj';
export const totalYield = 30;
export const totalProducted = 5000;

// Price
export const priceLand = 150;
export const priceBuilding = 100;

// Leaderboard
export const ignoredAddresses = [
  'erd1qqqqqqqqqqqqqpgq6px7uzxhcsagfkguf269kj937dg766282krscvp908', // SC Game
  'erd1qqqqqqqqqqqqqpgqc4s83k0ut7c2p6v3rqlddz4wtz7djhq42krs0m3afj', // SC Market
  'erd1qqqqqqqqqqqqqpgqw02egr4v4wwmaxw7t98ekpyyde4l0g6l3u4s07nfsa', // Team xSafe
  'erd1hkr89plnuz6drjpy9x3w0hxmdd54n5n9d7s03gxz8yyrva4c3u4sw80sme', // NFT owner
  'erd1nz9e2kj2szyhaddpskyg3gyje373fhhun077gxscgv82ze0wy8qsqa9mfy', // Team member
  'erd19calhqrx9t9g5r46ftarljj0tgaunuc6t02zl03043wgt6tvversqx08hh', // Team member
  'erd1tzq44fl4a6yl8l7zgrvv7kpgvscq9xu05uyu6fekez9pcclvxs5stp4vgw', // Team member
  'erd1upk2p7pak0g85mu258vyvtx0857gdzvnmc0hswm32e9a8d352krsfh8cvj' // SC owner
];
