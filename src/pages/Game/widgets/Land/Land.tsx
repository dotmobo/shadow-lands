import { OutputContainer } from 'components/OutputContainer';
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model101 } from './Model101';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { Html } from '@react-three/drei'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loader() {
  return <Html center><FontAwesomeIcon icon={faSpinner} spin color='white'/></Html>
}

export const Land = () => {
  const ref = useRef();
  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback={<Loader />}>
        <Stage
          controls={ref}
          preset='rembrandt'
          intensity={1}
          environment='city'
        >
          false
          <Model101 />
          false
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
