import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess, dispatch, props.match.params]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };

  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Terug</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <div className="details-text">
              <ul>
                <li>
                  <h2>{product.name}</h2>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  <b>€{" "}{product.price}</b>
                </li>
                <li>
                  <h4>Productbeschrijving</h4>
                  <div>{product.description}</div>
                </li>
              </ul>
              </div>
            </div>
            <div className="details-action">
              <ul>
                <li>Prijs: €{" "}{product.price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'Op voorraad' : 'Niet beschikbaar.'}
                </li>
                <li>
                  Aantal:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Toevoegen aan winkelmand
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Beoordelingen</h2>
            {!product.reviews.length && <div>Er zijn nog geen beoordelingen geschreven.</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <div><h4>{review.name}</h4></div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div><p>{review.createdAt.substring(0, 10)}</p></div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <br/>
                <h2>Laat hier je beoordeling achter</h2>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Beoordeling</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="5">5 - Uitstekend</option>
                          <option value="4">4 - Zeer Goed</option>
                          <option value="3">3 - Goed</option>
                          <option value="2">2 - Redelijk</option>
                          <option value="1">1 - Slecht</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Commentaar</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Verzenden
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    <Link to="/signin">Login</Link> om een beoordeling te schrijven.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductScreen;