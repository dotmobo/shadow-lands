import { Suspense, useEffect, useRef, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { Html } from '@react-three/drei';
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
  sftBanksNonce,
  sftCryptNonce,
  sftHauntedHouseNonce,
  sftLaboNonce
} from 'config';
import { Bank } from './Bank';
import { HauntedHouse } from './HauntedHouse';
import { Crypt } from './Crypt';
import { Labo } from './Labo';

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
  rewardsPerDay,
  defaultAutoRotate
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

  useEffect(() => {
    document.body.style.cursor =
      hovered1 || hovered2 || hovered3 || hovered4 || hovered5
        ? 'pointer'
        : 'auto';
  }, [hovered1, hovered2, hovered3, hovered4, hovered5]);

  return (
    <Canvas shadows dpr={[1, 2]}>
      {/* <Text
        color='white'
        anchorX='center'
        anchorY='middle'
        position={[0, 10, 0]}
        font='https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff'
      >
        agriculture
      </Text>
      <Text
        color='white'
        anchorX='center'
        anchorY='middle'
        position={[0, 9, 0]}
      >
        {rewardsPerDay * sfts.length} $DUST/Day
      </Text> */}
      <Suspense fallback={<Loader />}>
        <Stage
          controls={ref}
          preset='rembrandt'
          intensity={-3}
          environment='sunset'
        >
          <Land
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
          />
          {/* Tavern */}
          {sfts !== undefined &&
          sfts.filter((x) => x === sftTavernNonce).length > 0 ? (
            <Tavern position={[4.435, 1.067, 5.3641 ]} rotation={[0, -2.2521728667735, 0]}/>
          ) : (
            sfts !== undefined &&
            walletTaverns.length > 0 &&
            sfts.filter((x) => x === sftTavernNonce).length === 0 && (
              <Tavern
                onClick={(event) => {
                  hover1(false);
                  sendStakeBuildingTransaction(sftTavernNonce);
                }}
                onPointerOver={(event) => hover1(true)}
                onPointerOut={(event) => hover1(false)}
                color={hovered1 ? 'blue' : 'white'}
                position={[4.435, 1.067, 5.3641 ]} rotation={[0, -2.2521728667735, 0]}
              />
            )
          )}
          {/* Bank */}
          {sfts !== undefined &&
          sfts.filter((x) => x === sftBanksNonce).length > 0 ? (
            <Bank position={[-3.0777, 1.0154, -3.8426]} rotation={[0, 0.2688036, 0]} />
          ) : (
            sfts !== undefined &&
            walletBanks.length > 0 &&
            sfts.filter((x) => x === sftBanksNonce).length === 0 && (
              <Bank
                onClick={(event) => {
                  hover2(false);
                  sendStakeBuildingTransaction(sftBanksNonce);
                }}
                onPointerOver={(event) => hover2(true)}
                onPointerOut={(event) => hover2(false)}
                color={hovered2 ? 'blue' : 'white'}
                position={[-3.0777, 1.0154, -3.8426]}
                rotation={[0, 0.2688036, 0]}
              />
            )
          )}
          {/* Haunted House */}
          {sfts !== undefined &&
          sfts.filter((x) => x === sftHauntedHouseNonce).length > 0 ? (
            <HauntedHouse
              position={[5.5994, 1.6568, -1.1516]}
              rotation={[0, -1.5338651598227, 0]}
            />
          ) : (
            sfts !== undefined &&
            walletHauntedHouses.length > 0 &&
            sfts.filter((x) => x === sftHauntedHouseNonce).length === 0 && (
              <HauntedHouse
                onClick={(event) => {
                  hover3(false);
                  sendStakeBuildingTransaction(sftHauntedHouseNonce);
                }}
                onPointerOver={(event) => hover3(true)}
                onPointerOut={(event) => hover3(false)}
                color={hovered3 ? 'blue' : 'white'}
                position={[5.5994, 1.6568, -1.1516]}
                rotation={[0, -1.5338651598227, 0]}
              />
            )
          )}
          {/* Crypt */}
          {sfts !== undefined &&
          sfts.filter((x) => x === sftCryptNonce).length > 0 ? (
            <Crypt position={[1.8028, 1.378, -5.3541]} rotation={[0, -0.4952958, 0]} />
          ) : (
            sfts !== undefined &&
            walletCrypts.length > 0 &&
            sfts.filter((x) => x === sftCryptNonce).length === 0 && (
              <Crypt
                onClick={(event) => {
                  hover4(false);
                  sendStakeBuildingTransaction(sftCryptNonce);
                }}
                onPointerOver={(event) => hover4(true)}
                onPointerOut={(event) => hover4(false)}
                color={hovered4 ? 'blue' : 'white'}
                position={[1.8028, 1.378, -5.3541]}
                rotation={[0, -0.4952958, 0]}
              />
            )
          )}
          {/* Laboratory */}
          {sfts !== undefined &&
          sfts.filter((x) => x === sftLaboNonce).length > 0 ? (
            <Labo position={[-4.6456, 1.0172, 0.69635]} rotation={[0, 1.5538236, 0]} />
          ) : (
            sfts !== undefined &&
            walletLabos.length > 0 &&
            sfts.filter((x) => x === sftLaboNonce).length === 0 && (
              <Labo
                onClick={(event) => {
                  hover5(false);
                  sendStakeBuildingTransaction(sftLaboNonce);
                }}
                onPointerOver={(event) => hover5(true)}
                onPointerOut={(event) => hover5(false)}
                color={hovered5 ? 'blue' : 'white'}
                position={[-4.6456, 1.0172, 0.69635]}
                rotation={[0, 1.5538236, 0]}
              />
            )
          )}
        </Stage>
      </Suspense>
      <OrbitControls
        ref={ref}
        autoRotate={hovered ? false : defaultAutoRotate}
      />
      <PerspectiveCamera
        makeDefault
        position={[500, 200, 1]}
        fov={50}
        zoom={25}
      />
    </Canvas>
  );
};
