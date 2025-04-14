const onMouseDown = function(e) {    
  window.draggingEl = e.target;  
  window.draggingEl.startTime = Date.now()
  e.target.setAttribute('data-pos3', (!('ontouchstart' in document.documentElement)) ? e.clientX : e.touches[0].clientX);
  e.target.setAttribute('data-pos4', (!('ontouchstart' in document.documentElement)) ? e.clientY : e.touches[0].clientY);  
  if (!('ontouchstart' in document.documentElement)) {
    window.addEventListener('mouseup', function(){
      window.clicked = true;
      window.removeEventListener('mousemove', onMouseMove);
    })
  }else{      
    window.addEventListener('touchend', function(){
      window.removeEventListener('touchmove', onMouseMove);
    })
  }
  
}

const onMouseMove = function(e) {  
  if (Date.now() - window.draggingEl.startTime > 100){    
    var mouseX = (!('ontouchstart' in document.documentElement)) ? e.clientX : e.touches[0].clientX,
        mouseY = (!('ontouchstart' in document.documentElement)) ? e.clientY : e.touches[0].clientY;    
    window.clicked = false;      
    var el = window.draggingEl;  
    if (mouseX > el.offsetWidth/2 && mouseX < window.innerWidth - el.offsetWidth/2 && mouseY > el.offsetWidth/2 && mouseY < window.innerHeight - el.offsetWidth/2){      
      
      el.style.left = (mouseX/window.innerWidth)*100 + 'vw';
      el.style.top = (mouseY/window.innerHeight)*100 + 'vh';
    }   
  }
}

export { onMouseDown, onMouseMove };