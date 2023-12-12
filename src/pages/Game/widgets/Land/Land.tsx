import { OutputContainer } from 'components/OutputContainer';
import { Suspense, useRef } from 'react';
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

const Sphere = () => {
  return (
    <mesh visible position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color='blue' transparent />
    </mesh>
  );
};

const Box = () => {
  return (
    <mesh visible position={[5, 2, 1]} rotation={[Math.PI / 2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='blue' transparent />
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
          <Sphere />
          <Box />
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
