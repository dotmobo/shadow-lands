import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("public/game/Road Scene.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1.geometry}
        material={materials["03___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_1.geometry}
        material={materials["01___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_2.geometry}
        material={materials.Material__503}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_3.geometry}
        material={materials["08___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_4.geometry}
        material={materials.Material__506}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_5.geometry}
        material={materials.Material__505}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_6.geometry}
        material={materials.Material__507}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_7.geometry}
        material={materials.Material__504}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_8.geometry}
        material={materials["11___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_9.geometry}
        material={materials["09___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_10.geometry}
        material={materials["04___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_11.geometry}
        material={materials["06___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_12.geometry}
        material={materials["05___Default"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GeoSphere022_1_13.geometry}
        material={materials["10___Default"]}
      />
    </group>
  );
}

useGLTF.preload("public/game/Road Scene.glb");