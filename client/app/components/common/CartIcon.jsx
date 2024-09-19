import { HiOutlineShoppingBag } from 'react-icons/hi2';
import Button from './Button';

const CartIcon = ({ className, onClick, cartItems }) => {
  const Icon = (
    <span className='cart-icon'>
      <HiOutlineShoppingBag style={{ fontSize: '25px' }} />
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
          ? `your shopping cart have ${items} items`
          : 'your shopping cart is empty'
      }
      icon={Icon}
      onClick={onClick}
    />
  );
};

export default CartIcon;
