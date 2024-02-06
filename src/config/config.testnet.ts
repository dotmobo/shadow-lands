import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const environment = EnvironmentsEnum.devnet;

// Shadow Lands
export const mvxApiUrl = 'https://devnet-api.multiversx.com';
export const mvxExplorerUrl = 'https://devnet-explorer.multiversx.com';
export const sftCollectionId = 'DEVSHALAN-933f80';
// Buildings
export const sftLandsId = 'DEVSHALAN-933f80-01';
export const sftLandsNonce = 1;
export const sftTavernId = 'DEVSHALAN-933f80-02';
export const sftTavernNonce = 2;
export const sftBanksId = 'DEVSHALAN-933f80-04';
export const sftBanksNonce = 4;
export const sftHauntedHouseId = 'DEVSHALAN-933f80-05';
export const sftHauntedHouseNonce = 5;
export const sftCryptId = 'DEVSHALAN-933f80-06';
export const sftCryptNonce = 6;
export const sftLaboId = 'DEVSHALAN-933f80-07';
export const sftLaboNonce = 7;
// Upgrade +1
export const sftTavernR1Id = 'DEVSHALAN-933f80-08';
export const sftTavernR1Nonce = 8;
export const sftBankR1Id = 'DEVSHALAN-933f80-09';
export const sftBankR1Nonce = 9;
export const sftHauntedHouseR1Id = 'DEVSHALAN-933f80-0a';
export const sftHauntedHouseR1Nonce = 10;
export const sftCryptR1Id = 'DEVSHALAN-933f80-0b';
export const sftCryptR1Nonce = 11;
export const sftLaboR1Id = 'DEVSHALAN-933f80-0c';
export const sftLaboR1Nonce = 12;
// Upgrade +2
export const sftTavernR2Id = 'DEVSHALAN-933f80-0d';
export const sftTavernR2Nonce = 13;
// Dust and SC
export const dustTokenId = 'DEVDUST-d62981';
export const contractGameAddress =
  'erd1qqqqqqqqqqqqqpgqvfh5j05pw23upxz4hmh6fdsrcmvfjjd22krsxc4hy2';
export const contractMarketAddress =
  'erd1qqqqqqqqqqqqqpgqsp7wpnxv8lpn6hg4fhhp3vqkwmst5ljm2krs2fxjrk';
export const totalYield = 120;
export const totalProducted = 10000;

// Price
export const priceLand = 150;
export const priceBuilding = 100;
export const priceBuildingR1 = 400;
export const priceBuildingR2 = 1200;

// Leaderboard
export const ignoredAddresses = [
  'erd1qqqqqqqqqqqqqpgqvfh5j05pw23upxz4hmh6fdsrcmvfjjd22krsxc4hy2',
  'erd1qqqqqqqqqqqqqpgqsp7wpnxv8lpn6hg4fhhp3vqkwmst5ljm2krs2fxjrk',
  'erd1qqqqqqqqqqqqqpgqwulum94ef52emtf3jded3fw3h4g29dyf2krsxp9cdr',
  'erd1qqqqqqqqqqqqqpgqw02egr4v4wwmaxw7t98ekpyyde4l0g6l3u4s07nfsa',
  'erd1hkr89plnuz6drjpy9x3w0hxmdd54n5n9d7s03gxz8yyrva4c3u4sw80sme',
  'erd1nz9e2kj2szyhaddpskyg3gyje373fhhun077gxscgv82ze0wy8qsqa9mfy',
  'erd19calhqrx9t9g5r46ftarljj0tgaunuc6t02zl03043wgt6tvversqx08hh',
  'erd1tzq44fl4a6yl8l7zgrvv7kpgvscq9xu05uyu6fekez9pcclvxs5stp4vgw',
  'erd1upk2p7pak0g85mu258vyvtx0857gdzvnmc0hswm32e9a8d352krsfh8cvj',
  'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag'
];

// Dusty Bones market
export const nftCollectionDustyBonesId = 'DBTEST-b2414b';
export const priceDustyBone = 2000;
export const contractMarketDbAddress =
  'erd1qqqqqqqqqqqqqpgqwulum94ef52emtf3jded3fw3h4g29dyf2krsxp9cdr';
