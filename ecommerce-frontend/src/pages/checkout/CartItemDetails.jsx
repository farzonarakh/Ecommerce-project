import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import axios from 'axios';

export function CartItemDetails({ cartItem, loadCart }) {
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);


  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true)
    }
  };

  const cancelUpdate = async () => {
    setQuantity(cartItem.quantity);
    setIsUpdatingQuantity(false);
    loadCart();
  }

  const [quantity, setQuantity] = useState(cartItem.quantity)

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdatingQuantity ?
              <input className='quantity-input'
                type="text"
                value={quantity}
                onChange={(event) => {
                  setQuantity(event.target.value);
                }}
                onKeyDown={(event) => {
                  { event.key === 'Enter' && updateQuantity() }
                  { event.key === 'Escape' && cancelUpdate() }
                }}
              /> :
              <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary"
            onClick={updateQuantity}
            onKeyDown={(event) => {
              { event.key === 'Enter' && updateQuantity()}
            }}
          >
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}