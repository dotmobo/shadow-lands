import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqm6ad6xrsjvxlcdcffqe8w58trpec09ug9l5qde96pq';
export const API_URL = 'https://devnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;

// Shadow Lands
export const mvxApiUrl = 'https://devnet-api.multiversx.com';
export const sftLandsId = 'DEVSHALAN-933f80-01';
export const sftCryptId = 'DEVSHALAN-933f80-02';
export const sftHauntedHouseId = 'DEVSHALAN-933f80-04';
export const dustTokenId = 'DEVDUST-d62981';
