import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Button, Loader, MxLink } from 'components';
import {
  contractGameAddress,
  contractMarketAddress,
  contractMarketDbAddress,
  mvxExplorerUrl
} from 'config';
import { RouteNamesEnum } from 'localConstants';
import { useCallShadowLandsQuery } from 'pages/Game/queries';
import { useEffect, useState } from 'react';
import { AuthRedirectWrapper, PageWrapper } from 'wrappers';

export const Referral = () => {
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();

  const [isCopied, setIsCopied] = useState(false);
  const [friendReferralCode, setFriendReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);

  const proxy = new ProxyNetworkProvider(network.apiAddress, {
    timeout: 5000
  });

  const userReferralLink = `${window.location.href}?code=${btoa(address)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userReferralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000);
  };

  const handleFriendReferralCodeChange = (event) => {
    setFriendReferralCode(event.target.value);
  };

  const handleValidation = () => {
    if (friendReferralCode) {
      try {
        const decodedCode = atob(friendReferralCode);
        console.log('Decoded code:', decodedCode);
      } catch (error) {
        console.error('Invalid base64 string:', error);
      }
    } else {
      console.log('Friend referral code is empty');
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    if (codeParam) {
      setFriendReferralCode(codeParam);
    }
  }, []);

  useEffect(() => {
    // todo get from sc
    setReferralCount(4);
  }, [hasPendingTransactions]);

  return (
    <AuthRedirectWrapper requireAuth={true}>
      <PageWrapper>
        <div className='flex flex-col items-center h-full w-full bg-slate-900 text-slate-400'>
          <h1 className='text-4xl sm:text-4xl font-bold mt-4 mb-8'>
            Referral program
          </h1>
          <div>
            <h2 className='text-2xl sm:text-2xl font-bold mb-8'>
              Your referral count: {referralCount}
            </h2>
          </div>
          <div>
            <h2 className='text-2xl sm:text-2xl font-bold mb-4'>
              Your referral link
            </h2>
            <input
              type='text'
              value={userReferralLink}
              className='border rounded-md p-2 w-full mb-8'
              readOnly
              onClick={copyToClipboard}
            />
          </div>
          {isCopied && (
            <span className='text-green-500 mb-8'>Link copied!</span>
          )}

          <div>
            <h2 className='text-2xl sm:text-2xl font-bold mb-4'>
              Enter your friend's referral code
            </h2>
            <input
              type='text'
              value={friendReferralCode}
              onChange={handleFriendReferralCodeChange}
              className='border rounded-md p-2 w-full mb-8'
              placeholder='Enter a code...'
            />
          </div>
          <Button onClick={handleValidation}>Validate</Button>
          <span className='mt-8 mb-2'>
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
