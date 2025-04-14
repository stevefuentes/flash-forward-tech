import { useRef, useEffect } from 'react'

import { useStore } from '../helpers/store';
import { useFrame } from '@react-three/fiber'

import Model from "./Model";
import ThreeScene from "./ThreeScene";

export default function Wallpaper(props) {
    const Ref = useRef();
    const store = useStore();
    const backgroundImg = useStore(state => state.backgroundImg);
    const backgroundColor = useStore(state => state.backgroundColor);
    
    function throttle(inputFunction, limit) {
      let lastCall = 0;
      return function() {
        const now = Date.now();
        if (now - lastCall >= limit) {
          lastCall = now;
          inputFunction();  // Execute the function if time limit has passed
        }
      };
    }
    const debounce = (callback, wait) => {
      let timeoutId = null;
      return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          callback(...args);
        }, wait);
      };
    }
    const mousePosToCameraX = function(e){       
        store.setCameraX(-((e.clientX/window.innerWidth) - .5)*2);
        store.setCameraY(((e.clientY/window.innerHeight) - .75)*2);      
    }
    const handleMessage = function(event){ 
      if(event.data.motion){
        initOrientationListener();
      }
    }
    const setupDesktop = function(){
      document.body.classList.remove('loading');
      window.addEventListener("message", handleMessage, false);
      if('ontouchstart' in document.documentElement && typeof DeviceMotionEvent.requestPermission !== 'function') {
        store.setMotionActive(true);
        window.addEventListener("deviceorientation", handleOrientation);
      }else{
        store.setMotionActive(false);
      }
      return true;
    }    
    
    const initOrientationListener = async function(e){      
      if('ontouchstart' in document.documentElement && typeof DeviceMotionEvent.requestPermission === 'function' ) {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response == 'granted') {
          window.addEventListener("deviceorientation", handleOrientation);
          store.setMotionActive(true)
        }
      }      
    }
    
    function handleOrientation(e) {
      store.setCameraX(e.gamma/45);
      store.setCameraY(-(e.beta/45));
    }

  function CameraRig() {
    const x = useStore(state => state.cameraX);
    const y = useStore(state => state.cameraY);
    const z= 3;
    useFrame(state => {
      state.camera.position.lerp({x, y, z }, 0.1)
      state.camera.lookAt(0, 0, 0)
    })
  }
  useEffect(() => {
    setupDesktop(); 
  }, []);
  return (
    <>
    <div className="wallpaper flex items-center justify-center bg-cover" onMouseMove={ (e) => debounce(mousePosToCameraX(e), 320) } style={{ backgroundColor: backgroundColor,backgroundImage: `url(${ backgroundImg })` }}>        
    { (store.wallpaper3DLogo && 'ontouchstart' in document.documentElement && !store.motion) ?
        <button className={` gyro rounded-sm bg-white text-black p-1 absolute right-0`} onClick={ () => store.setMotionActive(true) }>{ 
          <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg"  xml:space="preserve" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" width="20px" height="20px" fill="green"><path d="M50,5C25.1,5,5,25.1,5,50c0,24.9,20.1,45,45,45s45-20.1,45-45C95,25.1,74.9,5,50,5z M31.5,82.6
          c-0.1-0.1-0.3-0.2-0.4-0.3c-2.6-1.7-3.9-6.5-3.3-13c0.1-0.7,0.2-1.5,0.3-2.3c6.4,1.8,14,2.9,22,2.9c1.4,0,2.8,0,4.2-0.1
          C46.7,78.6,38.9,83.1,34,83.1C33.1,83.1,32.2,83,31.5,82.6z M50,65c-8.2,0-15.3-1.1-21.1-2.8c1.5-6.3,4.3-13.1,8.1-19.7
          c1.5-2.6,3-4.9,4.6-7.1c2.6-0.3,5.4-0.4,8.4-0.4c8.2,0,15.3,1.1,21.1,2.8c-1.5,6.3-4.3,13.1-8.1,19.7c-1.5,2.6-3,4.9-4.6,7.1
          C55.7,64.9,52.9,65,50,65z M24.2,60.5c-7.5-3.1-11.7-7.2-11.7-10.5c0-4.8,8.2-10.9,22.4-13.6c-0.8,1.2-1.5,2.4-2.2,3.6
          C28.6,47,25.8,54.1,24.2,60.5z M66,16.1C66,16.1,66,16.1,66,16.1l0,0.8c1,0,1.8,0.2,2.6,0.6c0.1,0.1,0.3,0.2,0.4,0.3
          c2.6,1.7,3.9,6.5,3.3,13c-0.1,0.7-0.2,1.5-0.3,2.3c-6.4-1.8-14-2.9-22-2.9c-1.4,0-2.8,0-4.2,0.1c7.5-8.7,15.3-13.2,20.2-13.2
          L66,16.1z M67.3,60c4-7,6.9-14.1,8.5-20.5c7.5,3.1,11.7,7.2,11.7,10.5c0,4.8-8.2,10.9-22.4,13.6C65.9,62.5,66.6,61.2,67.3,60z
            M85.9,39.3c-2.5-1.8-5.5-3.5-9.1-4.8c0.6-3.8,0.7-7.2,0.4-10.3C81.2,28.5,84.2,33.6,85.9,39.3z M50,12.5c3,0,5.9,0.4,8.7,1
          c-6.4,2.8-13.5,8.8-19.9,17.2c-10.4,1.3-19.2,4.5-24.8,8.6C18.7,23.8,33,12.5,50,12.5z M14.1,60.7c2.5,1.8,5.5,3.5,9.1,4.8
          c-0.6,3.8-0.7,7.2-0.4,10.3C18.8,71.5,15.8,66.4,14.1,60.7z M50,87.5c-3,0-5.9-0.4-8.7-1c6.4-2.8,13.5-8.8,19.9-17.2
          c10.4-1.3,19.2-4.5,24.8-8.6C81.3,76.2,67,87.5,50,87.5z" stroke="none"></path><path d="M50,40c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10s10-4.5,10-10C60,44.5,55.5,40,50,40z M50,55
          c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S52.8,55,50,55z" stroke="none"></path></svg> <span>Gyro</span></div>}</button>
    : null }
      { store.wallpaper3DLogo ? 
      <div className="three-d-logo h-1/2 w-full" onClick={initOrientationListener }>
        <ThreeScene position={[0,0,2]} >
          <CameraRig />
          <Model />             
        </ThreeScene>
      </div>
      : null}
    </div>
    </>
  );
}