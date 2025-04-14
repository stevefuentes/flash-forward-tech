import Logo from '../assets/logo.svg';

import { useStore } from '../helpers/store';

export default function SiteHeader(props) {  
  const store = useStore();  
  return (
    <>   
      <header className="siteHeader h-(--site-header-height) p-[10px] flex gap-[10px] text-xs absolute top-0 w-full">                
          <Logo className={`flex-none ${ store.backgroundLight ? 'text-black' : 'text-white'}`}/>        
        <div className={`banner h-full rounded-sm ${ store.backgroundLight ? 'bg-[rgba(0,0,0,.6)]' : 'bg-white' } flex items-center gap-[30px]  overflow-hidden grow`}>
          <span className={`${ store.backgroundLight ? 'text-white' : 'text-black'} whitespace-nowrap py-[9px] pl-[9px]`}> Flash Forward Tech</span>
          <div className={`ticker-wrapper  rounded-sm ${ store.backgroundLight ? 'max-sm:bg-[rgba(0,0,0,.6)]' : 'bg-white' } flex-1 `}>
            <div className="ticker box-content overflow-hidden relative py-[9px] md:[mask-image:linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_1rem,rgba(0,0,0,1)_calc(100%-100px),_rgba(0,0,0,0)_100%)]">                        
              <div className={`ticker-content whitespace-nowrap  ${ store.backgroundLight ? 'text-white' : 'text-black'} box-content`}>
                { Array.from({length: 14}).map((v,ix) => (
                <span className='px-5' key={`ticker-${ix}`}>
                &nbsp;&nbsp;{ props.data.bannerText }
                </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`locale h-full rounded-sm ${ store.backgroundLight ? 'bg-[rgba(0,0,0,.6)]' : 'bg-white' } ${ store.backgroundLight ? 'text-white' : 'text-black'} gap-[5px] p-[9px] flex flex-none items-center`}>
          <span className="rounded bg-[#1BE636] size-[8px] whitespace-nowrap"></span>L.A. Based <span className='max-sm:hidden'>Digital</span>
        </div>
      </header>    
    </>
  );
}