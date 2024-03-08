import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function FlagSB(props) {
  const { nodes, materials } = useGLTF('/game/Flag_SB.glb');
  return (
    <group {...props} dispose={null}>
      <pointLight position={[5.5, 3.5, -4.2]} power={10} color={'yellow'} />
      <group position={[6.023, 1.997, -4.304]} rotation={[0, -1.014, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials.Bannière_SB}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_1.geometry}
          material={materials.Bannière_SB}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/game/Flag_SB.glb');
