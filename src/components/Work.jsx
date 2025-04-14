import { createElement, Fragment, useEffect, useRef} from 'react';

import { useStore } from '../helpers/store';

import Window from './Window';
import Client from './Client';

import WpcgIcon from '../assets/wpcg-icon.svg';
import ClientIcon from '../assets/client-icon.svg';

export default function Work(props) {  
  const store = useStore();   
  const Ref = useRef();
 
  const swapClient = function(client){
    if (!store.openApps.includes( 'Client Work' )){    
      store.openApp('Client Work')
    }
    store.setClient(client)
    document.querySelector('.client-window').scrollIntoView({ behavior: "smooth", block: "start" })
    
      // Ref.current.parentElement.classList.add()
    
  }
  const clientObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');          
        }          
    })
  },{ threshold: 0.3 });
  useEffect(() => {
    if (Ref.current !== null) {
      const clients = document.querySelectorAll('.client-item')
      for (let client of clients) {
        clientObserver.observe(client);
      }
    }
    if(window.matchMedia && window.matchMedia('(min-device-width: 641px)').matches || window.innerWidth > 640){
      if ('title' in store.client == false){
        store.setClient(props.data[0]);
      }
    }
  },[]);
  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }
  function resumeScrollListener(e){
    document.documentElement.removeEventListener('scroll', prevent_default(e), { passive: false });
  }
  function prevent_default(e){e.cancelable && e.preventDefault()}
  function transformScroll(e) {       
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
    document.documentElement.addEventListener('scroll', prevent_default(e), { passive: false });
    debounce(resumeScrollListener, 1000)

  }
  if (store.openApps.includes( props.title )){
    return (
      <>
          <Window  { ...props }>
            <div ref={Ref} className="clients windowContent text-xs">                
              {props.data.map(client => 
                <div className="client-item pb-6" key={ client.title }>                                           
                  <div className="client-header">
                    { client.year }
                    <h3 className="mb-1 text-lg font-extrabold">{ client.title }</h3>                      
                  </div>
                  <p>{ client.short_description }</p>                  
                  <button className="border mt-2 p-[10px] cursor-pointer" onClick={ () => swapClient(client) } >View Project</button>                    
                </div>
              )}           
          </div>
          </Window>
          <Client title="Client Work"  icon={ ClientIcon } />
      </>
    );
  }
}