import { useRef, useEffect } from 'react';
import { useStore} from '../helpers/store';
import Window from './Window';


export default function Client(props) {  
  const Ref = useRef();  
  const store = useStore();  

   useEffect(() => {
    
     if (Ref.current !== null) {
       const images = document.querySelectorAll('.client-image')
       for (let image of images) {                     
          image.addEventListener("load", function(){
            image.classList.add('animated');
          });
       }
     }
   });
  const toggleClientOpen = function(){    
    document.querySelector('.window-work').scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return (
    <>
    { (store.openApps.includes( props.title )) ?
      <Window {...props} className="client-window">
        <div ref={ Ref } className="client windowContent text-xs">
          
          <div className="client-info">                    
            <div className="client-header">
            { store.client?.year }            
              <h3 className="mb-2 text-lg font-extrabold">{ store.client.title }</h3>              
              { ('logo' in store.client) ?
              <img className="pb-2" width="100" src={store.client.logo} />
            :null }
            </div>
            <p>{ ('description' in store.client) ?  store.client.description : store.client.short_description}</p>
          </div>
          <div className="client-images">
            { store.client.images?.map(url =>
              <img className="client-image" key={url} src={ url }/>
            )}
          </div>
          <button className="cursor-pointer text-underline sm:hidden back-to-clients" onClick={ () => toggleClientOpen() }>{`<`} Back to Clients</button>                
        </div>
      </Window>
    : null }
    </>
  );
}