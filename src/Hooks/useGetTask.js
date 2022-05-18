import { useQuery } from 'react-query';
import axiosBaseUrl from '../api/axiosBaseUrl';

const getTasks = async ({ queryKey }) => {
  const email = queryKey[1];
  if (email) {
    try {
      const { data } = await axiosBaseUrl.get('/api/task', {
        params: {
          email,
        },
      });
      return data;
    } catch (error) {
      throw new Error(
        `Failed to get tasks. ${
          error?.response?.data?.message || error?.message
        }`
      );
    }
  }
};

export const useGetTasks = ({ name, url, email, isEnabled = true }) => {
  return useQuery([name, email], getTasks, {
    enabled: isEnabled,
  });
};
