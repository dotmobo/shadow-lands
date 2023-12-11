import { Label } from 'components/Label';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { dustTokenId, mvxApiUrl, nftsCollectionId } from 'config';
import { orderBy } from 'lodash';

interface Bones {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
  collection: string;
  nonce: number;
}

interface Dust {
  name: string;
  balance: number;
  decimals: number;
}

export const Account = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const [bones, setBonesList] = useState<Bones[]>();
  const [dust, setDustToken] = useState<Dust | null>();

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
        `${mvxApiUrl}/accounts/${address}/nfts?size=666&collections=${nftsCollectionId}`
      )
      .then((response) => {
        setBonesList(
          orderBy(response.data, ['collection', 'nonce'], ['desc', 'asc'])
        );
      });
  }, []);

  return (
    <OutputContainer>
      {dust !== undefined && bones !== undefined && bones.length > 0 && (
        <div className='flex flex-col text-black' data-testid='topInfo'>
          <p>
            <Label>Numbers of Dusty Bones: </Label> {bones.length}
          </p>

          <p>
            <Label>Balance of $DUST: </Label>
            <FormatAmount
              value={dust?.balance ?? 0}
              egldLabel='$DUST'
              data-testid='balance'
            />
          </p>
        </div>
      )}
    </OutputContainer>
  );
};
