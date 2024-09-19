import Button from './Button';
import { BsHeart } from 'react-icons/bs';

const WishlistIcon = ({ className, onClick, cartItems }) => {
  const Icon = (
    <span className='cart-icon'>
      <BsHeart style={{ fontSize: '25px' }} />
      {cartItems.length > 0 && (
        <span className='cart-badge'>
          {cartItems.length >= 99 ? '99+' : cartItems.length}
        </span>
      )}
    </span>
  );

  const items = cartItems.length;

  return (
    <Button
      borderless
      variant='empty'
      className={className}
      ariaLabel={
        items > 0
          ? `your wishlist have ${items} items`
          : 'your wishlist is empty'
      }
      icon={Icon}
      onClick={onClick}
    />
  );
};

export default WishlistIcon;
