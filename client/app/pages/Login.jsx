import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/usersApiSlice';
import { setCredentials } from '../redux/slices/authSlice';
import Button from '../components/common/Button';
import { Col, Row } from 'react-bootstrap';
import Input from '../components/common/Input';
import { toast } from 'react-toastify';
import Loader from '../components/common/Loader';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
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
          <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }}>
            <h2 style={{ textAlign: 'left' }} className='heading-register'>
              Welcome back
            </h2>
            <Col xs='12' md='12'>
              <Input
                id={'email'}
                type={'text'}
                label={'Email Address*'}
                name={'email'}
                placeholder={'Email address'}
                value={email}
                onInputChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col xs='12' md='12'>
              <Input
                id={'password'}
                type={'password'}
                label={'Password*'}
                name={'password'}
                placeholder={'Password'}
                value={password}
                onInputChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <p className='policy'>
              By registering for an account, you agree to our{' '}
              <b>Terms of Use</b>. Please read our <b>Privacy Notice</b>.
            </p>
            <hr />
            <Button
              type='submit'
              variant='primary'
              text='Login'
              size='lg'
              disabled={isLoading}
            />
            <div className='d-flex flex-column my-5 gap-3 align-items-md-baseline justify-content-between'>
              <Link
                className='redirect-link'
                to='/'
                style={{ fontSize: '16px' }}
              >
                <span>Forgotten your password?</span>
              </Link>
              <Link
                className='redirect-link'
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                style={{ fontSize: '16px' }}
              >
                <span>Create a new account</span>
              </Link>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default Login;
