import { createElement, Fragment, useRef } from 'react';
import Shortcut from './Shortcut';

import { useStore } from '../helpers/store';

import Window from './Window';

export default function Extras(props) {  
  const store = useStore();  
  const backgroundImg = useStore(state => state.backgroundImg);
  const backgroundColor = useStore(state => state.backgroundColor);
  return (
    <>
    { (store.openApps.includes( props.title )) ?
      <Window { ...props }>
        <div className="extras windowContent text-xs" style={{ backgroundColor: backgroundColor,backgroundImage: `url("./assets/bg/stars.png")`}}>
          { store.shortcuts.filter(({ area }) => area == 'E').map((shortcut) =>                         
            <Fragment key={ shortcut.title + 'shortcut' }>
              <Shortcut key={ shortcut.title + 'shortcut' } {...shortcut} onMouseDown={ () => store.openApp(shortcut.title) }  />
            </Fragment>                    
          )}      
        </div>
      </Window>
    : null }    
    { store.shortcuts.filter(({ area }) => area == 'E').map((shortcut) =>    
       <Fragment key={ shortcut.title + 'shortcut' }>
        { createElement(shortcut.component, { title: shortcut.title, key:shortcut.title, icon:shortcut.icon, data: shortcut.data , style: shortcut.style }  )}  
      </Fragment>
    )}  
    </>
  );
}