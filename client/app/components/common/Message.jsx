import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} className='rounded-0'>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'secondary'
};

export default Message;
