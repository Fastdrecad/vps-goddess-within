import { useContext } from 'react';
import { SlugContext } from './SlugContext';

export const useBrandSlug = () => useContext(SlugContext);
