import { OutputContainer } from 'components/OutputContainer';
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Model';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';

export const Land = () => {
  const ref = useRef();
  return (
    <Canvas shadows dpr={[1, 2]}>
      <Suspense fallback={null}>
        <Stage
          controls={ref}
          preset='rembrandt'
          intensity={1}
          environment='city'
        >
          false
          <Model />
          false
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate />
      <PerspectiveCamera
        makeDefault
        position={[500, 200, 1]}
        fov={50}
        zoom={2}
      />
    </Canvas>
  );
};
