import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const environment = EnvironmentsEnum.mainnet;

// Shadow Lands
export const mvxApiUrl = 'https://api.multiversx.com';
export const mvxExplorerUrl = 'https://explorer.multiversx.com';
export const sftCollectionId = 'SHALAN-55b9a9';
// Buildings
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
// Upgrade +1
export const sftTavernR1Id = 'SHALAN-55b9a9-07';
export const sftTavernR1Nonce = 7;
export const sftBankR1Id = 'SHALAN-55b9a9-08';
export const sftBankR1Nonce = 8;
export const sftHauntedHouseR1Id = 'SHALAN-55b9a9-09';
export const sftHauntedHouseR1Nonce = 9;
export const sftCryptR1Id = 'SHALAN-55b9a9-0a';
export const sftCryptR1Nonce = 10;
export const sftLaboR1Id = 'SHALAN-55b9a9-0b';
export const sftLaboR1Nonce = 11;
// Upgrade +2
export const sftTavernR2Id = 'SHALAN-55b9a9-0c';
export const sftTavernR2Nonce = 12;
export const sftBankR2Id = 'SHALAN-55b9a9-0d';
export const sftBankR2Nonce = 13;
export const sftHauntedHouseR2Id = 'SHALAN-55b9a9-0e';
export const sftHauntedHouseR2Nonce = 14;
export const sftCryptR2Id = 'SHALAN-55b9a9-0f';
export const sftCryptR2Nonce = 15;
export const sftLaboR2Id = 'SHALAN-55b9a9-10';
export const sftLaboR2Nonce = 16;
// Dust and SC
export const dustTokenId = 'DUST-e7e490';
export const contractGameAddress =
  'erd1qqqqqqqqqqqqqpgq6px7uzxhcsagfkguf269kj937dg766282krscvp908';
export const contractMarketAddress =
  'erd1qqqqqqqqqqqqqpgqc4s83k0ut7c2p6v3rqlddz4wtz7djhq42krs0m3afj';
export const totalYield = 80;
export const totalProducted = 5000;

// Price
export const priceLand = 150;
export const priceBuilding = 100;
export const priceBuildingR1 = 400;
export const priceBuildingR2 = 1200;

// Leaderboard
export const ignoredAddresses = [
  'erd1qqqqqqqqqqqqqpgq6px7uzxhcsagfkguf269kj937dg766282krscvp908', // SC Game
  'erd1qqqqqqqqqqqqqpgqc4s83k0ut7c2p6v3rqlddz4wtz7djhq42krs0m3afj', // SC Market
  'erd1qqqqqqqqqqqqqpgqwyxk57xdunghh8cyefwgdzm38wmrlzf62krsz63ft6', // SC DB Market
  'erd1qqqqqqqqqqqqqpgqw02egr4v4wwmaxw7t98ekpyyde4l0g6l3u4s07nfsa', // Team xSafe
  'erd1hkr89plnuz6drjpy9x3w0hxmdd54n5n9d7s03gxz8yyrva4c3u4sw80sme', // NFT owner
  'erd1nz9e2kj2szyhaddpskyg3gyje373fhhun077gxscgv82ze0wy8qsqa9mfy', // Team member
  'erd19calhqrx9t9g5r46ftarljj0tgaunuc6t02zl03043wgt6tvversqx08hh', // Team member
  'erd1tzq44fl4a6yl8l7zgrvv7kpgvscq9xu05uyu6fekez9pcclvxs5stp4vgw', // Team member
  'erd1cts8l3q6sc7suuvuhcfwhf6k2qt8mdm5av7q8tmdnj4xx6xgrpssfsd27f', // Team member
  'erd1upk2p7pak0g85mu258vyvtx0857gdzvnmc0hswm32e9a8d352krsfh8cvj', // SC owner,
  'erd1qqqqqqqqqqqqqpgq5774jcntdqkzv62tlvvhfn2y7eevpty6mvlszk3dla', // One Dex Farm,
  'erd1qqqqqqqqqqqqqpgqqz6vp9y50ep867vnr296mqf3dduh6guvmvlsu3sujc', // One Dex LP,
  'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag' // Burn address
];

// Dusty Bones market
export const nftCollectionDustyBonesId = 'DUSTYBONES-c1fc90';
export const priceDustyBone = 2000;
export const contractMarketDbAddress =
  'erd1qqqqqqqqqqqqqpgqwyxk57xdunghh8cyefwgdzm38wmrlzf62krsz63ft6';

// Dusty statue
export enum StatueType {
  Dusty = 'DUSTY',
  Shroom = 'SHROOM',
  Pingu = 'PINGU'
}
export const selectedStatue = StatueType.Pingu;
export const linkStatue =
  'https://twitter.com/intent/follow?screen_name=xPingouins';

// Factions
export const priceChooseFaction = 100;
export const factions = [
  {
    id: 1,
    name: 'Aleblade'
  },
  {
    id: 2,
    name: 'Stormbrew'
  },
  {
    id: 3,
    name: 'Goldpick'
  },
  {
    id: 4,
    name: 'Sanctigrail'
  }
];
export const priceBonus = 500;
export const priceDonate = 25;
