import { OutputContainer } from 'components/OutputContainer';
import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model101 } from './Model101';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loader() {
  return (
    <Html center>
      <FontAwesomeIcon icon={faSpinner} spin color='white' />
    </Html>
  );
}

const Box = ({ position }: { position: [number, number, number] }) => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  return (
    <mesh
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      onClick={(event) => click(!clicked)}
      visible={!clicked}
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'yellow' : 'blue'} transparent />
    </mesh>
  );
};

export const Land = () => {
  const ref = useRef();
  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback={<Loader />}>
        <Stage
          controls={ref}
          preset='rembrandt'
          intensity={4}
          environment='dawn'
        >
          <Model101 />
          <Box position={[5, 2, 1]} />
          <Box position={[1, 1.5, 3]} />
          <Box position={[-6, 1.5, 5]} />
          <Box position={[-6, 2.3, -7]} />
          <Box position={[3, 1.5, -8]} />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate />
      <PerspectiveCamera
        makeDefault
        position={[500, 200, 1]}
        fov={50}
        zoom={20}
      />
    </Canvas>
  );
};
