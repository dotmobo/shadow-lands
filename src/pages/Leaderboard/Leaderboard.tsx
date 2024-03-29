import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { Button, Loader, MxLink } from 'components';
import { contractGameAddress, ignoredAddresses, mvxApiUrl } from 'config';
import { RouteNamesEnum } from 'localConstants';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import LeaderboardFragment from './LeaderboardFragment';

export const Leaderboard = () => {
  const { address } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const [leaderboard, setLeaderboard] = useState<any>();
  const [selectedTab, setSelectedTab] = useState<'current' | 'previous'>(
    'current'
  );
  const CLAIM_TRANSACTION_VALUE = BigInt(15000000000000000000);

  useEffect(() => {
    const today = new Date();
    const targetMonth =
      selectedTab === 'current' ? today.getMonth() : today.getMonth() - 1;
    const targetYear = today.getFullYear();
    const firstDayOfTargetMonth =
      new Date(targetYear, targetMonth, 1).getTime() / 1000;
    const lastDayOfTargetMonth =
      new Date(targetYear, targetMonth + 1, 0, 23, 59, 59).getTime() / 1000;

    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${contractGameAddress}/transfers?sender=${contractGameAddress}&size=10000&status=success&function=ESDTTransfer&after=${firstDayOfTargetMonth}&before=${lastDayOfTargetMonth}`
      )
      .then((response) => {
        const playersData = response.data.filter(
          (item: any) =>
            ignoredAddresses.includes(item.receiver) === false &&
            item.receiver.startsWith('erd1qqqqqq') === false
        );

        const calculateTotalForReceiver = (receiver: string) => {
          return playersData
            .filter((transaction: any) => transaction.receiver === receiver)
            .map(
              (transaction: any) =>
                transaction.action.arguments.transfers[0].value
            )
            .map((value: string) => BigInt(value))
            .reduce(
              (acc: bigint, value: bigint) =>
                acc + value + CLAIM_TRANSACTION_VALUE,
              BigInt(0)
            );
        };

        const uniqueReceivers = [
          ...new Set(
            playersData.map((transaction: any) => transaction.receiver)
          )
        ];

        const resultList = uniqueReceivers
          .map((receiver: any) => ({
            address: receiver,
            balance: calculateTotalForReceiver(receiver)
          }))
          .sort((a: any, b: any) => (b.balance > a.balance ? 1 : -1));

        setLeaderboard(resultList);
      })
      .catch((_error) => {
        setLeaderboard([]);
      });
  }, [hasPendingTransactions, selectedTab]);

  const downloadCSV = () => {
    if (leaderboard) {
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        'Address,Score\n' +
        leaderboard
          .slice(0, 50)
          .map(
            (item: any) =>
              `${item.address},${item.balance / BigInt(Math.pow(10, 18))}`
          )
          .join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'leaderboard.csv');
      document.body.appendChild(link);
      link.click();
    }
  };

  const getCurrentMonthName = () => {
    const today = new Date();
    return today.toLocaleString('en-US', { month: 'long' });
  };

  const getPreviousMonthName = () => {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    return today.toLocaleString('en-US', { month: 'long' });
  };

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <div className='flex justify-center mb-4'>
            <Button
              className={`inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed
              mr-2 ${
                selectedTab === 'current' ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              onClick={() => {
                setLeaderboard(undefined);
                setSelectedTab('current');
              }}
            >
              Current month
            </Button>
            <Button
              className={`inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 text-white hover:bg-blue-700 mr-0 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed
              ml-2 ${
                selectedTab === 'previous' ? 'bg-blue-600' : 'bg-gray-600'
              }`}
              onClick={() => {
                setLeaderboard(undefined);
                setSelectedTab('previous');
              }}
            >
              Previous month
            </Button>
          </div>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-2 ml-2 mr-2'>
            Leaderboard{' '}
            {selectedTab === 'current'
              ? getCurrentMonthName()
              : getPreviousMonthName()}{' '}
            Top 50
          </h1>
          <span className='ml-2 mr-2 mb-2 italic'>
            To stay on the leaderboard, make sure to claim rewards within the
            last month.
          </span>
          <span className='ml-2 mr-2 mb-8 italic'>
            Score = total monthly claimed $DUST + 15 points per claim
          </span>
          {leaderboard === undefined && (
            <div className='flex'>
              <Loader />
            </div>
          )}
          {leaderboard !== undefined && leaderboard.length > 0 && (
            <>
              <div className='mb-8'>
                <Button onClick={downloadCSV} aria-label='snapshot'>
                  <FontAwesomeIcon icon={faCamera} />
                </Button>
              </div>
              <ul className='list-decimal mb-8'>
                {leaderboard.slice(0, 50).map((_, index) => (
                  <LeaderboardFragment
                    key={index}
                    index={index}
                    leaderboard={leaderboard}
                    address={address}
                  />
                ))}
              </ul>
            </>
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
