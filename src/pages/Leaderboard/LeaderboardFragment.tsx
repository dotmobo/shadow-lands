import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCrown,
  faHatWizard,
  faMask
} from '@fortawesome/free-solid-svg-icons';
import { FormatAmount } from 'components';
import { mvxExplorerUrl } from 'config';

interface LeaderboardFragmentProps {
  index: number;
  leaderboard: any[];
  address: string;
}

const LeaderboardFragment: React.FC<LeaderboardFragmentProps> = ({
  index,
  leaderboard,
  address
}) => {
  return (
    <React.Fragment>
      {(index === 0 || index === 5 || index === 10) && (
        <div
          className={`border-4 ${
            index === 0
              ? 'border-red-500 bg-red-900'
              : index === 5
              ? 'border-green-500 bg-green-900'
              : 'border-purple-500 bg-purple-900'
          } rounded mb-4 p-2`}
        >
          <h2
            className={`text-xl font-bold ${
              index === 0
                ? 'bg-red-500'
                : index === 5
                ? 'bg-green-500'
                : 'bg-purple-500'
            } text-white p-2 rounded text-center`}
          >
            <FontAwesomeIcon
              icon={index === 0 ? faCrown : index === 5 ? faHatWizard : faMask}
              className='mr-2'
            />
            {index === 0
              ? 'Lich Kings'
              : index === 5
              ? 'Skeleton Mages'
              : 'Shadow Warriors'}
          </h2>
          <div
            className={`p-4 border-${
              index === 0 ? 'red' : index === 5 ? 'green' : 'purple'
            }-500 rounded`}
          >
            <ol start={index + 1} className='list-decimal ml-4'>
              {leaderboard
                .slice(index, index + (index === 10 ? 40 : 5))
                .map((item, idx) => (
                  <li className='mb-2 text-white' key={idx}>
                    <span className='flex flex-items-center'>
                      <a
                        target='_blank'
                        className={`mb-2 ${
                          item.address === address
                            ? 'text-yellow-400'
                            : 'hover:text-slate-400'
                        }`}
                        href={`${mvxExplorerUrl}/accounts/${item.address}`}
                      >
                        {item.address.substring(0, 6) +
                          '...' +
                          item.address.substring(item.address.length - 6)}
                      </a>
                      &nbsp;:&nbsp;
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
            </ol>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LeaderboardFragment;
