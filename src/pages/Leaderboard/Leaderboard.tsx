import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import axios from 'axios';
import { FormatAmount, Loader, MxLink } from 'components';
import {
  contractGameAddress,
  ignoredAddresses,
  mvxApiUrl,
  mvxExplorerUrl
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Leaderboard = () => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const [leaderboard, setLeaderboard] = useState<any>();
  const CLAIM_TRANSACTION_VALUE = BigInt(15000000000000000000);

  useEffect(() => {
    const today = new Date();
    today.setDate(1); // Définir le jour actuel au 1er jour du mois
    const previousMonth = Math.floor(
      today.setMonth(today.getMonth() - 1) / 1000
    );

    // Use [] as second argument in useEffect for not rendering each time
    axios
      .get<any>(
        `${mvxApiUrl}/accounts/${contractGameAddress}/transfers?sender=${contractGameAddress}&size=10000&status=success&function=ESDTTransfer&after=${previousMonth}`
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
  }, [hasPendingTransactions]);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-2 ml-2 mr-2'>
            Leaderboard {new Date().toLocaleString('en-US', { month: 'long' })}{' '}
            Top 10
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
            <ul className='list-decimal ml-8 mb-8'>
              {leaderboard.slice(0, 10).map((item: any, index: number) => (
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
