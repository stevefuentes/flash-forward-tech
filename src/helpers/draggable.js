export function handleDrag(el) {     

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const nav = el.querySelector('.nav-title');
  
  if (nav) {   
    if (!('ontouchstart' in document.documentElement)) {
      nav.addEventListener("mousedown", mouseDown);
    }else{      
      nav.addEventListener("touchstart", mouseDown);
    }
  }else{
    if (!('ontouchstart' in document.documentElement)) {
      el.addEventListener("mousedown", mouseDown);
    }else{      
      el.addEventListener("touchstart", mouseDown);
    }
  }

  function mouseDown(e) {
    e = e || window.event;
    e.preventDefault();   
     
    pos3 = (!('ontouchstart' in document.documentElement)) ? e.clientX : e.touches[0].clientX;
    pos4 = (!('ontouchstart' in document.documentElement)) ? e.clientY : e.touches[0].clientY;
    if (!('ontouchstart' in document.documentElement)) {      
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);      
    }else{
      document.addEventListener("touchend", closeDragElement);
      document.addEventListener("touchmove", elementDrag, { passive: false });
    }
  }

  function elementDrag(e) {     
    e = e || window.event;
    e.preventDefault();          
      var mouseX = (!('ontouchstart' in document.documentElement)) ? e.clientX : e.touches[0].clientX,
          mouseY = (!('ontouchstart' in document.documentElement)) ? e.clientY : e.touches[0].clientY;          
    pos1 = pos3 - mouseX;
    pos2 = pos4 - mouseY;
    pos3 = mouseX;
    pos4 = mouseY;

    el.classList.remove('fullscreen');  
    if (pos3 > 0 && pos3 < window.innerWidth && mouseY > 0 && mouseY < window.innerHeight){   
      if (el.offsetTop - pos2 < 0){
        el.style.top = '0px';
      }else if(el.offsetTop - pos2 > (window.innerHeight - 38 )){
        el.style.top = (window.innerHeight - 38) + "px";
      }else{
        el.style.top = (el.offsetTop - pos2) + "px";
      }
      // el.style.bottom = (el.offsetTop + el.outerHeight) + "px";
      
      if (el.offsetLeft - pos1 < -el.offsetWidth + 100){        
        el.style.left = (-el.offsetWidth + 100) + 'px';
      }else if(el.offsetLeft - pos1  > (window.innerWidth - 100)){
        el.style.left =  (window.innerWidth - 100) + "px"
      }else{
        el.style.left = (el.offsetLeft - pos1) + "px";
      }
      // el.style.right = (el.offsetLeft - el.outerWidth) + "px";
    }
  }

  function closeDragElement() {    
    if (!('ontouchstart' in document.documentElement)) {      
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    }else{
      document.removeEventListener('touchend', closeDragElement);
      document.removeEventListener('touchmove', elementDrag);
    }
  }
}