import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props){

  const [searchKeyword, setSearchKeyword] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
  }, [category, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword));
  };

  return (
    <div>
      <div className="top-homescreen-style">
        <div className="category-style">
          <h2>Trending bij Hippiez</h2>
          <ul className="category-tekst">
            <li><img src="/images/icon-check.png" alt="check"></img>{" "}Op werkdagen voor 22.00 uur besteld, morgen in huis</li>
            <li><img src="/images/icon-check.png" alt="check"></img>{" "}Gratis bezorging vanaf € 40,-</li>
            <li><img src="/images/icon-check.png" alt="check"></img>{" "}Gratis retourneren</li>
          </ul>
        </div>
      <div className="filter-style">
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              type="text"
              className="search-text-input"
              placeholder="Waar ben je naar op zoek?"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="search-text-button"
              type="submit"
            >
              <img src="/images/icon-search.png" alt="search"></img>
            </button>
          </form>
        </li>
      </ul>
      </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">€{product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomeScreen;
