import { Row, Col } from 'react-bootstrap';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import Loader from '../components/common/Loader';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({
          email,
          password,
          firstName,
          lastName
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <div className='signup-form'>
      {isLoading && (
        <Row className='align-items-center justify-content-center'>
          <Loader />
        </Row>
      )}
      <form onSubmit={handleSubmit}>
        <Row className='align-items-center justify-content-center'>
          <Col xs={{ size: 12, order: 2 }} md={{ size: '6', order: 1 }}>
            <h2 style={{ textAlign: 'left' }} className='heading-register'>
              Create an account
            </h2>
            <Col xs='12' md='12'>
              <Input
                id='firstName'
                type='text'
                label='First Name*'
                name='firstName'
                placeholder='First Name'
                value={firstName}
                onInputChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                id='lastName'
                type='text'
                label='Last Name*'
                name='lastName'
                placeholder='Last Name'
                value={lastName}
                onInputChange={(e) => setLastName(e.target.value)}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                id='email'
                type='text'
                label='Email Address*'
                name='email'
                placeholder='Email address'
                value={email}
                onInputChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                id='password'
                type='password'
                label='password*'
                name='password'
                placeholder='Password'
                value={password}
                onInputChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                id='confirmPassword'
                type='password'
                label='Confirm Password*'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={confirmPassword}
                onInputChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
            <p className='policy'>
              By registering for an account, you agree to our{' '}
              <b>Terms of Use</b>. Please read our <b>Privacy Notice</b>.
            </p>
            <hr />
            {/* <div className='d-flex flex-column flex-md-row align-items-md-center justify-content-between'> */}
            <Button
              type='submit'
              variant='primary'
              text='Register'
              size='lg'
              disabled={isLoading}
            />
            <div className='input-box'>
              <Link className='redirect-link' to='/login'>
                <span>Back to login</span>
              </Link>
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default Register;
