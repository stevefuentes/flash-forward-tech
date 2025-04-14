import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

function isColorLight(color){
  color = +("0x" + color.slice(1).replace( 
  color.length < 5 && /./g, '$&$&'));

  var r = color >> 16;
  var g = color >> 8 & 255;
  var b = color & 255;
      
  var hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );


  if (hsp>127.5) {
    return true;
  } 
  else {
    return false;
  }
}

export const useStore = create()(
  persist(
  (set, get) => ({
    openApps : [],
    hiddenApps : [],
    active : '',
    cameraX :0,
    cameraY :0,
    motion: false,
    contextMenu : '',
    backgroundImg: './assets/bg/clouds.jpg',
    backgroundColor: '#3B82C4',
    backgroundLight: false,
    accentColor: '#000000',
    wallpaper3DLogo: true,
    location : {},    
    menuXY : {},
    client : {},    
    setClient: (value) => {    
      set((state) => {        
        return ({ client: value })
      })
    },
    toggle3DLogo: () => {    
      set((state) => {        
        return ({ wallpaper3DLogo: !state.wallpaper3DLogo })
      })
    },
    toggleContextMenu: (app) => {    
      set((state) => {        
        return ({ contextMenu: (state.contextMenu == '') ? app : '' })
      })
    },
    setMenuXY: (value) => {      
     set((state) => {       
       return ({ menuXY: value})
     })
   },
    setBackgroundColor: (value) => {
      document.querySelector(":root").style.setProperty("--background-color", value);    
      set((state) => {        
        return ({ backgroundColor: value, backgroundLight: isColorLight(value) })
      })
    },
    setWallpaper3DLogo: (value) => {    
      set((state) => {        
        return ({ wallpaper3DLogo: value })
      })
    },
    setMotionActive: (value) => {  
      set((state) => {           
        window.postMessage({
          motion: value
        });
        return ({ motion: value })
      })
    },    
    setBackgroundLight: (value) => {        
      set((state) => {          
        return ({ backgroundLight: value })
      })
    },
    setAccentColor: (value) => {
       document.querySelector(":root").style.setProperty("--accent-color", value);
       document.querySelector(":root").style.setProperty("--dock-icon-border-color", isColorLight(value) ? 'black' : 'white');
      
      set((state) => {
        return ({ accentColor: value,  accentLight: isColorLight(value)})
      })
    },
    setCameraX: (value) => {
      set((state) => ({ cameraX: value }))
    },
    setCameraY: (value) => {
      set((state) => ({ cameraY: value }))
    },
    setBackgroundImg: (value) => {
      set((state) => ({ backgroundImg: value }))
    },    
    setLocation: (title, value) => {
      set((state) => {   
        return ({ location: {...state.location, [title]: value } })
      })
    },
    openApp: (name) => {   
      set((state) => {           
        return({ active: name, openApps: [...state.openApps.filter(a => a !== name), name], hiddenApps: state.hiddenApps.filter(a => a !== name)})
      })
    },
    closeApp: (name) => set((state) => {         
      return ({ openApps: state.openApps.filter(a => a !== name)})
    }),
    toggleActive: (name) => {
      set((state) => ({ active: name, hiddenApps: state.hiddenApps.filter(a => a !== name)}))
    },
    hideApp: (name) => set((state) => ({ hiddenApps: [...state.hiddenApps, name]})),
    hideAllApps: () => set((state) => ({ active: '', lastHidden:[...state.hiddenApps], hiddenApps: [...state.openApps]})),
    restoreApps:  () => set((state) => ({ hiddenApps : [...state.lastHidden], lastHidden: []})),
  
  }),
  {
    name: 'flash-forward-tech',
    storage: createJSONStorage(() => sessionStorage), 
    onRehydrateStorage: (state) => { 
      return (state, error) => {
        if (error) {
          console.log('an error happened during hydration', error)
        } else {
          document.querySelector(":root").style.setProperty("--accent-color", state.accentColor);
          document.querySelector(":root").style.setProperty("--dock-icon-border-color", isColorLight(state.accentColor) ? 'black' : 'white');
          document.querySelector(":root").style.setProperty("--background-color", state.backgroundColor);    
        }
      }
    }
  }
)
);