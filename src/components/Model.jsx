import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('./assets/logo.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Curve.geometry}
        material={materials.SVGMat}
        rotation={[Math.PI / 1.9, .2, 0]}
      />
    </group>
  )
}

useGLTF.preload('./assets/logo.gltf')
