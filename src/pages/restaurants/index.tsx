import { Container } from '@/components/ui/container';
import Typography from '@/components/ui/typography';
import { searchRestaurant } from '@/api/search';
import InputDebounce from '@/components/input-debounce';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import RestaurantCard from './components/restaurant-card';
import { useUser } from '@/providers/user';
import { CreateRestaurantButton } from './components/create-restaurant-modal';

const Restaurants = () => {
  const user = useUser();
  const isAdmin = user.isAdmin;

  const [search, setSearch] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['foods', search],
    queryFn: () => searchRestaurant(search),
  });
  return (
    <Container className="py-10 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between">
          <Typography variant="h2" fontWeight="bold">
            Restaurants
          </Typography>
          {isAdmin && <CreateRestaurantButton />}
        </div>
        <InputDebounce
          placeholder="Search restaurant"
          className="w-full"
          value={search}
          onChange={(val) => {
            setSearch(val as string);
          }}
        />
        {isLoading && (
          <div className="flex items-center justify-center h-full w-full">
            <Typography variant="h1" className="text-slate-600">
              Loading... 🥗🥐
            </Typography>
          </div>
        )}
        {data?.hits.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <Typography variant="h1" className="text-slate-600">
              No Restaurants Found 🥗🥐
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.hits.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Restaurants;
