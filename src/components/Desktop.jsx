import { createElement, Fragment, useRef, useEffect } from 'react';
import { useStore } from '../helpers/store';
import Three from './Three';
import Game from './Game';
import data from "../data.yaml";
import Mail from './Mail';
import About from './About';
import Work from './Work';
import Dock from './Dock';
import Extras from './Extras';
import Wallpaper from './Wallpaper';
import SiteHeader from './SiteHeader';
import Shortcut from './Shortcut';
import Settings from './Settings';
import ArcadeIcon from '../assets/arcade-icon.svg';
import CubeIcon from '../assets/cube-icon.svg';

import Logo from '../assets/logo.svg';
import ClientsIcon from '../assets/clients-icon.svg';
import MailIcon from '../assets/mail-icon.svg';
import SettingsIcon from '../assets/settings-icon.svg';
import StarIcon from '../assets/star-icon.svg';

import { onMouseDown, onMouseMove} from '../helpers/dragHandlers';
const store = useStore.getState();

useStore.setState({shortcuts : [
  {
    title: "3D Logo",
    style:  store.location["3D Logo"] || { top: '72.5592vh', left: '17.6954vw'} ,
    icon: CubeIcon,
    area: "E",
    component: Three
  },
  {
    title: "Arcade",
    style:  store.location["Arcade"] ||  { top: '66.008vh', left: '84.5743vw'} ,
    icon: ArcadeIcon,
    area: "E",
    component: Game
  },
  {
    title: "About FFT",
    style: store.location["About FFT"] || { top:'30.5228vh', left: '22.2222vw' },
    icon: Logo,
    area: "D",
    component: About,
    data: data.about
  },

  {
    title: "Work",
    style:  store.location["Work"] || { top:'24.512vh', left: '80.776vw'} ,
    icon: ClientsIcon,
    area: "D",
    component: Work,
    data: data.clients
  },
  {
    title: "Contact",
    style:  store.location["Contact"] || { top:'17.9087vh', left: '55.2028vw'} ,
    icon: MailIcon,
    area: "D",
    component: Mail,
    data: data.contact
  },
  {
    title: "Settings",
    style: store.location["Settings"] || { top: '75vh', left: '47vw'},
    icon: SettingsIcon,
    area: "D",
    component: Settings
  },
  {
    title: "Extras",
    style: store.location["Extras"] || { top: '66.008vh', left: '84.5743vw'},
    icon: StarIcon,
    area: "D",
    component: Extras
  }  
] });  // Update state

export default function Desktop() {  
  const store = useStore();  
  
  const openApps = store.openApps;
  const watchResize = function(){

    if(window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches || window.innerWidth <= 640){
      store.openApp('About FFT');
      store.openApp('Work');
      store.openApp('Client Work');
      store.openApp('Contact');
      store.openApp('3D Logo');
    }
  }      
  useEffect(() => {  
    watchResize()
    window.addEventListener('resize', watchResize);
  }, []);  
  const handleMouseDown = function(e){    
    window.clicked = e.target.dataset.title;
    onMouseDown(e);    
    if(!('ontouchstart' in document.documentElement)){
      window.addEventListener("mousemove", onMouseMove);
    }else{
      window.addEventListener("touchmove", onMouseMove);
    }
    
  }
 
  const handleMouseUp = function(e){       
    store.setLocation(e.target.dataset.title, { top: e.target.style.top, left:  e.target.style.left}) 
    if (window.clicked !== false){
      store.openApp(window.clicked)
    }
    
    if(!('ontouchstart' in document.documentElement)){
      window.removeEventListener("mousemove", onMouseMove);
    }else{
      window.removeEventListener("touchmove", onMouseMove);
    }
  }
  
  return (
    <>
      <div className="overlay"></div>
      <Wallpaper />
      <SiteHeader data={ data }/>
      { store.shortcuts.filter(({ area }) => area == 'D').map((shortcut) =>          
        <Fragment key={ shortcut.title + 'shortcut-fragment' }>
          <Shortcut key={ shortcut.title + 'shortcut' } {...shortcut} onTouchStart={ handleMouseDown } onTouchEnd={ handleMouseUp } onMouseDown={ handleMouseDown } onMouseUp={ handleMouseUp } />            
          { ('component' in shortcut) ? createElement(shortcut.component, { title: shortcut.title, key:`${shortcut.title}-${store.desktop}`, icon:shortcut.icon, data: shortcut.data, style: shortcut.style }  ) : null }          
        </Fragment>        
      )}
    <Dock/>
    </>
  );
}
