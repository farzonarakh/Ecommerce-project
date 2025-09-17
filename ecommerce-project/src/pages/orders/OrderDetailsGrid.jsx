import { OrderProduct } from './OrderProduct';

export function OrderDetailsGrid({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        return(
          <OrderProduct key={orderProduct.product.id} orderProduct={orderProduct} loadCart={loadCart} order={order} />
        ); 
      })}

    </div>
  );
}