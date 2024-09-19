import { useState } from 'react';
import FormContainer from '../components/common/FormContainer';
import { Col, Row } from 'react-bootstrap';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../redux/slices/cartSlice';
import CheckoutSteps from '../components/common/CheckoutSteps';

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <form onSubmit={handleSubmit}>
        <Row className='align-items-center justify-content-center'>
          <Col xs='12' md='12'>
            <Input
              placeholder='Enter address'
              value={address}
              id='address'
              type='text'
              label='Address*'
              name='address'
              onInputChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              id='city'
              type='text'
              label='City*'
              name='city'
              placeholder='Enter City'
              value={city}
              onInputChange={(e) => setCity(e.target.value)}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              id='postalCode'
              type='text'
              label='Postal Code*'
              name='postalCode'
              placeholder='Enter Postal Code'
              value={postalCode}
              onInputChange={(e) => setPostalCode(e.target.value)}
            />
          </Col>
          <Col xs='12' md='12'>
            <Input
              id='country'
              type='text'
              label='Country*'
              name='country'
              placeholder='Enter Country'
              value={country}
              onInputChange={(e) => setCountry(e.target.value)}
            />
          </Col>
        </Row>
        <Button
          type='submit'
          variant='primary'
          text='Continue'
          size='lg'
          className='my-4'
        />
      </form>
    </FormContainer>
  );
};

export default ShippingPage;
