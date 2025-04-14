import { createElement } from 'react';

import { useStore } from '../helpers/store';

export default function Shortcut(props) {  
  const store = useStore();
  
  return (
    <>    
      <a className={`shortcut flex flex-col items-center justify-center absolute cursor-pointer ${props.className} `} key={ props.title + 'shortcut' } onMouseDown={ props?.onMouseDown } onContextMenu={ props?.onContextMenu } onMouseUp={ props?.onMouseUp } onClick={ props?.onClick } onTouchStart={ props?.onTouchStart } onTouchEnd={ props?.onTouchEnd } style={props.style} data-title={ props.title }>
        <div className={`icon rounded-xl border-[2px] border-(--accent-color) bg-(--accent-color) ${ store.accentLight ? 'text-black' : 'text-white' } p-[10px]`}>{ createElement(props.icon, {})}</div>
        <span className='shortcut-title rounded-sm bg-[rgba(0,0,0,.3)] mt-[10px] text-xs/5 px-[8px] py-[2px] whitespace-nowrap'>{ props.title }</span>
      </a>       
    </>
  );
}
