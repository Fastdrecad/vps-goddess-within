import { GoPerson } from 'react-icons/go';
import Button from './Button';

const ProfileIcon = ({ className, onClick }) => {
  const Icon = (
    <span className='cart-icon'>
      <GoPerson style={{ fontSize: '25px' }} />
    </span>
  );

  return (
    <Button
      borderless
      variant='empty'
      className={className}
      ariaLabel={`your profile`}
      icon={Icon}
      onClick={onClick}
    />
  );
};

export default ProfileIcon;
