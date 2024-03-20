import { Suspense, useEffect, useRef, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { FlyControls, Html } from '@react-three/drei';
import {
  OrbitControls,
  PerspectiveCamera,
  Stage,
  Text
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { sftTavernNonce } from 'config/config.devnet';
import { Tavern } from './Tavern';
import { Land } from './Land';
import { useSendShadowLandsTransaction } from '../transactions';
import {
  sftBankR1Nonce,
  sftBanksNonce,
  sftCryptNonce,
  sftHauntedHouseNonce,
  sftHauntedHouseR1Nonce,
  sftLaboNonce,
  sftTavernR1Nonce,
  sftCryptR1Nonce,
  sftLaboR1Nonce,
  sftTavernR2Nonce,
  sftBankR2Nonce,
  sftHauntedHouseR2Nonce,
  linkStatue,
  StatueType,
  selectedStatue,
  sftCryptR2Nonce,
  sftLaboR2Nonce
} from 'config';
import { Bank } from './Bank';
import { HauntedHouse } from './HauntedHouse';
import { Crypt } from './Crypt';
import { Labo } from './Labo';
import { TavernR1 } from './TavernR1';
import { BankR1 } from './BankR1';
import { HauntedHouseR1 } from './HauntedHouseR1';
import { CryptR1 } from './CryptR1';
import { LaboR1 } from './LaboR1';
import { TavernR2 } from './TavernR2';
import { BankR2 } from './BankR2';
import { HauntedHouseR2 } from './HauntedHouseR2';
import { StatueDusty } from './StatueDusty';
import { StatueShroom } from './StatueShroom';
import { CryptR2 } from './CryptR2';
import { is } from '@react-three/fiber/dist/declarations/src/core/utils';
import { LaboR2 } from './LaboR2';
import { NeonLeaderBoard } from './NeonLeaderBoard';
import { FlagAB } from './FlagAB';
import { FlagSB } from './FlagSB';
import { FlagGP } from './FlagGP';
import { FlagSG } from './FlagSG';
import { StatuePingu } from './StatuePingu';

function Loader() {
  return (
    <Html center>
      <FontAwesomeIcon icon={faSpinner} spin color='white' />
    </Html>
  );
}

export const Map = ({
  sfts,
  walletTaverns,
  walletBanks,
  walletHauntedHouses,
  walletCrypts,
  walletLabos,
  walletTavernsR1,
  walletBanksR1,
  walletHauntedHousesR1,
  walletCryptsR1,
  walletLabosR1,
  walletTavernsR2,
  walletBanksR2,
  walletHauntedHousesR2,
  walletCryptsR2,
  walletLabosR2,
  defaultAutoRotate,
  fpsView,
  faction
}) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const { sendStakeBuildingTransaction } = useSendShadowLandsTransaction();

  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [hovered1, hover1] = useState(false);
  const [hovered2, hover2] = useState(false);
  const [hovered3, hover3] = useState(false);
  const [hovered4, hover4] = useState(false);
  const [hovered5, hover5] = useState(false);
  const [hovered6, hover6] = useState(false);

  useEffect(() => {
    document.body.style.cursor =
      hovered1 || hovered2 || hovered3 || hovered4 || hovered5
        ? 'pointer'
        : hovered6
        ? 'zoom-in'
        : 'auto';
  }, [hovered1, hovered2, hovered3, hovered4, hovered5 || hovered6]);

  const isStakedTavernR2 =
    sfts.filter((x) => x === sftTavernR2Nonce).length > 0 &&
    sfts.filter((x) => x === sftTavernR1Nonce).length > 0 &&
    sfts.filter((x) => x === sftTavernNonce).length > 0;
  const isStakedTavernR1 =
    sfts.filter((x) => x === sftTavernNonce).length > 0 &&
    sfts.filter((x) => x === sftTavernR1Nonce).length > 0;
  const isStakedTavern =
    sfts.filter((x) => x === sftTavernNonce).length > 0 &&
    sfts.filter((x) => x === sftTavernR1Nonce).length === 0;
  const isNotStakedTavern =
    sfts.filter((x) => x === sftTavernNonce).length === 0 &&
    sfts.filter((x) => x === sftTavernR1Nonce).length === 0;

  const isStakedBankR2 =
    sfts.filter((x) => x === sftBanksNonce).length > 0 &&
    sfts.filter((x) => x === sftBankR1Nonce).length > 0 &&
    sfts.filter((x) => x === sftBankR2Nonce).length > 0;
  const isStakedBankR1 =
    sfts.filter((x) => x === sftBanksNonce).length > 0 &&
    sfts.filter((x) => x === sftBankR1Nonce).length > 0;
  const isStakedBank =
    sfts.filter((x) => x === sftBanksNonce).length > 0 &&
    sfts.filter((x) => x === sftBankR1Nonce).length === 0;
  const isNotStakedBank =
    sfts.filter((x) => x === sftBanksNonce).length === 0 &&
    sfts.filter((x) => x === sftBankR1Nonce).length === 0;

  const isStakedHauntedHouseR2 =
    sfts.filter((x) => x === sftHauntedHouseNonce).length > 0 &&
    sfts.filter((x) => x === sftHauntedHouseR1Nonce).length > 0 &&
    sfts.filter((x) => x === sftHauntedHouseR2Nonce).length > 0;
  const isStakedHauntedHouseR1 =
    sfts.filter((x) => x === sftHauntedHouseNonce).length > 0 &&
    sfts.filter((x) => x === sftHauntedHouseR1Nonce).length > 0;
  const isStakedHauntedHouse =
    sfts.filter((x) => x === sftHauntedHouseNonce).length > 0 &&
    sfts.filter((x) => x === sftHauntedHouseR1Nonce).length === 0;
  const isNotStakedHauntedHouse =
    sfts.filter((x) => x === sftHauntedHouseNonce).length === 0 &&
    sfts.filter((x) => x === sftHauntedHouseR1Nonce).length === 0;

  const isStakedCryptR2 =
    sfts.filter((x) => x === sftCryptR1Nonce).length > 0 &&
    sfts.filter((x) => x === sftCryptR2Nonce).length > 0 &&
    sfts.filter((x) => x === sftCryptNonce).length > 0;
  const isStakedCryptR1 =
    sfts.filter((x) => x === sftCryptNonce).length > 0 &&
    sfts.filter((x) => x === sftCryptR1Nonce).length > 0;
  const isStakedCrypt =
    sfts.filter((x) => x === sftCryptNonce).length > 0 &&
    sfts.filter((x) => x === sftCryptR1Nonce).length === 0;
  const isNotStakedCrypt =
    sfts.filter((x) => x === sftCryptNonce).length === 0 &&
    sfts.filter((x) => x === sftCryptR1Nonce).length === 0;

  const isStakedLaboR2 =
    sfts.filter((x) => x === sftLaboR1Nonce).length > 0 &&
    sfts.filter((x) => x === sftLaboR2Nonce).length > 0 &&
    sfts.filter((x) => x === sftLaboNonce).length > 0;
  const isStakedLaboR1 =
    sfts.filter((x) => x === sftLaboNonce).length > 0 &&
    sfts.filter((x) => x === sftLaboR1Nonce).length > 0;
  const isStakedLabo =
    sfts.filter((x) => x === sftLaboNonce).length > 0 &&
    sfts.filter((x) => x === sftLaboR1Nonce).length === 0;
  const isNotStakedLabo =
    sfts.filter((x) => x === sftLaboNonce).length === 0 &&
    sfts.filter((x) => x === sftLaboR1Nonce).length === 0;

  return (
    <Canvas shadows dpr={[1, 2]} resize={{ debounce: 0 }}>
      <Suspense fallback={<Loader />}>
        {sfts !== undefined && (
          <Stage
            controls={ref}
            preset='rembrandt'
            intensity={-2}
            environment='sunset'
          >
            <Land
              onPointerOver={(event) => hover(true)}
              onPointerOut={(event) => hover(false)}
            />

            {/* Afficher seulement en mars 2024 */}
            {new Date().getMonth() === 2 &&
              new Date().getFullYear() === 2024 && <NeonLeaderBoard />}

            {selectedStatue === StatueType.Dusty && (
              <StatueDusty
                onClick={(event) => {
                  hover6(false);
                  window.location.href = linkStatue;
                }}
                onPointerOver={(event) => hover6(true)}
                onPointerOut={(event) => hover6(false)}
                color={hovered6 ? 'yellow' : undefined}
              />
            )}
            {selectedStatue === StatueType.Shroom && (
              <StatueShroom
                onClick={(event) => {
                  hover6(false);
                  window.location.href = linkStatue;
                }}
                onPointerOver={(event) => hover6(true)}
                onPointerOut={(event) => hover6(false)}
                color={hovered6 ? 'yellow' : undefined}
              />
            )}
            {selectedStatue === StatueType.Pingu && (
              <StatuePingu
                onClick={(event) => {
                  hover6(false);
                  window.location.href = linkStatue;
                }}
                onPointerOver={(event) => hover6(true)}
                onPointerOut={(event) => hover6(false)}
                color={hovered6 ? 'yellow' : undefined}
              />
            )}

            {faction === 1 && <FlagAB />}
            {faction === 2 && <FlagSB />}
            {faction === 3 && <FlagGP />}
            {faction === 4 && <FlagSG />}

            {/* Tavern */}
            {isStakedTavernR2 ? (
              <TavernR2 />
            ) : isStakedTavernR1 && walletTavernsR2.length > 0 ? (
              <TavernR1
                onClick={(event) => {
                  hover1(false);
                  sendStakeBuildingTransaction(sftTavernR2Nonce);
                }}
                onPointerOver={(event) => hover1(true)}
                onPointerOut={(event) => hover1(false)}
                color={hovered1 ? 'blue' : 'green'}
              />
            ) : isStakedTavernR1 ? (
              <TavernR1 />
            ) : walletTavernsR1.length > 0 && isStakedTavern ? (
              <Tavern
                onClick={(event) => {
                  hover1(false);
                  sendStakeBuildingTransaction(sftTavernR1Nonce);
                }}
                onPointerOver={(event) => hover1(true)}
                onPointerOut={(event) => hover1(false)}
                color={hovered1 ? 'blue' : 'yellow'}
              />
            ) : walletTavernsR1.length === 0 && isStakedTavern ? (
              <Tavern />
            ) : walletTaverns.length > 0 && isNotStakedTavern ? (
              <Tavern
                onClick={(event) => {
                  hover1(false);
                  sendStakeBuildingTransaction(sftTavernNonce);
                }}
                onPointerOver={(event) => hover1(true)}
                onPointerOut={(event) => hover1(false)}
                color={hovered1 ? 'blue' : 'white'}
              />
            ) : null}

            {/* Bank */}
            {isStakedBankR2 ? (
              <BankR2 />
            ) : isStakedBankR1 && walletBanksR2.length > 0 ? (
              <BankR1
                onClick={(event) => {
                  hover2(false);
                  sendStakeBuildingTransaction(sftBankR2Nonce);
                }}
                onPointerOver={(event) => hover2(true)}
                onPointerOut={(event) => hover2(false)}
                color={hovered2 ? 'blue' : 'green'}
              />
            ) : isStakedBankR1 ? (
              <BankR1 />
            ) : walletBanksR1.length > 0 && isStakedBank ? (
              <Bank
                onClick={(event) => {
                  hover2(false);
                  sendStakeBuildingTransaction(sftBankR1Nonce);
                }}
                onPointerOver={(event) => hover2(true)}
                onPointerOut={(event) => hover2(false)}
                color={hovered2 ? 'blue' : 'yellow'}
              />
            ) : walletBanksR1.length === 0 && isStakedBank ? (
              <Bank />
            ) : walletBanks.length > 0 && isNotStakedBank ? (
              <Bank
                onClick={(event) => {
                  hover2(false);
                  sendStakeBuildingTransaction(sftBanksNonce);
                }}
                onPointerOver={(event) => hover2(true)}
                onPointerOut={(event) => hover2(false)}
                color={hovered2 ? 'blue' : 'white'}
              />
            ) : null}

            {/* Haunted House */}
            {isStakedHauntedHouseR2 ? (
              <HauntedHouseR2 />
            ) : isStakedHauntedHouseR1 && walletHauntedHousesR2.length > 0 ? (
              <HauntedHouseR1
                onClick={(event) => {
                  hover3(false);
                  sendStakeBuildingTransaction(sftHauntedHouseR2Nonce);
                }}
                onPointerOver={(event) => hover3(true)}
                onPointerOut={(event) => hover3(false)}
                color={hovered3 ? 'blue' : 'green'}
              />
            ) : isStakedHauntedHouseR1 ? (
              <HauntedHouseR1 />
            ) : walletHauntedHousesR1.length > 0 && isStakedHauntedHouse ? (
              <HauntedHouse
                onClick={(event) => {
                  hover3(false);
                  sendStakeBuildingTransaction(sftHauntedHouseR1Nonce);
                }}
                onPointerOver={(event) => hover3(true)}
                onPointerOut={(event) => hover3(false)}
                color={hovered3 ? 'blue' : 'yellow'}
              />
            ) : walletHauntedHousesR1.length === 0 && isStakedHauntedHouse ? (
              <HauntedHouse />
            ) : walletHauntedHouses.length > 0 && isNotStakedHauntedHouse ? (
              <HauntedHouse
                onClick={(event) => {
                  hover3(false);
                  sendStakeBuildingTransaction(sftHauntedHouseNonce);
                }}
                onPointerOver={(event) => hover3(true)}
                onPointerOut={(event) => hover3(false)}
                color={hovered3 ? 'blue' : 'white'}
              />
            ) : null}

            {/* Crypt */}
            {isStakedCryptR2 ? (
              <CryptR2 />
            ) : isStakedCryptR1 && walletCryptsR2.length > 0 ? (
              <CryptR1
                onClick={(event) => {
                  hover4(false);
                  sendStakeBuildingTransaction(sftCryptR2Nonce);
                }}
                onPointerOver={(event) => hover4(true)}
                onPointerOut={(event) => hover4(false)}
                color={hovered4 ? 'blue' : 'green'}
              />
            ) : isStakedCryptR1 ? (
              <CryptR1 />
            ) : walletCryptsR1.length > 0 && isStakedCrypt ? (
              <Crypt
                onClick={(event) => {
                  hover4(false);
                  sendStakeBuildingTransaction(sftCryptR1Nonce);
                }}
                onPointerOver={(event) => hover4(true)}
                onPointerOut={(event) => hover4(false)}
                color={hovered4 ? 'blue' : 'yellow'}
              />
            ) : walletCryptsR1.length === 0 && isStakedCrypt ? (
              <Crypt />
            ) : walletCrypts.length > 0 && isNotStakedCrypt ? (
              <Crypt
                onClick={(event) => {
                  hover4(false);
                  sendStakeBuildingTransaction(sftCryptNonce);
                }}
                onPointerOver={(event) => hover4(true)}
                onPointerOut={(event) => hover4(false)}
                color={hovered4 ? 'blue' : 'white'}
              />
            ) : null}

            {/* Laboratory */}
            {isStakedLaboR2 ? (
              <LaboR2 />
            ) : isStakedLaboR1 && walletLabosR2.length > 0 ? (
              <LaboR1
                onClick={(event) => {
                  hover5(false);
                  sendStakeBuildingTransaction(sftLaboR2Nonce);
                }}
                onPointerOver={(event) => hover5(true)}
                onPointerOut={(event) => hover5(false)}
                color={hovered5 ? 'blue' : 'green'}
              />
            ) : isStakedLaboR1 ? (
              <LaboR1 />
            ) : walletLabosR1.length > 0 && isStakedLabo ? (
              <Labo
                onClick={(event) => {
                  hover5(false);
                  sendStakeBuildingTransaction(sftLaboR1Nonce);
                }}
                onPointerOver={(event) => hover5(true)}
                onPointerOut={(event) => hover5(false)}
                color={hovered5 ? 'blue' : 'yellow'}
              />
            ) : walletLabosR1.length === 0 && isStakedLabo ? (
              <Labo />
            ) : walletLabos.length > 0 && isNotStakedLabo ? (
              <Labo
                onClick={(event) => {
                  hover5(false);
                  sendStakeBuildingTransaction(sftLaboNonce);
                }}
                onPointerOver={(event) => hover5(true)}
                onPointerOut={(event) => hover5(false)}
                color={hovered5 ? 'blue' : 'white'}
              />
            ) : null}
          </Stage>
        )}
      </Suspense>
      {fpsView === false ? (
        <>
          <OrbitControls
            ref={ref}
            autoRotate={hovered ? false : defaultAutoRotate}
            rotateSpeed={0.3}
            zoomSpeed={0.8}
            autoRotateSpeed={1.5}
            maxDistance={1000}
            minDistance={50}
            panSpeed={0.3}
            keyPanSpeed={2}
            enablePan={false}
          />
          <PerspectiveCamera
            makeDefault
            position={[500, 200, 1]}
            fov={50}
            zoom={30}
          />
        </>
      ) : (
        <>
          <FlyControls
            ref={ref}
            movementSpeed={1}
            rollSpeed={1}
            autoForward={false}
            dragToLook={true}
          />
          <PerspectiveCamera
            makeDefault
            position={[0, 1, 2]}
            fov={50}
            zoom={1}
          />
        </>
      )}
    </Canvas>
  );
};
