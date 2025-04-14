import { useStore } from '../helpers/store';
import Window from './Window';
import Logo from '../assets/logo.svg';

export default function About(props) {  
  const store = useStore();  
  return (
    <>
    { (store.openApps.includes( props.title )) ?
      <Window { ...props }>
        <div className="about windowContent text-xs relative">
          <div className="intro">
            <Logo />
            <h1 className='pt-2 mb-2 text-lg font-extrabold'>{ props.data.title }</h1>
            <p>{ props.data.text }</p>   
          </div>        
          
          <div className="service py-4">
            <h3 className="mb-2 text-md font-extrabold">Frontend</h3>
            <p>{ props.data.frontend.text }</p>
            <div className="tags flex flex-wrap gap-2 mt-4">
              { props.data.frontend.tags.map(tag => (
                <span key={tag} className="rounded-full bg-gray-200 px-2 py-1">{ tag }</span>
              ))}  
            </div>
          </div>
          <div className="service py-4">
            <h3 className="mb-2 text-md font-extrabold">Backend</h3>
            <p>{ props.data.backend.text }</p>
            <div className="tags flex flex-wrap gap-2 mt-4">
              { props.data.backend.tags.map(tag => (
                <span key={tag} className="rounded-full bg-gray-200 px-2 py-1">{ tag }</span>
              ))}    
            </div>
          </div>
          <div className="flex gap-2 cta-buttons">          
            <button onClick={ () => store.openApp('Work') } type="button" className="text-(--dock-icon-border-color) bg-(--accent-color) border  p-[10px] cursor-pointer">View Work</button>
            <button onClick={ () => store.openApp('Contact')} type="button" className="border  p-[10px] cursor-pointer">Contact Us</button>            
          </div>
        </div>
      </Window>
    : null }
    </>
  );
}