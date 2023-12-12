import { OutputContainer } from 'components/OutputContainer';
import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model101 } from './Model101';
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei';
import { Html } from '@react-three/drei';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grave } from './Grave';
import { GraveHp } from './GraveHp';

function Loader() {
  return (
    <Html center>
      <FontAwesomeIcon icon={faSpinner} spin color='white' />
    </Html>
  );
}

export const Land = () => {
  const ref = useRef();

  const [clicked1, click1] = useState(false);
  const [clicked2, click2] = useState(false);
  const [clicked3, click3] = useState(false);
  const [clicked4, click4] = useState(false);
  const [clicked5, click5] = useState(false);

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
          {!clicked1 ? (
            <Grave
              onClick={(event) => click1(!clicked1)}
              position={[3, 1.2, -2.5]}
            />
          ) : (
            <GraveHp position={[3, 1.2, -2.5]} />
          )}
          {!clicked2 ? (
            <Grave
              onClick={(event) => click2(!clicked2)}
              position={[1, 1.1, 3]}
            />
          ) : (
            <GraveHp position={[1, 1.1, 3]} />
          )}
          {!clicked3 ? (
            <Grave
              onClick={(event) => click3(!clicked3)}
              position={[-5, 1.1, 5]}
            />
          ) : (
            <GraveHp position={[-5, 1.1, 5]} />
          )}
          {!clicked4 ? (
            <Grave
              onClick={(event) => click4(!clicked4)}
              position={[-6, 2, -6]}
            />
          ) : (
            <GraveHp position={[-6, 2, -6]} />
          )}
          {!clicked5 ? (
            <Grave
              onClick={(event) => click5(!clicked5)}
              position={[3, 1.3, -8]}
            />
          ) : (
            <GraveHp position={[3, 1.3, -8]} />
          )}
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
