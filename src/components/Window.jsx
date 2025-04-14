import { useEffect, useRef, useState, Fragment } from 'react';

import { useStore } from '../helpers/store';
import { handleDrag } from '../helpers/draggable';
import { handleResize, handleExpand } from '../helpers/resize';

import NavBar from './NavBar';
const store = useStore.getState();  
export default function Window(props) {
  
  const throttle = function (fn, threshhold) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {        

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(this, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(this, args);
        }
    };
  }

  const active = useStore((state) => state.active)

  const hiddenApps = useStore((state) => state.hiddenApps)
  const app_title = ('app_name' in props) ? props.app_name : props.title;
  const Ref = useRef(null);

  useEffect(() => {  
    Ref.current?.focus()  
    var el = Ref.current;
    if(window.matchMedia && window.matchMedia('(min-device-width: 641px)').matches || window.innerWidth > 640){
      handleDrag(el);
      handleResize(el);   
      handleExpand(el);
    }else{
      const content = el.querySelector('.windowContent');
      var lastClientY = 0
      el.querySelector('.windowContent')?.addEventListener('touchstart', function(e){ 
        content.classList.remove('no-scroll')
      })
      el.querySelector('.windowContent')?.addEventListener('touchmove', throttle(function(e){  
        
        if (e.touches[0].clientY > lastClientY){
          if(content.scrollHeight - content.scrollTop - content.clientHeight < 1) { 
            content.classList.add('no-scroll')
          }else{
            content.classList.remove('no-scroll')
          }
        }else{       
          content.classList.remove('no-scroll')   
          if(content.scrollTop == 0) { 
            content.classList.add('no-scroll')
          }
        }     
        lastClientY = e.touches[0].clientY;
    }),250)
    }
    
  }, []);  
  const handleMouseUp = function(e){  
    var windowDiv = null;   
  
    if(e.target.classList.contains('resizer')){
      windowDiv = e.target.parentElement;
    } else if(e.target.classList.contains('nav-title')){      
      windowDiv = e.target.parentElement.parentElement;
    }
    if (null == windowDiv ) return false;
    store.setLocation(`window${windowDiv.dataset.title}`, { top: windowDiv.style.top, left:  windowDiv.style.left, width: windowDiv.style.width, height: windowDiv.style.height })         
  }
  
  return (
    <>    
      <div className={`${props.className} window text-left window-${app_title.toLowerCase().replace(" ", "-") } ${active == app_title ? 'active' : ''} ${hiddenApps.includes(app_title) ? 'hidden' : ''}`} ref={Ref} data={ props.data } data-title={props.title} onMouseDown={ (e) => { if (!e.target.classList.contains('shortcut')) store.toggleActive(app_title) }}  style={ store.location[`window${app_title}`]}>
        <NavBar onMouseUp = { handleMouseUp } app_name ={ ('app_name' in props) ? props.app_name : null} title={ props.title } icon={ props.icon } closeAction={ () => store.closeApp(app_title) }/>        
          <>
            <div className="resizer left" onMouseUp = { handleMouseUp }></div>
            <div className="resizer bottom" onMouseUp = { handleMouseUp }></div>
            <div className="resizer right" onMouseUp = { handleMouseUp }></div>
            <div className="resizer top" onMouseUp = { handleMouseUp }></div>
            <div className="resizer top left" onMouseUp = { handleMouseUp }></div>
            <div className="resizer top right" onMouseUp = { handleMouseUp }></div>
            <div className="resizer bottom right" onMouseUp = { handleMouseUp }></div>
            <div className="resizer bottom left" onMouseUp = { handleMouseUp }></div>
          </>        
        { props.children }
      </div>
    </>
  );
}