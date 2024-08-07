/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function NeonLeaderBoard(props) {
  const { nodes, materials } = useGLTF('/game/NeonLeaderBoard.glb');
  return (
    <group {...props} dispose={null}>
      <group position={[5, 2.6, 2]} rotation={[Math.PI, -1.309, Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.BarreMetallique}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['Rewards-123']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials.NFT1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_3.geometry}
          material={materials.NFT2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_4.geometry}
          material={materials.NFT3}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_5.geometry}
          material={materials.Ampoules}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_6.geometry}
          material={materials.LedsRouges}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_7.geometry}
          material={materials.LedsJaunes}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_8.geometry}
          material={materials.LedsVertes}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_9.geometry}
          material={materials.NeonRouge}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_10.geometry}
          material={materials.NeonVert}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_11.geometry}
          material={materials.NeonRougeClignotant}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_12.geometry}
          material={materials.AmpouleClignotante}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_13.geometry}
          material={materials.Luminaires}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_14.geometry}
          material={materials.Lampes}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/game/NeonLeaderBoard.glb');
