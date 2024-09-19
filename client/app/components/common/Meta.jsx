import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>
        {title.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
      </title>
      <meta
        name='description'
        content={description
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      />
      <meta
        name='keywords'
        content={keywords
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Goddess Within',
  description: 'Empowering attire for the goddess within.',
  keywords: 'skirts, blazers, t-shirts, dresses, trousers'
};

export default Meta;
