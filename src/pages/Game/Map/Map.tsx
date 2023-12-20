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
import { TavernStandard } from './TavernStandard';
import { Land } from './Land';
import { useSendShadowLandsTransaction } from '../transactions';
import { sftBanksNonce } from 'config';
import { BankStandard } from './BankStandard';

function Loader() {
  return (
    <Html center>
      <FontAwesomeIcon icon={faSpinner} spin color='white' />
    </Html>
  );
}

export const Map = ({ sfts, walletTaverns, walletBanks, rewardsPerDay }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const { sendStakeBuildingTransaction } = useSendShadowLandsTransaction();

  const ref = useRef();

  const [hovered, hover] = useState(false);
  const [hovered1, hover1] = useState(false);
  const [hovered2, hover2] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered1 ? 'pointer' : 'auto';
  }, [hovered1]);

  return (
    <Canvas shadows dpr={[1, 2]}>
      <Text
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
      </Text>
      <Suspense fallback={<Loader />}>
        <Stage
          controls={ref}
          preset='rembrandt'
          intensity={4}
          environment='dawn'
        >
          <Land
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
          />
          {/* Tavern */}
          {sfts !== undefined &&
          sfts.filter((x) => x === sftTavernNonce).length > 0 ? (
            <TavernStandard position={[2.5, 1, -2.5]} />
          ) : (
            sfts !== undefined &&
            walletTaverns.length > 0 &&
            sfts.filter((x) => x === sftTavernNonce).length === 0 && (
              <TavernStandard
                onClick={(event) => {
                  hover1(false);
                  sendStakeBuildingTransaction(sftTavernNonce);
                }}
                onPointerOver={(event) => hover1(true)}
                onPointerOut={(event) => hover1(false)}
                color={hovered1 ? 'blue' : 'white'}
                position={[2.5, 1, -2.5]}
              />
            )
          )}
          {/* Bank */}
          {sfts !== undefined &&
          sfts.filter((x) => x === sftBanksNonce).length > 0 ? (
            <BankStandard
              position={[-1, 1, 3]}
              rotation={[0, Math.PI / 2, 0]}
            />
          ) : (
            sfts !== undefined &&
            walletBanks.length > 0 &&
            sfts.filter((x) => x === sftBanksNonce).length === 0 && (
              <BankStandard
                onClick={(event) => {
                  hover1(false);
                  sendStakeBuildingTransaction(sftBanksNonce);
                }}
                onPointerOver={(event) => hover2(true)}
                onPointerOut={(event) => hover2(false)}
                color={hovered2 ? 'blue' : 'white'}
                position={[-1, 1, 3]}
                rotation={[0, Math.PI / 2, 0]}
              />
            )
          )}
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate={hovered ? false : true} />
      <PerspectiveCamera
        makeDefault
        position={[500, 200, 1]}
        fov={50}
        zoom={20}
      />
    </Canvas>
  );
};
