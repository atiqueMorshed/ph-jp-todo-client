import { useMutation } from 'react-query';
import axiosBaseUrl from '../api/axiosBaseUrl';

const deleteTask = async (id) => {
  if (id) {
    try {
      const response = await axiosBaseUrl.delete('/api/task', {
        data: {
          id,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to delete task. ${
          error?.response?.data?.message || error?.message
        }`
      );
    }
  }
};

export const useDeleteTask = ({ onSuccess, onError }) => {
  return useMutation(deleteTask, { onSuccess, onError });
};
