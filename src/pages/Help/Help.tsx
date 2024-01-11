import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MxLink } from 'components';
import {
  contractGameAddress,
  contractMarketAddress,
  mvxExplorerUrl
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Help = () => {
  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
            How to play ?
          </h1>
          <ul className='list-disc ml-8 mb-8 mr-2'>
            <li>Use the market to buy one land</li>
            <li>Place the land and earn some $DUST</li>
            <li>Buy some other buildings like one tavern or one crypt</li>
            <li>Place them on the land and earn more $DUST</li>
            <li>
              Claim your $DUST and become the biggest $DUST holder to receive
              some gifts!
            </li>
            <li>Check the leaderboard to view your position.</li>
            <li>
              <b>Warning</b>: you can only place one building of each type on
              the map!
            </li>
          </ul>
          <h2 className='text-2xl sm:text-2xl font-bold mb-8'>Actions</h2>
          <ul className='list-disc ml-8 mb-8 mr-2'>
            <li>
              <b>Add the Land</b>: Stake a land from your wallet if it's not
              already done.
            </li>
            <li>
              <b>Destroy the Land</b>: Unstake all SFTs from the game. Warning,
              non-claimed rewards will be lost!
            </li>
            <li>
              <b>Claim</b>: Claim your current rewards from the farm.
            </li>
            <li>
              <b>Buy 1 XXX</b>: Buy a land or a building like a tavern in $DUST.
            </li>
            <li>
              <b>External Market</b>: Buy a land or a building like a tavern in
              EGLD.
            </li>
          </ul>
          <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
            Smart Contracts
          </h2>
          <ul className='list-disc ml-8 mb-8 mr-2'>
            <li>
              Game&nbsp;:&nbsp;
              <a
                href={mvxExplorerUrl + '/accounts/' + contractGameAddress}
                target='_blank'
                className='text-slate-400 hover:text-slate-100'
              >
                {contractGameAddress.substring(0, 6) +
                  '...' +
                  contractGameAddress.substring(contractGameAddress.length - 6)}
              </a>
            </li>
            <li>
              Internal Market&nbsp;:&nbsp;
              <a
                href={mvxExplorerUrl + '/accounts/' + contractMarketAddress}
                target='_blank'
                className='text-slate-400 hover:text-slate-100'
              >
                {contractMarketAddress.substring(0, 6) +
                  '...' +
                  contractMarketAddress.substring(
                    contractMarketAddress.length - 6
                  )}
              </a>
            </li>
          </ul>
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
