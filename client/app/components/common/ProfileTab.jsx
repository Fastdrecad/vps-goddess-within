import { NavLink } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';

const linkStyle = {
  width: '100%',
  height: '100%'
};

export const ProfileTab = ({ logoutHandler, isHovering, setIsHovering }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const username = `${userInfo?.firstName} ${userInfo?.lastName}`;

  const handleClick = () => {
    setIsHovering(!isHovering);
  };

  const handleClickToProfile = () => {
    setIsHovering(!isHovering);
  };

  return (
    <div className='profile-tab'>
      <ul className='d-flex m-0'>
        {!userInfo && (
          <li className='d-flex align-items-center flex-column w-100'>
            <NavLink to='/login' onClick={handleClick} style={linkStyle}>
              <Button type='submit' variant='primary' text='Login' size='lg'>
                Login
              </Button>
            </NavLink>
            <div>
              <NavLink
                to='/register'
                className='redirect-link'
                onClick={handleClick}
              >
                <span>Register now</span>
              </NavLink>
              <span> - It only takes a minute.</span>
            </div>
          </li>
        )}

        {userInfo && (
          <li className='list-profile'>
            <NavLink to='/profile' onClick={handleClickToProfile}>
              <span>
                {' '}
                Your account{' '}
                <span className='fw-bold profile'>{`${
                  !username ? null : username
                }`}</span>
              </span>
            </NavLink>
          </li>
        )}

        <NavLink to='/profile' onClick={handleClick}>
          <li>
            <span>Orders</span>
          </li>
        </NavLink>
        <NavLink onClick={handleClick}>
          <li>
            <span>Return an item</span>
          </li>
        </NavLink>
        <NavLink onClick={handleClick}>
          <li>
            <span>Help & FAQ</span>
          </li>
        </NavLink>
      </ul>
      {userInfo && (
        <div className='profileTab-logout'>
          <NavLink to='/login' type='button' onClick={logoutHandler}>
            <span>
              Not{' '}
              {`${
                userInfo.firstName.charAt(0).toUpperCase() +
                userInfo.firstName.slice(1)
              }`}
              ? Log out
            </span>
          </NavLink>
        </div>
      )}
    </div>
  );
};
