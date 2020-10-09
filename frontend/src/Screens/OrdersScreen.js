import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders } = orderList;
  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete, dispatch]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">
      <div className="order-header">
        <h3>Bestellingen</h3>
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATUM</th>
              <th>TOTAAL(€)</th>
              <th>GEBRUIKER</th>
              <th>BETAALD</th>
              <th>BETAALD OP</th>
              <th>BEZORGD</th>
              <th>BEZORGD OP</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>
              <td>06-10-2020</td>
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link 
                  to={"/order/" + order._id} 
                  className="button-img" >
                  <img src="/images/icon-details.png" alt="details"></img>
                </Link>
                {' '}
                <button 
                  type="button"
                  className="button-img"
                  onClick={() => deleteHandler(order)}
                >
                  <img src="/images/icon-delete.png" alt="delete"></img>
                </button>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
};

export default OrdersScreen;