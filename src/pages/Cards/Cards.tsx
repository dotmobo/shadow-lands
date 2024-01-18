import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import axios from 'axios';
import { FormatAmount, Loader, MxLink } from 'components';
import {
  contractGameAddress,
  dustTokenId,
  ignoredAddresses,
  mvxApiUrl,
  mvxExplorerUrl,
  sftCollectionId
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useCallShadowLandsQuery } from 'pages/Game/queries';
import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Cards = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();

  const { getNftNonce } = useCallShadowLandsQuery();

  const [sfts, setSftsList] = useState<number[]>();
  const [collection, setCollection] = useState<any>();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${mvxApiUrl}/collections/${sftCollectionId}/nfts`)
      .then((response) => {
        setCollection(
          response.data.map((item: any) => ({
            nonce: item.nonce,
            name: item.name,
            url: item.url
          }))
        );
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setCollection([]);
        }
      });
  }, [hasPendingTransactions]);

  useEffect(() => {
    proxy
      .queryContract(getNftNonce)
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
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8 ml-2 mr-2'>
            My in-game cards
          </h1>
          {sfts === undefined && collection === undefined && (
            <div className='flex'>
              <Loader />
            </div>
          )}
          {sfts !== undefined &&
            collection !== undefined &&
            collection.length > 0 && (
              <ul className='ml-4 mr-4 mb-8 flex flex-row flex-wrap'>
                {collection
                  .sort((a: any, b: any) => a.nonce - b.nonce)
                  .map((item: any, index: number) => (
                    <li
                      key={index}
                      className='mb-2 w-1/2 sm:w-1/4 flex-shrink-0 p-4'
                    >
                      <span className='text-sm whitespace-nowrap'>
                        {item.name}
                      </span>
                      <div className='border border-dashed border-white'>
                        <img
                          src={
                            sfts.includes(item.nonce)
                              ? item.url
                              : '/empty-card.jpeg'
                          }
                          alt={item.name}
                          className='max-w-full'
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          <span className='mb-2'>
            <MxLink to={RouteNamesEnum.game}>
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                size='sm'
                className='mr-2'
              />
              Return to the game
            </MxLink>
          </span>
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
