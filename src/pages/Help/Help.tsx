import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MxLink } from 'components';
import {
  contractGameAddress,
  contractMarketAddress,
  contractMarketDbAddress,
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
          <div>
            <ul className='list-disc ml-8 mb-8 mr-2'>
              <li>
                🌴 Land Acquisition: Kick things off by using the market to snag
                a plot of land. This is the bedrock of your empire.
              </li>
              <li>
                💵 $DUST Generation: Position your Land and start raking in
                $DUST. Each plot is a veritable goldmine awaiting your claim.
              </li>
              <li>
                🏗 Expansion: Invest in buildings, like a cozy tavern or an
                ancient crypt. These edifices boost your $DUST production
                capabilities.
              </li>
              <li>
                📈 Optimization: Strategically place them on your Land to
                amplify your gains. Each structure nets an extra +5 $DUST.
              </li>
              <li>
                🚀 Claim Your $DUST: Don’t let your hard-earned rewards gather
                dust. Regularly claim your $DUST, shoot for the stars on the
                leaderboard, or lavish upgrades on your buildings!
              </li>
              <li>
                👑 Leaderboard: Peek at the leaderboard to gauge your standing
                and that of your rivals. It’s a grand contest for wealth and
                glory!
              </li>
            </ul>
            <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
              Important notices
            </h2>
            <ul className='list-disc ml-8 mb-8 mr-2'>
              <li>
                🚫 You can only place one building of each type on the map.
              </li>
              <ul className='list-disc ml-8'>
                <li>
                  For instance, a standard tavern, a tavern +1, a tavern +2 can
                  coexist, but duplicating the exact model (e.g., two standard
                  taverns) is a no-go.
                </li>
                <li>
                  Also, remember that buildings must ascend in order: standard →
                  +1 → +2, etc.
                </li>
              </ul>
              <li>
                🔥 Before demolishing a Land, ensure you've claimed your
                rewards, or they'll vanish into thin air.
              </li>
            </ul>
            <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
              Main actions
            </h2>
            <ul className='list-disc ml-8 mb-8 mr-2'>
              <li>
                <b>Add the Land</b>: Stake a Land from your wallet if it's yet
                to be done.
              </li>
              <li>
                <b>Destroy the Land</b>: Unstake all SFTs from the game.
                Caution: Unclaimed rewards will be forfeited!
              </li>
              <li>
                <b>Claim</b>: Secure your current farm rewards in $DUST.
              </li>
              <li>
                <b>Buy an SFT</b>: Snag a Land or a structure like a tavern
                using $DUST.
              </li>
              <li>
                <b>External Market</b>: Takes you to FrameIt to purchase Land or
                buildings like a tavern with $EGLD.
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
                    contractGameAddress.substring(
                      contractGameAddress.length - 6
                    )}
                </a>
              </li>
              <li>
                Dust Market SL&nbsp;:&nbsp;
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
              <li>
                Dust Market DB&nbsp;:&nbsp;
                <a
                  href={mvxExplorerUrl + '/accounts/' + contractMarketDbAddress}
                  target='_blank'
                  className='text-slate-400 hover:text-slate-100'
                >
                  {contractMarketDbAddress.substring(0, 6) +
                    '...' +
                    contractMarketDbAddress.substring(
                      contractMarketDbAddress.length - 6
                    )}
                </a>
              </li>
            </ul>
          </div>
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
