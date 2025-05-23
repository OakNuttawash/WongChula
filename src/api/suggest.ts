import api from '@/lib/axios';
import { Food } from './types';
// import { SearchFoodResponse } from './types';

export const searchSuggestFood = async () => {
  const response = await api.get<Food[]>('/food-recommend');
  return response.data;
};
