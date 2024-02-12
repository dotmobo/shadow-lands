import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBeer,
  faBuildingColumns,
  faCross,
  faFlaskVial,
  faHouse,
  faTree,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import {
  sftBankR1Nonce,
  sftBankR2Nonce,
  sftBanksNonce,
  sftCryptNonce,
  sftCryptR1Nonce,
  sftHauntedHouseNonce,
  sftHauntedHouseR1Nonce,
  sftHauntedHouseR2Nonce,
  sftLaboNonce,
  sftLaboR1Nonce,
  sftLandsNonce,
  sftTavernNonce,
  sftTavernR1Nonce,
  sftTavernR2Nonce
} from 'config';

export const Toolbar = ({ sfts }: { sfts: number[] }) => {
  const isLand = sfts.filter((x) => x === sftLandsNonce).length > 0;
  const isTavern = sfts.filter((x) => x === sftTavernNonce).length > 0;
  const isTavernR1 = sfts.filter((x) => x === sftTavernR1Nonce).length > 0;
  const isTavernR2 = sfts.filter((x) => x === sftTavernR2Nonce).length > 0;
  const isBank = sfts.filter((x) => x === sftBanksNonce).length > 0;
  const isBankR1 = sfts.filter((x) => x === sftBankR1Nonce).length > 0;
  const isBankR2 = sfts.filter((x) => x === sftBankR2Nonce).length > 0;
  const isHauntedHouse =
    sfts.filter((x) => x === sftHauntedHouseNonce).length > 0;
  const isHauntedHouseR1 =
    sfts.filter((x) => x === sftHauntedHouseR1Nonce).length > 0;
  const isHauntedHouseR2 =
    sfts.filter((x) => x === sftHauntedHouseR2Nonce).length > 0;
  const isCrypt = sfts.filter((x) => x === sftCryptNonce).length > 0;
  const isCryptR1 = sfts.filter((x) => x === sftCryptR1Nonce).length > 0;
  const isLabo = sfts.filter((x) => x === sftLaboNonce).length > 0;
  const isLaboR1 = sfts.filter((x) => x === sftLaboR1Nonce).length > 0;

  return (
    <div className='flex w-full justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-center'>
          <div className='flex justify-center items-center mr-2'>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isLand ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faTree}
                className={`text-sm ${isLand ? 'text-white' : 'text-gray-600'}`}
              />
            </div>
          </div>
          <div className='flex justify-center items-center mr-2'>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isTavern ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faBeer}
                className={`text-sm ${
                  isTavern ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isTavernR1 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isTavernR1 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isTavernR2 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isTavernR2 ? 'text-white' : 'text-gray-600'
                }`}
              />
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isTavernR2 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
          </div>
          <div className='flex justify-center items-center mr-2'>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isBank ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faBuildingColumns}
                className={`text-sm ${isBank ? 'text-white' : 'text-gray-600'}`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isBankR1 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isBankR1 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isBankR2 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isBankR2 ? 'text-white' : 'text-gray-600'
                }`}
              />
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isBankR2 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-2'>
          <div className='flex justify-center items-center mr-2'>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isHauntedHouse ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faHouse}
                className={`text-sm ${
                  isHauntedHouse ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isHauntedHouseR1 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isHauntedHouseR1 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isHauntedHouseR2 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isHauntedHouseR2 ? 'text-white' : 'text-gray-600'
                }`}
              />
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isHauntedHouseR2 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
          </div>
          <div className='flex justify-center items-center mr-2'>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isCrypt ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faCross}
                className={`text-sm ${
                  isCrypt ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isCryptR1 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isCryptR1 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
          </div>
          <div className='flex justify-center items-center mr-2'>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isLabo ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faFlaskVial}
                className={`text-sm ${isLabo ? 'text-white' : 'text-gray-600'}`}
              />
            </div>
            <div
              className={`w-6 h-6 border border-gray-600 flex justify-center items-center ${
                isLaboR1 ? 'bg-green-600' : 'bg-transparent'
              }`}
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm ${
                  isLaboR1 ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
