import { NavLink } from 'react-router-dom';
import { categories } from '../data';

const Categories = () => {
  return (
    <div className='categories'>
      {categories.map(item => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

const CategoryItem = ({ item }) => {
  return (
    <div className='category-item'>
      <NavLink to={`/shop`}>
        <img src={item.img} />
        <div className='carousel-info'>
          <h1 className='carousel-title'>{item.category}</h1>
          <button className='slide-button'>Shop now</button>
        </div>
      </NavLink>
    </div>
  );
};

export default Categories;
