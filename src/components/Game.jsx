import { useStore } from '../helpers/store';
import { useRef } from 'react'


import Window from './Window';

export default function Game(props) {  
  const Ref = useRef();
  const store = useStore();  
  return (
    <>
    { (store.openApps.includes( props.title )) ?
      <Window { ...props }>
        <div className="game windowContent">
          <iframe id="game" src="./jungleping" onLoad={()=>document.getElementById('game').focus()} style={{ width:"100%",height:"calc(100% - 50px)"}}></iframe>
        </div>
      </Window>
    : null }
    </>
  );
}