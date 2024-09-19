import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import { Col, Row } from 'react-bootstrap';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import Input from '../../components/common/Input';
import { toast } from 'react-toastify';
import SelectOption from '../../components/common/SelectOption';
import {
  useGetUserQuery,
  useUpdateUserMutation
} from '../../redux/slices/usersApiSlice';

const options = [
  { value: 'ROLE ADMIN', label: 'ADMIN' },
  { value: 'ROLE MEMBER', label: 'MEMBER' }
];

const UserEditPage = () => {
  const { id: userId } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  const { data: user, isLoading, error, refetch } = useGetUserQuery(userId);

  const [updateUser] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        role: user.role || 'ROLE MEMBER'
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, formData }).unwrap();
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };

  const handleSelectChange = (key, selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: selectedOption.value
    }));
  };

  const selectedRoleOption = options.find(
    (option) => option.value === formData.role
  );

  if (!formData) {
    return (
      <Row className='align-items-center justify-content-center'>
        <Loader />
      </Row>
    );
  }

  return (
    <>
      <div className='input-box'>
        <Link className='redirect-link' to='/admin/userlist'>
          <span>Go Back</span>
        </Link>
      </div>
      {isLoading ? (
        <Row className='align-items-center justify-content-center'>
          <Loader />
        </Row>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <form onSubmit={handleSubmit}>
          <Row className='align-items-center justify-content-center'>
            <Col xs={{ size: 12, order: 2 }} md={{ size: 6, order: 1 }}>
              <h1 style={{ textAlign: 'left' }} className='heading-register'>
                Update User
              </h1>
              {Object.entries(formData).map(([key, value]) => (
                <Col xs='12' key={key}>
                  {key === 'role' ? (
                    <SelectOption
                      id={key}
                      label={`Select ${key[0].toUpperCase() + key.slice(1)}*`}
                      multi={true}
                      options={options}
                      value={selectedRoleOption}
                      handleSelectChange={(selectedOption) =>
                        handleSelectChange('role', selectedOption)
                      }
                    />
                  ) : (
                    <Input
                      id={key}
                      type='text'
                      label={`Enter ${key[0].toUpperCase() + key.slice(1)}*`}
                      name={key}
                      placeholder={key}
                      value={value}
                      onInputChange={(e) =>
                        handleInputChange(key, e.target.value)
                      }
                    />
                  )}
                </Col>
              ))}
              <div className='my-5'>
                <Button
                  type='submit'
                  variant='primary'
                  text='Update'
                  size='lg'
                  disabled={isLoading}
                />
              </div>
            </Col>
          </Row>
        </form>
      )}
    </>
  );
};

export default UserEditPage;
