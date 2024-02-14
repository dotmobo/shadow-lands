/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function StatueDusty({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/StatueDusty.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Action.play();
  }, [group]);

  const initialMaterial = materials.DustySkin.clone();
  const highlightMaterial = initialMaterial.clone();
  highlightMaterial.color.set(color);

  const initialMaterialBob = materials.BobNoir.clone();
  const highlightMaterialBob = initialMaterial.clone();
  highlightMaterialBob.color.set(color);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <group name='Dusty' position={[-0.004, 1.915, 0.023]}>
          <mesh
            name='Cube038'
            castShadow
            receiveShadow
            geometry={nodes.Cube038.geometry}
            material={color ? highlightMaterial : initialMaterial}
          />
          <mesh
            name='Cube038_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube038_1.geometry}
            material={color ? highlightMaterialBob : initialMaterialBob}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/game/StatueDusty.glb');
