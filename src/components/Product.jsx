import ImageIcon from '../assets/image-icon.svg';
export default function Product(product) {  
  return (
    <>
      <div className="product">
        <div className="dummy-image">
          <ImageIcon />
        </div>
        <h4>{ product.title }</h4>
        <span>{ product.price }</span>
        <button data-title={ product.title } data-price={product.price }>Add to Cart</button>
      </div>
    </>
  );
}