import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {
    };
  }, [userInfo, dispatch])

  return <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Gebruikersprofiel</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {success && <div>Profiel succesvol opgeslagen.</div>}
            </li>
            <li>
              <label htmlFor="name"></label>
              <input 
                value={name} 
                type="name" 
                name="name" 
                id="name"
                placeholder="Naam"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="email"></label>
              <input 
                value={email} 
                type="email" 
                name="email" 
                id="email" 
                placeholder="E-mailadres"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="password"></label>
              <input 
                value={password || ''} 
                type="password" 
                id="password" 
                name="password"
                placeholder="Wachtwoord" 
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </li>
            <li>
              <button type="submit" className="button primary">Bijwerken</button>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Uitloggen</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    <div className="profile-orders content-margined">
      {
        loadingOrders ? <div>Loading...</div> :
          errorOrders ? <div>{errorOrders} </div> :
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATUM</th>
                  <th>TOTAAL (€)</th>
                  <th>BETAALD</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => <tr key={order._id}>
                  <td>{order._id}</td>
                <td>{}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link 
                      to={"/order/" + order._id}
                      className="button-img">
                        <img 
                          src="/images/icon-details.png"
                          alt="Show details"
                          
                        ></img>            
                    </Link>
                  </td>
                </tr>)}
              </tbody>
            </table>
      }
    </div>
  </div>
}

export default ProfileScreen;