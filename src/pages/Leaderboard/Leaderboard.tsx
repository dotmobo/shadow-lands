import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FormatAmount, MxLink } from 'components';
import { dustTokenId, ignoredAddresses, mvxApiUrl } from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(`${mvxApiUrl}/tokens/${dustTokenId}/accounts?size=10`)
      .then((response) => {
        setLeaderboard(
          response.data.filter(
            (item: any) => ignoredAddresses.includes(item.address) === false
          )
        );
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setLeaderboard([]);
        }
      });
  }, []);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
            Leaderboard Top 10
          </h1>
          <ul className='list-decimal ml-8 mb-8'>
            {leaderboard.map((item: any, index) => (
              <li key={index} className='mb-2'>
                <span className='flex flex-items-center'>
                  <span>
                    {item.address.substring(0, 6) +
                      '...' +
                      item.address.substring(item.address.length - 6)}
                    &nbsp;:&nbsp;
                  </span>
                  <FormatAmount
                    value={item.balance ?? 0}
                    showLabel={false}
                    egldLabel='$DUST'
                    digits={0}
                    data-testid='balance'
                  />
                  <span>
                    <img src='/dust-logo.png' alt='Dust' className='ml-1 w-5' />
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <MxLink to={RouteNamesEnum.game}>
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              size='sm'
              className='mr-2'
            />
            Return to the game
          </MxLink>
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
