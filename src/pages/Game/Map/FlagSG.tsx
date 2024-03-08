import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function FlagSG(props) {
  const { nodes, materials } = useGLTF('/game/Flag_SG.glb');
  return (
    <group {...props} dispose={null}>
      <pointLight position={[5.5, 3.5, -4.2]} power={10} color={'yellow'} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bannière_SG.geometry}
        material={materials.Bannière_SG}
        position={[6.023, 1.997, -4.304]}
        rotation={[0, -1.014, 0]}
      />
    </group>
  );
}

useGLTF.preload('/game/Flag_SG.glb');
