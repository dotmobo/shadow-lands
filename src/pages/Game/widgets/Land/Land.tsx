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

function Loader() {
  return (
    <Html center>
      <FontAwesomeIcon icon={faSpinner} spin color='white' />
    </Html>
  );
}

export const Land = () => {
  const ref = useRef();

  const [hovered, hover] = useState(false);

  const [clicked1, click1] = useState(false);
  const [clicked2, click2] = useState(false);
  const [clicked3, click3] = useState(false);
  const [clicked4, click4] = useState(false);
  const [clicked5, click5] = useState(false);

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
          {!clicked1 ? (
            <Grave
              onClick={(event) => {
                hover1(false);
                click1(!clicked1);
              }}
              onPointerOver={(event) => hover1(true)}
              onPointerOut={(event) => hover1(false)}
              color={hovered1 ? 'blue' : 'white'}
              position={[3, 1.2, -2.5]}
            />
          ) : (
            <GraveHp position={[3, 1.2, -2.5]} />
          )}
          {!clicked2 ? (
            <Grave
              onClick={(event) => {
                hover2(false);
                click2(!clicked2);
              }}
              onPointerOver={(event) => hover2(true)}
              onPointerOut={(event) => hover2(false)}
              color={hovered2 ? 'blue' : 'white'}
              position={[1, 1.1, 3]}
            />
          ) : (
            <GraveHp position={[1, 1.1, 3]} />
          )}
          {!clicked3 ? (
            <Grave
              onClick={(event) => {
                hover3(false);
                click3(!clicked3);
              }}
              onPointerOver={(event) => hover3(true)}
              onPointerOut={(event) => hover3(false)}
              color={hovered3 ? 'blue' : 'white'}
              position={[-5, 1.1, 5]}
            />
          ) : (
            <GraveHp position={[-5, 1.1, 5]} />
          )}
          {!clicked4 ? (
            <Grave
              onClick={(event) => {
                hover4(false);
                click4(!clicked4);
              }}
              onPointerOver={(event) => hover4(true)}
              onPointerOut={(event) => hover4(false)}
              color={hovered4 ? 'blue' : 'white'}
              position={[-6, 2, -6]}
            />
          ) : (
            <GraveHp position={[-6, 2, -6]} />
          )}
          {!clicked5 ? (
            <Grave
              onClick={(event) => {
                hover5(false);
                click5(!clicked5);
              }}
              onPointerOver={(event) => hover5(true)}
              onPointerOut={(event) => hover5(false)}
              color={hovered5 ? 'blue' : 'white'}
              position={[3, 1.3, -8]}
            />
          ) : (
            <GraveHp position={[3, 1.3, -8]} />
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
