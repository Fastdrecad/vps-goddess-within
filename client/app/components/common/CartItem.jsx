import Dropdown from './Dropdown';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import {
  addFromDropdownToCart,
  removeFromCart
} from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProductWithSelectedSize } from '../../utils/productUtils';
import { toggleWishlistItem } from '../../redux/slices/wishlistSlice';

const CartItem = ({ item, id, title, size, price, img, qty }) => {
  const dispatch = useDispatch();

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const quantities = [...Array(item?.sizes[0].quantity).keys()].map(
    (number) => {
      return { label: number + 1, value: number + 1 };
    }
  );

  const isInWishList = wishlistItems.some((item) => item._id === id);

  const handleChangeQty = (qty) => {
    const selectedSizeProduct = getProductWithSelectedSize(item, size);
    dispatch(addFromDropdownToCart({ ...selectedSizeProduct, qty: qty.value }));
  };

  const { userInfo } = useSelector((state) => state.auth);

  const updateWishList = (product) => {
    if (userInfo) {
      dispatch(toggleWishlistItem(product));
    } else {
      console.log('Please login', userInfo);
    }
  };

  return (
    <div className='cart-item'>
      <div className='cart-item-details'>
        <div className='cart-item-image'>
          <div className='product-image'>
            <Link to={`/product/${id}`}>
              <img src={img} />
            </Link>
          </div>
        </div>
        <div className='product-content'>
          <div className='product-details-group'>
            <div className='product-details'>
              <div className='product-name-content'>
                <span className='product-name'>
                  <span>Product: </span>
                  {title}
                </span>
              </div>
              <div className='product-id-content'>
                <span className='product-id'>
                  <span>Id: </span>
                  {id}
                </span>
              </div>
              <div className='product-size-content'>
                <span className='product-size'>
                  <span>Size: </span>
                  {size}
                </span>
              </div>
            </div>

            <div className='amount-container'>
              <span>Qty: </span>
              <Dropdown
                options={quantities}
                title={qty}
                value={qty}
                onChange={handleChangeQty}
                style={{ width: '100% !important' }}
              />
            </div>
          </div>
          <div className='product-bottom-content'>
            <div className='cart-control-icons'>
              <span
                className='trash-icon'
                onClick={() => dispatch(removeFromCart({ ...item }))}
              >
                <FaTrash style={{ marginRight: '5px' }} />
                Remove
              </span>
              <span
                className='heart-icon'
                onClick={() => {
                  updateWishList(item);
                }}
              >
                {isInWishList ? (
                  <FaHeart style={{ fill: '#e62525' }} />
                ) : (
                  <FaRegHeart />
                )}
                <span className='ms-1'>
                  {isInWishList ? 'On your wishlist' : 'Add to wishlist'}
                </span>
              </span>
            </div>
            <div className='product-price-wrapper'>
              <span className='product-price'>
                {new Intl.NumberFormat('de-DE', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(price * qty)}
                €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
