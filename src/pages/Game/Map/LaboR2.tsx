/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Color, MeshStandardMaterial } from 'three';

export function LaboR2({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/Labo+2.glb');
  const { actions } = useAnimations(animations, group);

  const position = [-4.6456, 1.0172, 0.69635];
  const rotation = [0, 1.5538236, 0];

  const emptyMaterial = new MeshStandardMaterial();
  emptyMaterial.color = new Color(color);
  emptyMaterial.transparent = true;
  emptyMaterial.opacity = 0.2;

  useEffect(() => {
    actions.Action.play();
  }, [group]);

  return (
    <group ref={group} {...props} dispose={null}>
      {color === undefined && (
        <spotLight
          position={[position[0] + 0.8, position[1] + 0.2, position[2]]}
          color={'chartreuse'}
          intensity={Math.PI * 2}
        />
      )}
      <group name="Scene">
        <group name="Labo_2" position={[-4.244, 1.822, 0.949]}>
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={color ? emptyMaterial : materials.Base_2}
            morphTargetDictionary={nodes.Cube002.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002.morphTargetInfluences}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={color ? emptyMaterial : materials.Cuivre_2}
            morphTargetDictionary={nodes.Cube002_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_1.morphTargetInfluences}
          />
          <mesh
            name="Cube002_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={color ? emptyMaterial : materials.Tuyaux}
            morphTargetDictionary={nodes.Cube002_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_2.morphTargetInfluences}
          />
          <mesh
            name="Cube002_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_3.geometry}
            material={color ? emptyMaterial : materials.Lumière}
            morphTargetDictionary={nodes.Cube002_3.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_3.morphTargetInfluences}
          />
          <mesh
            name="Cube002_4"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_4.geometry}
            material={color ? emptyMaterial : materials["SkBase.001"]}
            morphTargetDictionary={nodes.Cube002_4.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_4.morphTargetInfluences}
          />
          <mesh
            name="Cube002_5"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_5.geometry}
            material={color ? emptyMaterial : materials["SkShadow.001"]}
            morphTargetDictionary={nodes.Cube002_5.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_5.morphTargetInfluences}
          />
          <mesh
            name="Cube002_6"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_6.geometry}
            material={color ? emptyMaterial : materials["SkTeeth.001"]}
            morphTargetDictionary={nodes.Cube002_6.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_6.morphTargetInfluences}
          />
          <mesh
            name="Cube002_7"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_7.geometry}
            material={color ? emptyMaterial : materials["BlueJean.001"]}
            morphTargetDictionary={nodes.Cube002_7.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_7.morphTargetInfluences}
          />
          <mesh
            name="Cube002_8"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_8.geometry}
            material={color ? emptyMaterial : materials["PullJaquart.001"]}
            morphTargetDictionary={nodes.Cube002_8.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_8.morphTargetInfluences}
          />
          <mesh
            name="Cube002_9"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_9.geometry}
            material={color ? emptyMaterial : materials.Palette}
            morphTargetDictionary={nodes.Cube002_9.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_9.morphTargetInfluences}
          />
          <mesh
            name="Cube002_10"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_10.geometry}
            material={color ? emptyMaterial : materials["Floor.001"]}
            morphTargetDictionary={nodes.Cube002_10.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_10.morphTargetInfluences}
          />
          <mesh
            name="Cube002_11"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_11.geometry}
            material={color ? emptyMaterial : materials.PortraitProf}
            morphTargetDictionary={nodes.Cube002_11.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_11.morphTargetInfluences}
          />
          <mesh
            name="Cube002_12"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_12.geometry}
            material={color ? emptyMaterial : materials.Eprouvettes}
            morphTargetDictionary={nodes.Cube002_12.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_12.morphTargetInfluences}
          />
          <mesh
            name="Cube002_13"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_13.geometry}
            material={color ? emptyMaterial : materials["SkBase.002"]}
            morphTargetDictionary={nodes.Cube002_13.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_13.morphTargetInfluences}
          />
          <mesh
            name="Cube002_14"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_14.geometry}
            material={color ? emptyMaterial : materials["SkShadow.002"]}
            morphTargetDictionary={nodes.Cube002_14.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_14.morphTargetInfluences}
          />
          <mesh
            name="Cube002_15"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_15.geometry}
            material={color ? emptyMaterial : materials["Crayon_Tube_Rouge.001"]}
            morphTargetDictionary={nodes.Cube002_15.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_15.morphTargetInfluences}
          />
          <mesh
            name="Cube002_16"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_16.geometry}
            material={color ? emptyMaterial : materials["Crayon_Clic.002"]}
            morphTargetDictionary={nodes.Cube002_16.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_16.morphTargetInfluences}
          />
          <mesh
            name="Cube002_17"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_17.geometry}
            material={color ? emptyMaterial : materials["BlancLaque.001"]}
            morphTargetDictionary={nodes.Cube002_17.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_17.morphTargetInfluences}
          />
          <mesh
            name="Cube002_18"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_18.geometry}
            material={color ? emptyMaterial : materials.Classeurs}
            morphTargetDictionary={nodes.Cube002_18.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_18.morphTargetInfluences}
          />
          <mesh
            name="Cube002_19"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_19.geometry}
            material={color ? emptyMaterial : materials.VieuxLivre}
            morphTargetDictionary={nodes.Cube002_19.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_19.morphTargetInfluences}
          />
          <mesh
            name="Cube002_20"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_20.geometry}
            material={color ? emptyMaterial : materials.SolLabo}
            morphTargetDictionary={nodes.Cube002_20.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube002_20.morphTargetInfluences}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/game/Labo+2.glb");
