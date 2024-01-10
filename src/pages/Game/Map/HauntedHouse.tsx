/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function HauntedHouse({ position, color, rotation, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/HauntedHouse.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (color === undefined) {
      actions.Action.play();
    }
  }, [group]);

  return (
    <group ref={group} {...props} dispose={null}>
      {color === undefined && (
        <spotLight
          position={[position[0] - 0.3, position[1] + 0.2, position[2]]}
          color={'purple'}
          intensity={Math.PI * 2}
        />
      )}
      <group name='Scene'>
        <group
          name='HauntedHouse'
          // position={position}
          // scale={[0.211, 0.211, 0.211]}
          // rotation={rotation}
        >
          <mesh
            name='HauntedHouse_1'
            castShadow
            receiveShadow
            geometry={nodes.HauntedHouse_1.geometry}
            material={materials.Facade}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='HauntedHouse_2'
            castShadow
            receiveShadow
            geometry={nodes.HauntedHouse_2.geometry}
            material={materials.Palette}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='HauntedHouse_3'
            castShadow
            receiveShadow
            geometry={nodes.HauntedHouse_3.geometry}
            material={materials.Porte}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='HauntedHouse_4'
            castShadow
            receiveShadow
            geometry={nodes.HauntedHouse_4.geometry}
            material={materials.VitresLumiere}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='HauntedHouse_5'
            castShadow
            receiveShadow
            geometry={nodes.HauntedHouse_5.geometry}
            material={materials.Toit}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
        </group>
        {color === undefined && (
          <group
            name='Armature1'
            position={[5.25, 3.451, -1.178]}
            rotation={[-3.135, -0.07, -3.139]}
          >
            <skinnedMesh
              name='ChauveSouris_1'
              geometry={nodes.ChauveSouris_1.geometry}
              material={materials.Palette}
              skeleton={nodes.ChauveSouris_1.skeleton}
            />
            <primitive object={nodes.Bone} />
          </group>
        )}
        {color === undefined && (
          <group
            name='Armature002'
            position={[5.649, 3.588, -2.208]}
            rotation={[0.025, -0.369, 0.007]}
          >
            <skinnedMesh
              name='ChauveSouris_1001'
              geometry={nodes.ChauveSouris_1001.geometry}
              material={materials.Palette}
              skeleton={nodes.ChauveSouris_1001.skeleton}
            />
            <primitive object={nodes.Bone_1} />
          </group>
        )}
        {color === undefined && (
          <group
            name='Armature003'
            position={[5.718, 2.913, 0.634]}
            rotation={[-3.134, -0.818, -3.13]}
          >
            <skinnedMesh
              name='ChauveSouris_1002'
              geometry={nodes.ChauveSouris_1002.geometry}
              material={materials.Palette}
              skeleton={nodes.ChauveSouris_1002.skeleton}
            />
            <primitive object={nodes.Bone_2} />
          </group>
        )}
        {color === undefined && (
          <group
            name='Armature004'
            position={[5.185, 2.514, -2.605]}
            rotation={[2.739, 0.538, -1.798]}
          >
            <skinnedMesh
              name='ChauveSouris_1003'
              geometry={nodes.ChauveSouris_1003.geometry}
              material={materials.Palette}
              skeleton={nodes.ChauveSouris_1003.skeleton}
            />
            <primitive object={nodes.Bone_3} />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload('/game/HauntedHouse.glb');
