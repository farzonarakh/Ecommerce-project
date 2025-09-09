import { OrdersHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderDetailsGrid';

export function OrdersGrid({ orders, loadCart }) {
  return (
    <div key={orders.id} className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrdersHeader order={order} />

            <OrderDetailsGrid order={order} loadCart={loadCart} />
          </div>

        );
      })}
    </div>
  );
}