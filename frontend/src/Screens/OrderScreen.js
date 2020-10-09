import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
        props.history.push("/profile");    
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay, dispatch, props.history, props.match.params.id]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Loading ...</div> : error ? <div>{errorPay}</div> :
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h2>
              Verzendadres
          </h2>
            <div>
              {order.shipping.address}, {order.shipping.postalCode}{" "}{" "}
              {order.shipping.city}{" "}{order.shipping.country}
          </div>
            <div>
              {order.isDelivered ? "Bezorgd op " + order.deliveredAt : "Niet bezorgd."}
            </div>
          </div>
          <div>
            <h2>Betaling</h2>
            <div>
              Betaalmethode: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Betaald op " + order.paidAt : "Niet betaald."}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h2>
                  Winkelmand
                </h2>
                <div>
                  Prijs
                </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Winkelmand is leeg
                  </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
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
                        €{item.price}
                      </div>
                    </li>
                  )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Betaling afronden...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <h2>Besteloverzicht</h2>
            </li>
            <li>
              <div>Items</div>
              <div>€{" "}{order.itemsPrice?.toFixed(2)}</div>
            </li>
            <li>
              <div>Verzendkosten</div>
              <div>€{" "}{order.shippingPrice}</div>
            </li>
            <li>
              <div>BTW</div>
              <div>€{" "}{order.taxPrice?.toFixed(2)}</div>
            </li>
            <li>
              <div>Totaal</div>
              <div>€{" "}{order.totalPrice?.toFixed(2)}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
}

export default OrderScreen;