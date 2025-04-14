import { createElement } from 'react';

import { useStore } from '../helpers/store';

import Close from '../assets/close.svg';
import Expand from '../assets/expand.svg';
import Minimize from '../assets/minimize.svg';

export default function NavBar(props) {  
  
  const store = useStore();    
  const app_title = ('app_name' in props && props.app_name !== null) ? props.app_name : props.title;

  return (
    <>
      <nav onMouseUp={ props.onMouseUp }>
        <span className="nav-title">{ 'icon' in props && createElement(props.icon, {})}&nbsp;{ props.title }</span>
        <div className="controls">
          <span className="button minimize" onClick={ () => store.hideApp(app_title) } ><Minimize /></span>
          <span className="button expand" ><Expand /></span>
          <span className="button" onClick={ props.closeAction }><Close /></span>
        </div>
      </nav>
    </>
  );
}