/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function HauntedHouse({ position, color, rotation, ...props }: any) {
  const { nodes, materials } = useGLTF('/game/HauntedHouse.glb');
  return (
    <group {...props} dispose={null}>
      <spotLight
        position={[position[0], position[1] + 0.2, position[2]]}
        color={'chartreuse'}
        intensity={Math.PI * 10}
      />
      <mesh
        name='Cube001'
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.HauntedGlobal}
        position={position}
        scale={[0.3, 0.3, 0.3]}
        rotation={rotation}
      >
        {color !== undefined && (
          <meshStandardMaterial color={color} transparent />
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload('/game/HauntedHouse.glb');
