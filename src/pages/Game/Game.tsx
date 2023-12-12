import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import { useGetAccountInfo, useGetNetworkConfig } from 'hooks';
import axios from 'axios';
import { mvxApiUrl, nftsCollectionId } from 'config';
import { orderBy } from 'lodash';
import { Card } from 'components';
import { Account } from './widgets/Account';
import { Land } from './widgets/Land';

interface Bones {
  identifier: string;
  url: string;
  name: string;
  metadata: any;
  collection: string;
  nonce: number;
}

type WidgetsType = {
  title: string;
  widget: (props: any) => JSX.Element;
  description?: string;
  props?: { receiver?: string };
  reference: string;
};

const WIDGETS: WidgetsType[] = [
  {
    title: 'Shadow Lands',
    widget: Account,
    description: 'Gavediggers who take care of your land',
    reference: 'https://dusty-bones.netlify.app/'
  }
  // {
  //   title: 'Shadow Lands',
  //   widget: Land,
  //   description: 'A dark and hostile territory',
  //   reference: 'https://dusty-bones.netlify.app/'
  // }
];

export const Game = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const [bones, setBonesList] = useState<Bones[]>();

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
    <AuthRedirectWrapper>
      <PageWrapper>
        <div className='flex flex-col-reverse sm:flex-row items-center h-full w-full'>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center bg-slate-900'>
            {bones !== undefined && bones.length > 0 && <Land />}
          </div>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center'>
            {bones !== undefined && bones.length === 0 && (
              <div className='flex flex-col gap-4'>
                <div>
                  No{' '}
                  <a
                    target='_blank'
                    href='https://www.frameit.gg/marketplace/DUSTYBONES-c1fc90'
                    className='text-blue-600'
                  >
                    Dusty Bones
                  </a>{' '}
                  NFTs found in your wallet !
                </div>
              </div>
            )}

            {bones !== undefined && bones.length > 0 && (
              <div className='flex flex-col gap-6 max-w-3xl w-full'>
                {WIDGETS.map((element) => {
                  const {
                    title,
                    widget: MxWidget,
                    description,
                    props = {},
                    reference
                  } = element;

                  return (
                    <Card
                      key={title}
                      title={title}
                      description={description}
                      reference={reference}
                    >
                      <MxWidget {...props} />
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
