import { useRef } from 'react';

import { OrbitControls } from '@react-three/drei'
import { useStore } from '../helpers/store';

import Window from './Window';
import ThreeScene from './ThreeScene';
import Model from './Model';

export default function Three(props) {
  const ref = useRef();
  const store = useStore();  

  return (
    <>    
      { (store.openApps.includes(props.title)) ?
        <Window { ...props }>
          <div className="three">
            <ThreeScene position={[0,0,4]}>            
              <Model />
              <OrbitControls ref={ref} autoRotate />
            </ThreeScene>
          </div>
        </Window>
      : null }
    </>
  )
}