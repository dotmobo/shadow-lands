import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import {
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions
} from 'hooks';
import { contractGameAddress, sftLandsNonce } from 'config';
import { Card } from 'components';
import { Account } from './widgets/Account';
import { Map } from './Map';
import {
  Address,
  AddressValue,
  ContractFunction,
  Query
} from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { WidgetsType } from './models';
import { Production } from './widgets/Production/Production';

const WIDGETS: WidgetsType[] = [
  {
    title: 'Wallet',
    widget: Account,
    description: 'Balance of your wallet',
    reference: 'https://dusty-bones.netlify.app/'
  },
  {
    title: 'Farm',
    widget: Production,
    description: '$DUST producted by your SFTs',
    reference: 'https://dusty-bones.netlify.app/'
  }
];

export const Game = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const [sfts, setSftsList] = useState<number[]>();

  useEffect(() => {
    const query = new Query({
      address: new Address(contractGameAddress),
      func: new ContractFunction('getNftNonce'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyNetworkProvider(network.apiAddress, {
      timeout: 3000
    });
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setSftsList([]);
            break;
          case '':
            setSftsList([]);
            break;
          default: {
            const decoded: Uint8Array = Buffer.from(encoded, 'base64');
            const filteredNumbers = Array.from(decoded).filter(
              (x, i) => (i + 1) % 8 === 0
            );
            setSftsList(filteredNumbers);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  return (
    <AuthRedirectWrapper>
      <PageWrapper>
        <div className='flex flex-col-reverse sm:flex-row items-center h-full w-full'>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center bg-slate-900'>
            {sfts !== undefined &&
              !hasPendingTransactions &&
              sfts.filter((x) => x === sftLandsNonce).length > 0 && (
                <Map sfts={sfts} />
              )}
          </div>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center'>
            <div className='flex flex-col gap-6 max-w-3xl w-full'>
              {WIDGETS.map((element) => {
                const {
                  title,
                  widget: MxWidget,
                  description,
                  props = {},
                  reference
                } = element;

                props['sfts'] = sfts;

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
          </div>
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
