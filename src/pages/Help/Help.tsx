import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Loader, MxLink } from 'components';
import {
  contractGameAddress,
  contractMarketAddress,
  contractMarketDbAddress,
  mvxExplorerUrl,
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useCallShadowLandsQuery } from 'pages/Game/queries';
import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import {
  sftBankR1Nonce,
  sftBankR2Nonce,
  sftBanksNonce,
  sftCryptNonce,
  sftCryptR1Nonce,
  sftCryptR2Nonce,
  sftHauntedHouseNonce,
  sftHauntedHouseR1Nonce,
  sftHauntedHouseR2Nonce,
  sftLaboNonce,
  sftLaboR1Nonce,
  sftLaboR2Nonce,
  sftLandsNonce,
  sftTavernNonce,
  sftTavernR1Nonce,
  sftTavernR2Nonce
} from 'config';

export const Help = () => {
  const { network } = useGetNetworkConfig();

  const [sfts, setSftsList] = useState<number[]>();

  const { getNftNonce } = useCallShadowLandsQuery();

  const { hasPendingTransactions } = useGetPendingTransactions();

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

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
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
            How to play ?
          </h1>
          <div>
            <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
              Instructions
            </h2>
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
            <h2 className='text-2xl sm:text-2xl font-bold mb-8'>Quests</h2>
            {sfts === undefined && (
              <div className='flex'>
                <Loader />
              </div>
            )}
            {sfts !== undefined && (
              <ul className='ml-8 mb-8 mr-2'>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest1'
                    type='checkbox'
                    checked={sfts.filter((x) => x === sftLandsNonce).length > 0}
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest1'
                    className='ms-2 text-sm font-medium'
                  >
                    Add the Land to the game.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest2'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftTavernNonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest2'
                    className='ms-2 text-sm font-medium'
                  >
                    Place the Tavern on the map.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest3'
                    type='checkbox'
                    checked={sfts.filter((x) => x === sftBanksNonce).length > 0}
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest3'
                    className='ms-2 text-sm font-medium'
                  >
                    Place the Bank on the map.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest4'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftHauntedHouseNonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest4'
                    className='ms-2 text-sm font-medium'
                  >
                    Place the Haunted House on the map.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest5'
                    type='checkbox'
                    checked={sfts.filter((x) => x === sftCryptNonce).length > 0}
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest5'
                    className='ms-2 text-sm font-medium'
                  >
                    Place the Crypt on the map.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest6'
                    type='checkbox'
                    checked={sfts.filter((x) => x === sftLaboNonce).length > 0}
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest6'
                    className='ms-2 text-sm font-medium'
                  >
                    Place the Labo on the map.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest7'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftTavernR1Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest7'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Tavern to level +1.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest8'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftBankR1Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest8'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Bank to level +1.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest9'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftHauntedHouseR1Nonce).length >
                      0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest9'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Haunted House to level +1.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest10'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftCryptR1Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest10'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Crypt to level +1.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest11'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftLaboR1Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest11'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Labo to level +1.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest12'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftTavernR2Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest12'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Tavern to level +2.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest13'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftBankR2Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest13'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Bank to level +2.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest14'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftHauntedHouseR2Nonce).length >
                      0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest14'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Haunted House to level +2.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest15'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftCryptR2Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest15'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Crypt to level +2.
                  </label>
                </li>
                <li className='flex items-center mb-4'>
                  <input
                    id='quest16'
                    type='checkbox'
                    checked={
                      sfts.filter((x) => x === sftLaboR2Nonce).length > 0
                    }
                    readOnly={true}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor='quest16'
                    className='ms-2 text-sm font-medium'
                  >
                    Upgrade the Labo to level +2.
                  </label>
                </li>
              </ul>
            )}
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
