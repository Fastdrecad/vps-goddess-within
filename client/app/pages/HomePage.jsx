import FeaturedProducts from '../components/common/FeaturedProducts';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Meta from '../components/common/Meta';

const HomePage = () => {
  return (
    <section className='home'>
      <Meta />
      <Carousel />
      <FeaturedProducts type='featured' />
      <Categories />
      <FeaturedProducts type='recommended' />
    </section>
  );
};

export default HomePage;
