import { OutputContainer } from 'components/OutputContainer';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model101 } from './Model101';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grave } from './Grave';
import { GraveHp } from './GraveHp';
import { CryptEmpty } from './CryptEmpty';
import { CryptStandard } from './CryptStandard';
import { sftCryptNonce } from 'config/config.devnet';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { contractGameAddress, sftCollectionId } from 'config';
import { Address } from '@multiversx/sdk-core/out';
import { refreshAccount } from '@multiversx/sdk-dapp/utils/account/refreshAccount';
import { sendTransactions } from '@multiversx/sdk-dapp/services/transactions/sendTransactions';

function Loader() {
  return (
    <Html center>
      <FontAwesomeIcon icon={faSpinner} spin color='white' />
    </Html>
  );
}

export const Land = ({ sfts }) => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();
  const /*transactionSessionId*/ [, setTransactionSessionId] = useState<
      string | null
    >(null);

  const ref = useRef();

  const [hovered, hover] = useState(false);

  const [hovered1, hover1] = useState(false);
  

  function strtoHex(str: string) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str.charCodeAt(i).toString(16);
    }
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  function numtoHex(num: number) {
    let result = num.toString(16);
    if (result.length % 2 == 1) {
      result = '0' + result;
    }
    return result;
  }

  const sendStakeTransaction = async (nonce: number) => {
    const data =
      'MultiESDTNFTTransfer@' +
      new Address(contractGameAddress).hex() +
      '@' +
      numtoHex(1) +
      '@' +
      strtoHex(sftCollectionId) +
      '@' +
      numtoHex(nonce) +
      '@' +
      numtoHex(1) +
      '@' +
      strtoHex('stake');

    const stakeTransaction = {
      value: '0',
      data: data,
      receiver: address,
      gasLimit: 10000000
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: stakeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing stake transaction',
        errorMessage: 'An error has occured during stake',
        successMessage: 'Stake transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  useEffect(() => {
    document.body.style.cursor = hovered1 ? 'pointer' : 'auto';
  }, [hovered1]);

  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback={<Loader />}>
        <Stage
          controls={ref}
          preset='rembrandt'
          intensity={4}
          environment='dawn'
        >
          <Model101
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
          />
          {sfts !== undefined &&
          sfts.filter((x) => x === sftCryptNonce).length > 0 ? (
            <CryptStandard position={[3, 1.2, -2.5]} />
          ) : (
            sfts !== undefined &&
            sfts.filter((x) => x === sftCryptNonce).length === 0 && (
              <CryptEmpty
                onClick={(event) => {
                  hover1(false);
                  sendStakeTransaction(sftCryptNonce);
                }}
                onPointerOver={(event) => hover1(true)}
                onPointerOut={(event) => hover1(false)}
                color={hovered1 ? 'blue' : 'white'}
                position={[3, 1.2, -2.5]}
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
