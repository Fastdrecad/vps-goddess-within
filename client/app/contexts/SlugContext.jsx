import { createContext, useState } from 'react';

export const SlugContext = createContext();

export const SlugProvider = ({ children }) => {
  const [brandSlug, setBrandSlug] = useState(undefined);

  return (
    <SlugContext.Provider value={{ brandSlug, setBrandSlug }}>
      {children}
    </SlugContext.Provider>
  );
};
