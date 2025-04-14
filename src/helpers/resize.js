export function handleResize(el){
  var resizers = el.querySelectorAll('.resizer');    
  window.addEventListener('mouseup', function(){
    stopResize();
    document.documentElement.classList.remove('no-select','vertical','horizontal');
  });
  for (var resizer of Array.from(resizers)){      
    resizer.addEventListener('mousedown', initResize);     
  };

  function initResize(e) {  
    el.classList.remove('fullscreen');
    
    document.documentElement.classList.add('no-select');
    if (e.target.className.includes('left') && e.target.className.includes('top')){
      document.documentElement.classList.add('nwse');
      window.addEventListener('mousemove', ResizeLeft, false);  
      window.addEventListener('mousemove', ResizeTop, false);  
    }else if (e.target.className.includes('bottom') && e.target.className.includes('right')){      
      document.documentElement.classList.add('nwse');
      window.addEventListener('mousemove', ResizeRight, false);  
      window.addEventListener('mousemove', ResizeBottom, false);  
    }else if (e.target.className.includes('top') && e.target.className.includes('right')){      
      document.documentElement.classList.add('nesw');
      window.addEventListener('mousemove', ResizeRight, false);  
      window.addEventListener('mousemove', ResizeTop, false);
    }else if (e.target.className.includes('bottom') && e.target.className.includes('left')){      
      document.documentElement.classList.add('nesw');
      window.addEventListener('mousemove', ResizeLeft, false);  
      window.addEventListener('mousemove', ResizeBottom, false);
    }else if (e.target.className.includes('left')){
      document.documentElement.classList.add('horizontal');
      window.addEventListener('mousemove', ResizeLeft, false);  
    }else if(e.target.className.includes('right')){
      document.documentElement.classList.add('horizontal');
      window.addEventListener('mousemove', ResizeRight, false);  
    }else if(e.target.className.includes('bottom')){
      document.documentElement.classList.add('vertical');
      window.addEventListener('mousemove', ResizeBottom, false);  
    }else if(e.target.className.includes('top')){
      document.documentElement.classList.add('vertical');
      window.addEventListener('mousemove', ResizeTop, false);  
    }      
    window.addEventListener('mouseup', stopResize, false);
  }
  //resize the element
  function ResizeLeft(e) {          
    let minWidth = window.getComputedStyle(el,null).getPropertyValue("min-width").slice(0, -2);
    let rect = el.getBoundingClientRect();       
    el.style.left = rect.left + "px";  
    if (e.clientX > 0 && e.clientX < window.innerWidth){        
      if (el.offsetWidth > minWidth && e.movementX > 0 ){          
        el.style.width = (el.offsetWidth - e.movementX > minWidth) ?  el.offsetWidth - e.movementX + 'px' : minWidth + 'px';                
        if (el.offsetWidth > minWidth) el.style.left = e.clientX + 'px';
      }else if (e.movementX < 0 && e.clientX <= el.style.left.slice(0, -2)){
        el.style.left = e.clientX + 'px';
        el.style.width = el.offsetWidth + Math.abs(e.movementX) + 'px';
      }            
    }
  }    
  function ResizeRight(e) {          
    let minWidth = parseInt(window.getComputedStyle(el,null).getPropertyValue("min-width").slice(0, -2));
    let width = parseInt(window.getComputedStyle(el,null).getPropertyValue("width").slice(0, -2));         
    let rect = el.getBoundingClientRect();    
    el.style.left = rect.left + "px";  
    if (e.clientX > 0 && e.clientX < window.innerWidth){                
      if (el.offsetWidth >= minWidth && e.movementX > 0  && e.clientX >= rect.right){          
        el.style.width = (el.offsetWidth + e.movementX > minWidth) ?  el.offsetWidth + e.movementX + 'px' : minWidth + 'px';
      }else if (e.movementX < 0){          
        el.style.width = (el.offsetWidth - Math.abs(e.movementX) > minWidth) ? el.offsetWidth - Math.abs(e.movementX) + 'px' : minWidth +'px';
      }   
    }
  }
  function ResizeBottom(e) {          
    let minHeight = window.getComputedStyle(el,null).getPropertyValue("min-height").slice(0, -2);      
    let rect = el.getBoundingClientRect();      
    el.style.top = rect.top + "px";
    if (e.clientY > 0 && e.clientY < window.innerHeight){        
      if (el.offsetHeight + e.movementY >= minHeight && e.movementY > 0 && e.clientY > rect.bottom){        
        el.style.height = el.offsetHeight + e.movementY + 'px';
      }else if (e.movementY < 0){        
        el.style.height = (el.offsetHeight - Math.abs(e.movementY) > minHeight) ? el.offsetHeight - Math.abs(e.movementY) + 'px' : minHeight = "px";          
      }   
    }
  }
  function ResizeTop(e) {          
    let minHeight = window.getComputedStyle(el,null).getPropertyValue("min-height").slice(0, -2);      
    let rect = el.getBoundingClientRect();      

    if (e.clientY > 0 && e.clientY < window.innerHeight){        
      
      if (el.offsetHeight > minHeight && e.movementY > 0){        
        el.style.height = el.offsetHeight - e.movementY + 'px';        
        el.style.top = e.clientY + 'px';          
      }else if (e.movementY < 0 && e.clientY < rect.top){
        el.style.top = e.clientY + 'px';        
        el.style.height = (el.offsetHeight + Math.abs(e.movementY) > minHeight) ? el.offsetHeight + Math.abs(e.movementY) + 'px' : minHeight = "px";
        
      }    
    }
  }
  function stopResize(e) {        
      window.removeEventListener('mousemove', ResizeLeft, false);
      window.removeEventListener('mousemove', ResizeRight, false);
      window.removeEventListener('mousemove', ResizeBottom, false);
      window.removeEventListener('mousemove', ResizeTop, false);
      window.removeEventListener('mouseup', stopResize, false);
      document.documentElement.classList.remove('vertical','horizontal', 'nesw', 'nwse');
  }
}
export function handleExpand(el){  
  el.querySelector('.expand').addEventListener("click",function(){       
    el.classList.add('animate');
    if (!el.classList.contains('fullscreen')){
      let rect = el.getBoundingClientRect();
      el.style.left = rect.left +"px";
      el.style.right = rect.right +"px";
      el.style.top = rect.top +"px";
      el.style.bottom = rect.bottom +"px";  
      el.classList.add('fullscreen');  
      let top = window.getComputedStyle(document.documentElement).getPropertyValue('--site-header-height');
        
      setTimeout(() => {
        el.style.cssText = `left:0px;top:${top};width: 100%; height: calc(100% - 50px) `;             
      }, 10);
    }else{
      el.classList.remove('fullscreen');  
      setTimeout(() => {
        if ('ontouchstart' in document.documentElement) {
          el.style.cssText = "right:0;left:0;bottom:20vh;top:20vh;";
        }else{
          el.style.cssText = "right:20vw;left:20vw;bottom:20vh;top:20vh;";
        }
      }, 10);
    }
    
    setTimeout(() => {
      
      el.classList.remove('animate');
    }, 300);
  });
}