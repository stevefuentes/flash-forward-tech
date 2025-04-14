import { createElement } from 'react';
import { useStore } from '../helpers/store';

import Shortcut from './Shortcut';
import ComputerIcon from '../assets/computer-icon.svg';
import ClientIcon from '../assets/client-icon.svg';
import TrashIcon from '../assets/trash-icon.svg';

export default function Dock() {        
  const store = useStore();  
  const openApps = useStore((state) => state.openApps)  
  const openContextMenu = function(e,app){
    e.preventDefault()      
    store.setMenuXY({x:e.clientX, y:e.clientY});
    store.toggleContextMenu(app);
  }
  return (
    <>    
      <div className="dock rounded-3xl h-[78px] flex gap-[10px] bg-(--dock-bg-color)">
        { (openApps.length) ?            
          <Shortcut icon={ ComputerIcon } title="Show Desktop" onMouseDown={ (JSON.stringify(store.openApps) !== JSON.stringify(store.hiddenApps)) ? () => store.hideAllApps() :  () => store.restoreApps() }/>
        : null }         
        { 'shortcuts' in store && store.shortcuts.map((shortcut) =>
        ( store.openApps.includes(shortcut.title)) ?          
          <Shortcut className={(!store.hiddenApps.includes(shortcut.title)) ? "active" : 'inactive'} {...shortcut } key={ `dock-${shortcut.title}`} onContextMenu={ (e) => openContextMenu(e,shortcut.title) } onClick={store.hiddenApps.find((a) => a == shortcut.title) ? () => store.toggleActive(shortcut.title) : () => store.hideApp(shortcut.title)} />
        : null )}                            
        {(store.openApps.includes('Client Work')) ?          
          <Shortcut icon={ ClientIcon } title={store.client.title } className={(!store.hiddenApps.includes('Client Work')) ? "active" : 'inactive'} key={ `dock-client`} onContextMenu={ (e) => openContextMenu(e,'Client Work') } onClick={store.hiddenApps.find((a) => a == 'Client Work') ? () => store.toggleActive('Client Work') : () => store.hideApp('Client Work')} />
        : null }                            
      </div>
      <div className={`${(store.contextMenu == '') ? "hidden": '' } absolute context-menu rounded-sm bg-gray-600 w-24 h-10 p-4 text-xs flex items-center justify-center`} style={{ left: store.menuXY.x, top: store.menuXY.y}} onMouseLeave={() => store.toggleContextMenu('')}>          
        <a onClick={ () => {store.closeApp(store.contextMenu);store.toggleContextMenu('')} } className='flex gap-2 items-center'><TrashIcon />Close</a>
      </div>
    </>
  );
}