import { div } from 'three/tsl';
import { useStore } from '../helpers/store';

import Window from './Window';

export default function Settings(props) {  
  const store = useStore();  
  const bgs = [{
    url: './assets/bg/clouds.jpg',
    bgColor: "#3B82C4",
    accentColor: "#000000",    
  }, 
  { url : './assets/bg/logos.png'}];
  function setBg(bg){
    store.setBackgroundImg(bg.url); 
    ('accentColor' in bg) ? store.setAccentColor(bg.accentColor): store.setAccentColor(store.accentColor); 
    if ('bgColor' in bg) store.setBackgroundColor(bg.bgColor); 
  }
  return (
    <>
    { (store.openApps.includes( props.title )) ?
      <Window { ...props }>
        <div className="settings windowContent text-xs flex flex-col gap-4 p-4">
          <h2>Background Image</h2>
          <div className="grid grid-cols-2 gap-[10px]">
            { bgs.map((bg, ix) => 
              <div key={ 'bg'+ ix } onClick={ () => setBg(bg)} style={{ backgroundImage: `url(${bg.url})`, backgroundColor: `${ store.backgroundColor }`, ...bg.style}} className={`bg min-h-[100px] rounded-md bg-cover ${(bg.url == store.backgroundImg) ? 'active' : ''}`}>
              </div>
            )}           
            <div className={`bg min-h-[100px] rounded-md ${store.backgroundLight ? 'text-black' : 'text-white'}  ${('' == store.backgroundImg) ? 'active' : ''}`} style={{ backgroundColor: `${ store.backgroundColor }`}} onClick={ () => { store.setBackgroundImg(''); document.getElementById('colorPicker').click()} }>
              <div className="rounded-md flex text-center items-center justify-center h-full w-full">Solid Color</div>
            </div>
          </div>          
          <div className="grid grid-cols-2">
            <div className={`flex items-center gap-4 ${(store.backgroundImg == `./assets/bg/clouds.jpg`)? 'disabled': null}`}>
              <label className="text-xs" htmlFor="colorPicker">Background Color</label>
              <input className="h-8 w-8 cursor-pointer" id="colorPicker" type="color" value={ store.backgroundColor } onChange={ (e) => store.setBackgroundColor(e.target.value) }/>
            </div>
            <div className={`flex items-center gap-4  ${(store.backgroundImg == `./assets/bg/clouds.jpg`)? 'disabled': null}`}>
              <label className="text-xs" htmlFor="colorPicker2">Accent Color</label>
              <input  className="h-8 w-8 cursor-pointer" id="colorPicker2" type="color" value={ store.accentColor } onChange={ (e) => store.setAccentColor(e.target.value) }/>
            </div>  
          </div>
          <div className="grid grid-cols-2">
            <label className="inline-flex items-center cursor-pointer" >
              <input type="checkbox" checked={ store.wallpaper3DLogo } className="sr-only peer" onChange={ () => store.toggle3DLogo() }/>
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">3D Logo</span>
            </label>
            { (store.wallpaper3DLogo && 'ontouchstart' in document.documentElement) ?             
              <button className={`border rounded-full`} onClick={ () => store.setMotionActive(true) }>{(store.motion) ? 'Gyro Activated': 'Activate Gryo'}</button>
            : null }
            </div>
        </div>
      </Window>
    : null }
    </>
  );
}