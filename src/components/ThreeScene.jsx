import { useRef } from 'react'
import { useStore } from '../helpers/store';

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

export default function ThreeScene(props) {  
  const Ref = useRef(null);  
  const store = useStore();

  return (
    <>
    <Canvas dpr={[1, 2]} camera={{ fov: 5, position: props.position }} onClick={ props.onClick }>                          
        <directionalLight position={[0, 0, 4]} intensity={6} color="white" />       
        { store.backgroundImg == `./assets/bg/clouds.jpg` ?
          <Environment files="./assets/clouds.exr" />
        : <><pointLight position={[0, 10, 0]} intensity={300} /> <pointLight position={[0, -10, 0]} intensity={100} /></>
      }
        { props.children }                
    </Canvas>    
    </>
  );
}

