/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function Crypt({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/Crypt.glb');
  const { actions } = useAnimations(animations, group);

  const position = [1.8028, 1.378, -5.3541];
  const rotation = [0, -0.4952958, 0];

  useEffect(() => {
    if (color === undefined) {
      actions.Action.play();
    }
  }, [group]);

  return (
    <group ref={group} {...props} dispose={null}>
      {color === undefined && (
        <spotLight
          position={[position[0] - 0.8, position[1] + 0.2, position[2] + 1]}
          color={'gold'}
          intensity={Math.PI * 2}
        />
      )}
      <group name='Scene'>
        <group name='Crypte001'>
          <mesh
            name='Plane002'
            castShadow
            receiveShadow
            geometry={nodes.Plane002.geometry}
            material={materials.Base}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Plane002_1'
            castShadow
            receiveShadow
            geometry={nodes.Plane002_1.geometry}
            material={materials.Etage}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Plane002_2'
            castShadow
            receiveShadow
            geometry={nodes.Plane002_2.geometry}
            material={materials.Colonnes}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Plane002_3'
            castShadow
            receiveShadow
            geometry={nodes.Plane002_3.geometry}
            material={materials.Toit}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Plane002_4'
            castShadow
            receiveShadow
            geometry={nodes.Plane002_4.geometry}
            material={materials.Vitraux}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Plane002_5'
            castShadow
            receiveShadow
            geometry={nodes.Plane002_5.geometry}
            material={materials.Vitres}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
          <mesh
            name='Plane002_6'
            castShadow
            receiveShadow
            geometry={nodes.Plane002_6.geometry}
            material={materials.Porte}
          >
            {color !== undefined && (
              <meshStandardMaterial color={color} transparent opacity={0.2} />
            )}
          </mesh>
        </group>
        {color === undefined && (
          <group
            name='Armature001'
            position={[1.629, 3.762, -3.95]}
            rotation={[-2.471, -1.35, -2.447]}
          >
            <skinnedMesh
              name='Cube002'
              geometry={nodes.Cube002.geometry}
              material={materials.Corbeau}
              skeleton={nodes.Cube002.skeleton}
            />
            <primitive object={nodes.Bone} />
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload('/game/Crypt.glb');
