import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  dustTokenId,
  mvxApiUrl,
  sftCryptId,
  sftHauntedHouseId,
  sftLandsId
} from 'config';
import { orderBy } from 'lodash';

interface Sft {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
  collection: string;
  nonce: number;
  balance: number;
}

interface Token {
  name: string;
  balance: number;
  decimals: number;
}

export const Account = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const [lands, setLandsList] = useState<Sft[]>();
  const [crypts, setCryptsList] = useState<Sft[]>();
  const [hauntedHouses, setHauntedHousesList] = useState<Sft[]>();
  const [dust, setDustToken] = useState<Token | null>();

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

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
          <Label>Haunted Houses: </Label> {hauntedHouses?.[0].balance ?? 0}
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
    </OutputContainer>
  );
};
