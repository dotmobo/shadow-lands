/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function StatueShroom({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/game/StatueShroom.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Action.play();
  }, [group]);

  const initialMaterial = materials.Shroom.clone();
  const highlightMaterial = initialMaterial.clone();
  highlightMaterial.color.set(color);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Shroom"
          castShadow
          receiveShadow
          geometry={nodes.Shroom.geometry}
          material={color ? highlightMaterial : initialMaterial}
          position={[-0.003, 1.928, 0.026]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/game/StatueShroom.glb");
