import { useStore } from '../helpers/store';

import Window from './Window';
import Product from './Product';

import StoreIcon from '../assets/store-icon.svg';
import Cart from '../assets/cart.svg'

export default function Shopping(props) {  
  const store = useStore();  

  return (
    <>
    { (store.openApps.includes(props.title)) ?
      <Window { ...props }>
        <div className="shop">      
          <div className="shopNav">
            <StoreIcon /><span>&nbsp;Some Store / Some Product</span>
            <span className="cart-icon" ><Cart /></span>
            <div id="cart" className={ 'open' }></div>
          </div>
          <div className="products"> 
            { 
              props.data.products.map((product, ix) =>
                <Product {...product} key={ix} />
              ) 
            }
          </div>                
        </div>
      </Window>
    : null }
    </>
  );
}