import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, order } = orderCreate;
  
  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  };

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }

  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success, props.history, order]);

  console.log("ORDER:", order)

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h2>
            Verzendadres
          </h2>
          <div>
          {cart.shipping.address}, {cart.shipping.postalCode}{" "}{" "}
            {cart.shipping.city}{" "}{cart.shipping.country}
          </div>
        </div>
        <div>
          <h2>Betaling</h2>
          <div>
            Betaalmethode: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h2>
                Winkelmand
            	</h2>
              <div>
                Prijs(€)
              </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Winkelmand is leeg
          </div>
                :
                cartItems.map(item =>
                  <li key={cart.id}>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Aantal: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      €{item.price.toFixed(2)}
                    </div>
                  </li>
                )}
          </ul>
        </div>
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button 
              className="button primary full-width" 
              onClick={placeOrderHandler} 
              >Bestelling plaatsten</button>
          </li>
          <li>
            <h2>Besteloverzicht</h2>
          </li>
          <li>
            <div>Items</div>
            <div>€{itemsPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Verzendkosten</div>
            <div>€{shippingPrice}</div>
          </li>
          <li>
            <div>BTW</div>
            <div>€{taxPrice.toFixed(2)}</div>
          </li>
          <li>
            <div>Totaal</div>
            <div>€{totalPrice.toFixed(2)}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
}

export default PlaceOrderScreen;