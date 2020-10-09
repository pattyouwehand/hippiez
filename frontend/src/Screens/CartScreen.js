import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  
  const dispatch = useDispatch();

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h2>Winkelmand</h2>
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
              <li key={cartItems}>
                <div className="cart-image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>

                  </div>
                  <div className="cart-item">
                    <div>
                      Aantal:{" "}
                      <select 
                        value={item.qty} 
                        onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                          {[...Array(item.countInStock).keys()].map(x =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                      </select>
                    </div>
                    <div>
                    <button 
                      type="button" 
                      className="button-img" 
                      onClick={() => removeFromCartHandler(item.product)} 
                    >
                      <img className="button-img" src="/images/icon-delete.png" alt="bin"></img>
                    </button>
                    </div>
                  </div>
                </div>
                <div className="cart-price">
                  €{item.price.toFixed(2)}
                </div>
              </li>
            )}
      </ul>
    </div>
    <div className="cart-action">
      <h2>
        Subtotaal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        : € {cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
      </h2>
      <button 
        onClick={checkoutHandler} 
        className="button primary full-width" 
        disabled={cartItems.length === 0}
      >
        Ga naar de kassa
      </button>
    </div>
  </div>
}

export default CartScreen;