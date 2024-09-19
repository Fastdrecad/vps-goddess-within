import BrandList from '../components/BrandList';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import Meta from '../components/common/Meta';
import { useGetBrandsListQuery } from '../redux/slices/brandApiSlice';

const BrandsPage = () => {
  const { data: brandsData, isLoading, error } = useGetBrandsListQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant='danger'>{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <div className='brands-page'>
      <Meta title='search our brands' />
      <hr />
      <BrandList brands={brandsData} />
    </div>
  );
};

export default BrandsPage;
