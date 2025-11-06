import axios from 'axios';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';

export function CartItemDetails({ cartItem, loadCart }) {
  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      await axios.put(`api/cart-items/${cartItem.productId}`, {
        quantity: quantity
      });
      await loadCart();
      setIsUpdatingQuantity(false);
    }
    else {
      setIsUpdatingQuantity(true);
    }
  }

  const updateQuantityInput = (event) => {
    setQuantity(Number(event.target.value));
  }

  const handleQuantityKeyDown = (event) => {
    if (event.key === 'Enter') {
      updateQuantity();
    }
    else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  }
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: 
            {isUpdatingQuantity ? 
            <input type="text" className="quantity-textbox" value={quantity} onChange={updateQuantityInput} onKeyDown={handleQuantityKeyDown} /> : 
            <span className="quantity-label">{quantity}</span>}
            
          </span>
          <span className="update-quantity-link link-primary" onClick={updateQuantity}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}