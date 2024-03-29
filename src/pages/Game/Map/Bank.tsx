/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Color, MeshStandardMaterial } from "three";

export function Bank({ color, ...props }: any) {
  const { nodes, materials } = useGLTF("/game/Bank.glb");

  const position = [-3.0777, 1.0154, -3.8426];
  const rotation = [0, 0.2688036, 0];

  const emptyMaterial = new MeshStandardMaterial();
  emptyMaterial.color = new Color(color);
  emptyMaterial.transparent = true;
  emptyMaterial.opacity = 0.2;

  return (
    <group {...props} dispose={null}>
      {color === undefined && (
        <spotLight
          position={[position[0], position[1] + 0.2, position[2] + 0.3]}
          color={'aqua'}
          intensity={Math.PI * 2}
        />
      )}
      <group position={[-2.912, 1.92, -3.635]} rotation={[0, 0.267, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={color ? emptyMaterial : materials.BankFace}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_1.geometry}
          material={color ? emptyMaterial : materials.BankSoubassement}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_2.geometry}
          material={color ? emptyMaterial : materials.BankToit}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_3.geometry}
          material={color ? emptyMaterial : materials.Lumiere}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_4.geometry}
          material={color ? emptyMaterial : materials.BankColonnes}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_5.geometry}
          material={color ? emptyMaterial : materials.Palette}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_6.geometry}
          material={color ? emptyMaterial : materials.Enseigne}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_7.geometry}
          material={color ? emptyMaterial : materials.Floor}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_8.geometry}
          material={color ? emptyMaterial : materials.Walls}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_9.geometry}
          material={color ? emptyMaterial : materials.Ceiling}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_10.geometry}
          material={color ? emptyMaterial : materials.BlancLaque}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_11.geometry}
          material={color ? emptyMaterial : materials["SkBase.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_12.geometry}
          material={color ? emptyMaterial : materials["SkShadow.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_13.geometry}
          material={color ? emptyMaterial : materials["SkTeeth.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_14.geometry}
          material={color ? emptyMaterial : materials.PortraitBeni}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_15.geometry}
          material={color ? emptyMaterial : materials.EGLD_Chart}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_16.geometry}
          material={color ? emptyMaterial : materials.TapisPersan}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_17.geometry}
          material={color ? emptyMaterial : materials.Classeurs}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/game/Bank.glb");

