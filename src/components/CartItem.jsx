import { ReactComponent as Icon } from "./assets/image-icon.svg";
export default function CartItem(item) {
  return (
  <>
    <div class="item">
      <div class="dummy-image">
          <Icon />
      </div>    
      <div class="item-details">
        <div class="item-info">
          <span class="title">{ item.title }</span>
          <span class="price">{ item.price }</span>
        </div>
        <div>
          <input type="number" name="quantity" class="quantity" value={ item.count }/>
        </div>
      </div>
    </div>
  </>
  );
}