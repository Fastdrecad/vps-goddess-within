import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlistItem } from '../../redux/slices/wishlistSlice';

const CartSlideItem = ({ item, id, title, price, img, size, qty }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const isInWishList = wishlistItems.some((item) => item._id === id);

  const updateWishList = (product) => {
    if (userInfo) {
      dispatch(toggleWishlistItem(product));
    } else {
      console.log('Please login', userInfo);
    }
  };

  return (
    <div className='cart-slide-item-content'>
      <NavLink to={`/product/${id}`}>
        <img src={img} />
      </NavLink>
      <div className='item-details'>
        <h1 className='mb-1'>{item?.name}</h1>
        <p className='pb-1 m-0'>{title}</p>
        <span>
          Quantity: <span>{qty}</span>{' '}
        </span>
        <div className='counter-container'>
          <span className='item-size'>Size: {size}</span>
          <span className='item-price fw-bold'>
            {new Intl.NumberFormat('de-DE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(price * qty?.toFixed(2))}{' '}
            €
          </span>
          <div className='cart-icons'>
            <span
              className='trash-icon'
              onClick={() => dispatch(removeFromCart({ ...item }))}
            >
              <FaTrash style={{ marginRight: '5px' }} />
              <span className='trash-icon-text'>Remove</span>
            </span>
            <span
              className='heart-icon'
              onClick={() => {
                updateWishList(item);
              }}
            >
              <div className='cart-slide-heart-item'>
                {isInWishList ? (
                  <FaHeart style={{ fill: '#e62525' }} />
                ) : (
                  <FaRegHeart />
                )}
                {isInWishList ? (
                  <span>On your wishlist</span>
                ) : (
                  <span>Add to wishlist</span>
                )}
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSlideItem;
