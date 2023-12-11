import { OutputContainer } from 'components/OutputContainer';
import { MutableRefObject, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box(props: any) {
  const ref: MutableRefObject<any> = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 5 : 3}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export const Land = () => {
  return (
    <OutputContainer>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
      </Canvas>
    </OutputContainer>
  );
};
