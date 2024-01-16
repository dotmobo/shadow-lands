import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FormatAmount, Loader, MxLink } from 'components';
import {
  contractGameAddress,
  dustTokenId,
  ignoredAddresses,
  mvxApiUrl,
  mvxExplorerUrl
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any>();
  const [claimers, setClaimers] = useState<string[]>();

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${mvxApiUrl}/tokens/${dustTokenId}/accounts?size=10000`)
      .then((response) => {
        setLeaderboard(
          response.data.filter(
            (item: any) =>
              ignoredAddresses.includes(item.address) === false &&
              item.address.startsWith('erd1qqqqqq') === false
          )
        );
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setLeaderboard([]);
        }
      });
  }, []);

  useEffect(() => {
    const previousMonth = Math.floor(
      new Date().setMonth(new Date().getMonth() - 1) / 1000
    );

    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${contractGameAddress}/transactions?size=10000&status=success&function=claim&after=${previousMonth}&fields=sender`
      )
      .then((response) => {
        console.log('response', response.data);
        setClaimers(
          response.data
            .filter(
              (item: any) =>
                ignoredAddresses.includes(item.sender) === false &&
                item.sender.startsWith('erd1qqqqqq') === false
            )
            .map((item: any) => item.sender)
        );
        console.log('claimers', claimers);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setClaimers([]);
        }
      });
  }, []);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-2 ml-2 mr-2'>
            Leaderboard Top 10
          </h1>
          <span className='ml-2 mr-2 mb-8 italic'>
            To stay on the leaderboard, make sure to claim rewards within the
            last month.
          </span>
          {leaderboard === undefined && claimers === undefined && (
            <div className='flex'>
              <Loader />
            </div>
          )}
          {claimers !== undefined &&
            claimers.length > 0 &&
            leaderboard !== undefined &&
            leaderboard.length > 0 && (
              <ul className='list-decimal ml-8 mb-8'>
                {leaderboard
                  .filter((item: any) => claimers.includes(item.address))
                  .slice(0, 10)
                  .map((item: any, index: number) => (
                    <li key={index} className='mb-2'>
                      <span className='flex flex-items-center'>
                        <a
                          target='_blank'
                          className='text-slate-400 hover:text-slate-100'
                          href={`${mvxExplorerUrl}/accounts/${item.address}`}
                        >
                          {item.address.substring(0, 6) +
                            '...' +
                            item.address.substring(item.address.length - 6)}
                          &nbsp;:&nbsp;
                        </a>
                        <FormatAmount
                          value={item.balance ?? 0}
                          showLabel={false}
                          egldLabel='$DUST'
                          digits={0}
                          data-testid='balance'
                        />
                        <span>
                          <img
                            src='/dust-logo.png'
                            alt='Dust'
                            className='ml-1 w-5'
                          />
                        </span>
                      </span>
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
