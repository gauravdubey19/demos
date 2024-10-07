
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function Character(props) {
  const { nodes, materials } = useGLTF('/character.glb')
  const materialRef = useRef(null);
  const baseRef = useRef(null);

  const {textureUrl, baseTextureUrl} = props;

  useEffect(() => {
    if (textureUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(textureUrl, (texture) => {
        if (materialRef.current) {
          materialRef.current.map = texture;
          materialRef.current.needsUpdate = true;
        }
      });
    }
    if (baseTextureUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(baseTextureUrl, (texture) => {
        if (baseRef.current) {
          baseRef.current.map = texture;
          baseRef.current.needsUpdate = true;
        }
      });
    }
  }, [textureUrl, baseTextureUrl]);

  return (
    <group {...props} dispose={null}>
      <pointLight intensity={6} decay={2} position={[0.043, 1.454, 1.966]} rotation={[-Math.PI / 2, 0, 0]} />
      <pointLight intensity={6} decay={2} position={[-0.023, 1.439, -2.123]} rotation={[-2.546, -0.009, -3.135]} />
      <pointLight intensity={6} decay={2} position={[1.635, 1.454, -0.412]} rotation={[-1.847, 0.825, 1.939]} />
      <pointLight intensity={6} decay={2} position={[-1.702, 1.454, -0.412]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.hands.geometry} material={materials.Wolf3D_Body} />
      <mesh geometry={nodes.boots.geometry} material={materials.Wolf3D_Outfit_Footwear} />
     
      <mesh geometry={nodes.pants.geometry}>
        <meshStandardMaterial 
        ref={baseRef}
        attach={"material"}
        roughness={0.7}
        // map={materials.Wolf3D_Outfit_Bottom}
        />
        </mesh>
         { /* material={materials.Wolf3D_Outfit_Bottom} */}
      
      <mesh geometry={nodes.shirt.geometry}>
        <meshStandardMaterial
        ref={materialRef}
        attach="material"
        roughness={0.6}
        />
      </mesh>
      
      <mesh geometry={nodes.pants001.geometry} material={materials['Material.001']} />
      <mesh geometry={nodes.pants001_1.geometry} material={materials['Material.002']} />
      <mesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <mesh name="Wolf3D_Head_1" geometry={nodes.Wolf3D_Head_1.geometry} material={materials.Wolf3D_Eye} morphTargetDictionary={nodes.Wolf3D_Head_1.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head_1.morphTargetInfluences} />
      <mesh name="Wolf3D_Head_2" geometry={nodes.Wolf3D_Head_2.geometry} material={materials.Wolf3D_Hair} morphTargetDictionary={nodes.Wolf3D_Head_2.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head_2.morphTargetInfluences} />
      <mesh name="Wolf3D_Head_3" geometry={nodes.Wolf3D_Head_3.geometry} material={materials.Wolf3D_Teeth} morphTargetDictionary={nodes.Wolf3D_Head_3.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head_3.morphTargetInfluences} />
    </group>
  )
}

useGLTF.preload('/character.glb')
