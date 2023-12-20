import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  const fetchData = async () => {
    setIsLoading(true);
    if (isAuthenticated) {
      const token = localStorage.getItem('userToken');
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        if (response.ok) {
          setData(responseData);
          setError(null);
        } else {
          throw new Error(responseData.message);
        }
      } catch (error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, isLoading, refetch: fetchData };
}
