import { Label } from 'components/Label';
import { ACCOUNTS_ENDPOINT, ExplorerLink } from 'components/sdkDappComponents';
import { contractGameAddress } from 'config';

export const ContractAddress = () => {
  return (
    <p>
      <Label>Contract: </Label>
      <ExplorerLink
        page={`/${ACCOUNTS_ENDPOINT}/${contractGameAddress}`}
        className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
      >
        {contractGameAddress}
      </ExplorerLink>
    </p>
  );
};
