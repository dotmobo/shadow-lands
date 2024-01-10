import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MxLink } from 'components';
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
          <ul className='list-disc ml-8 mb-8'>
            <li>Use the market to buy one land</li>
            <li>Place the land and earn some $DUST</li>
            <li>Buy some other buildings like one tavern or one crypt</li>
            <li>Place them on the land and earn more $DUST</li>
            <li>
              Claim your $DUST and become the biggest $DUST holder to receive
              some gifts!
            </li>
            <li>
              <b>Warning</b>: you can only place one building of each type on
              the map!
            </li>
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
