/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export function TavernR1({ color, ...props }: any) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/game/Tavern+1.glb');
  const { actions } = useAnimations(animations, group);

  // const position = [4.435, 1.067, 5.3641];
  // const rotation = [0, -2.2521728667735, 0];

  const materiauxOnHover = (
    <meshStandardMaterial color={color} transparent opacity={0.2} />
  );

  useEffect(() => {
    actions.Action.play();
  }, [group]);

  return (
    <group ref={group} {...props} dispose={null}>
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
      <group name='Scene'>
        <mesh
          name='Tonneaux'
          castShadow
          receiveShadow
          geometry={nodes.Tonneaux.geometry}
          material={materials.Tonneau}
        >
          {color !== undefined && materiauxOnHover}
        </mesh>
        <mesh
          name='Fantom'
          castShadow
          receiveShadow
          geometry={nodes.Fantom.geometry}
          material={materials.Fantom1}
          morphTargetDictionary={nodes.Fantom.morphTargetDictionary}
          morphTargetInfluences={nodes.Fantom.morphTargetInfluences}
          position={[3.761, 1.489, 4.818]}
          rotation={[-3.063, -1.519, -3.124]}
        >
          {color !== undefined && materiauxOnHover}
        </mesh>
        <group name='Taverne+1'>
          <mesh
            name='Cube007'
            castShadow
            receiveShadow
            geometry={nodes.Cube007.geometry}
            material={materials.MursPierresOcre}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_1.geometry}
            material={materials['Planches.001']}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_2'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_2.geometry}
            material={materials.Vitraux}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_3'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_3.geometry}
            material={materials.VitresLumière}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_4'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_4.geometry}
            material={materials.Palette}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_5'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_5.geometry}
            material={materials.LanterneVerreLumière}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_6'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_6.geometry}
            material={materials['Cheminée.001']}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_7'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_7.geometry}
            material={materials.Porte_1}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_8'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_8.geometry}
            material={materials.Floor}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_9'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_9.geometry}
            material={materials.Poutre_Inst}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube007_10'
            castShadow
            receiveShadow
            geometry={nodes.Cube007_10.geometry}
            material={materials.ArdoisesRouges}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
        </group>
        <group name='Interieur'>
          <mesh
            name='Cube036'
            castShadow
            receiveShadow
            geometry={nodes.Cube036.geometry}
            material={materials.Palette}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube036_1'
            castShadow
            receiveShadow
            geometry={nodes.Cube036_1.geometry}
            material={materials.SkBase}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube036_2'
            castShadow
            receiveShadow
            geometry={nodes.Cube036_2.geometry}
            material={materials.SkShadow}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube036_3'
            castShadow
            receiveShadow
            geometry={nodes.Cube036_3.geometry}
            material={materials.SkTeeth}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube036_4'
            castShadow
            receiveShadow
            geometry={nodes.Cube036_4.geometry}
            material={materials.LanterneVerreLumière}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube036_5'
            castShadow
            receiveShadow
            geometry={nodes.Cube036_5.geometry}
            material={materials.Tabouret}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube036_6'
            castShadow
            receiveShadow
            geometry={nodes.Cube036_6.geometry}
            material={materials['Planches.001']}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
          <mesh
            name='Cube036_7'
            castShadow
            receiveShadow
            geometry={nodes.Cube036_7.geometry}
            material={materials.Portrait}
          >
            {color !== undefined && materiauxOnHover}
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/game/Tavern+1.glb');
