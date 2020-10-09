import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo, redirect, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };
  
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Maak een account aan</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </li>
        <li>
          <label htmlFor="name"></label>
          <input 
            type="name" 
            name="name" 
            id="name" 
            placeholder="Naam"
            onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email"></label>
          <input 
            type="email" 
            name="email" 
            id="email"
            placeholder="E-mailadres"
            onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password"></label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Wachtwoord"
            onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="rePassword"></label>
          <input 
            type="password" 
            id="rePassword" 
            name={rePassword}
            placeholder="Herhaal wachtwoord"
            onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Registreren</button>
        </li>
        <li>
          Heb je al een account?
          <Link 
            to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} 
            className="button secondary text-center" 
          >Inloggen
          </Link>
        </li>
      </ul>
    </form>
  </div>
}

export default RegisterScreen;