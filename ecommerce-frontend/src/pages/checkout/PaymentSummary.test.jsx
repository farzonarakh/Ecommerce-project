import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';;
import { PaymentSummary } from './PaymentSummary';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

vi.mock('axios');

describe('PaymentSummary component', () => {
  let paymentSummary;

  let loadCart;

  let user;

  beforeEach(() => {
    paymentSummary = {
      "totalItems": 1,
      "productCostCents": 799,
      "shippingCostCents": 0,
      "totalCostBeforeTaxCents": 799,
      "taxCents": 80,
      "totalCostCents": 879
    }

    loadCart = vi.fn();

    user = userEvent.setup();
  });

  it('displays the correct details', () => {
    render(
      <MemoryRouter >
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Items (1):')
    ).toBeInTheDocument();

    expect(
      within(screen.getByTestId('payment-summary-shipping-cost'))
        .getByText('$0.00')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-total-before-tax')
    ).toHaveTextContent('$7.99');

    expect(
      screen.getByTestId('tax-payment')
    ).toHaveTextContent('$0.80');

    expect(
      screen.getByTestId('total-payment-summary')
    ).toHaveTextContent('$8.79');
  });

  it('places an order', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path" >{location.pathname}</div>
    }

    render(
      <MemoryRouter >
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button')
    await user.click(placeOrderButton);

    expect(
      screen.getByTestId('url-path')
    ).toHaveTextContent('/orders')

    expect(axios.post).toHaveBeenCalledWith('/api/orders');

    expect(loadCart).toHaveBeenCalled();
  });
});