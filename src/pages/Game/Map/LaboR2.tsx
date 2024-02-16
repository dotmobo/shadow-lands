/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function LaboR2({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/Labo+2.glb');
  const { actions } = useAnimations(animations, group);

  const position = [-4.6456, 1.0172, 0.69635];
  const rotation = [0, 1.5538236, 0];

  useEffect(() => {
    actions.KeyAction.play();
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
      <group name='Scene'>
        <group name='Labo'>
          <mesh
            name='Cube007'
            castShadow
            receiveShadow
            geometry={nodes.Cube007.geometry}
            material={materials.Base}
            morphTargetDictionary={nodes.Cube007.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube007.morphTargetInfluences}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Cube007_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_1.geometry}
            material={materials.Cuivre}
            morphTargetDictionary={nodes.Cube007_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube007_1.morphTargetInfluences}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Cube007_2'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_2.geometry}
            material={materials.Tuyaux}
            morphTargetDictionary={nodes.Cube007_2.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube007_2.morphTargetInfluences}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Cube007_3'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_3.geometry}
            material={materials.Lumière}
            morphTargetDictionary={nodes.Cube007_3.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube007_3.morphTargetInfluences}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Cube007_4'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_4.geometry}
            material={materials.Palette}
            morphTargetDictionary={nodes.Cube007_4.morphTargetDictionary}
            morphTargetInfluences={nodes.Cube007_4.morphTargetInfluences}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/game/Labo+2.glb');
