import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function StatueBurnify({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/StatueBurnify.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Action.play();
  }, [group]);

  const initialMaterial = materials['Material.001'].clone();
  const highlightMaterial = initialMaterial.clone();
  highlightMaterial.color.set(color);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Scene'>
        <mesh
          name='Burnify'
          castShadow
          receiveShadow
          geometry={nodes.Burnify.geometry}
          material={color ? highlightMaterial : initialMaterial}
          position={[0.013, 1.966, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/game/StatueBurnify.glb');
