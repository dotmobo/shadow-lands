/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Color, MeshStandardMaterial } from 'three';

export function Tavern({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/Tavern.glb');
  const { actions } = useAnimations(animations, group);

  const emptyMaterial = new MeshStandardMaterial();
  emptyMaterial.color = new Color(color);
  emptyMaterial.transparent = true;
  emptyMaterial.opacity = 0.2;

  const materiauxOnHover = (
    <meshStandardMaterial color={color} transparent opacity={0.2} />
  );

  return (
    <group {...props} dispose={null}>
      {color === undefined && (
        <>
          <pointLight
            position={[4.3041, 1.9694, 5.1689]}
            color={'yellow'}
            power={10}
          />

          <pointLight
            position={[5.5716, 1.9694, 5.4831]}
            color={'yellow'}
            power={10}
          />

          <pointLight
            position={[5.5124, 1.9694, 6.564]}
            color={'yellow'}
            power={10}
          />

          <pointLight
            position={[4.9129, 1.5467, 6.6745]}
            color={'yellow'}
            power={10}
          />

          <pointLight
            position={[4.1262, 1.5467, 6.072]}
            color={'yellow'}
            power={10}
          />

          <pointLight
            position={[4.9558, 1.8621, 5.7825]}
            power={10}
            color={'yellow'}
          />
        </>
      )}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036.geometry}
        material={color ? emptyMaterial : materials.Palette}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036_1.geometry}
        material={color ? emptyMaterial : materials.SkBase}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036_2.geometry}
        material={color ? emptyMaterial : materials.SkShadow}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036_3.geometry}
        material={color ? emptyMaterial : materials.SkTeeth}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036_4.geometry}
        material={color ? emptyMaterial : materials.LanterneVerreLumière}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036_5.geometry}
        material={color ? emptyMaterial : materials.Tabouret}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036_6.geometry}
        material={color ? emptyMaterial : materials['Planches.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube036_7.geometry}
        material={color ? emptyMaterial : materials.Portrait}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={color ? emptyMaterial : materials.MursTerre}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_1.geometry}
        material={color ? emptyMaterial : materials['Planches.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_2.geometry}
        material={color ? emptyMaterial : materials.Vitraux}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_3.geometry}
        material={color ? emptyMaterial : materials.VitresLumière}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_4.geometry}
        material={color ? emptyMaterial : materials.Palette}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_5.geometry}
        material={color ? emptyMaterial : materials.LanterneVerreLumière}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_6.geometry}
        material={color ? emptyMaterial : materials['Cheminée.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_7.geometry}
        material={color ? emptyMaterial : materials.Porte_1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_8.geometry}
        material={color ? emptyMaterial : materials.Floor}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_9.geometry}
        material={color ? emptyMaterial : materials.Poutre_Inst}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004_10.geometry}
        material={color ? emptyMaterial : materials.Ardoises}
      />
    </group>
  );
}

useGLTF.preload('/game/Tavern.glb');
