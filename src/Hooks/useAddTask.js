import { useMutation } from 'react-query';
import axiosBaseUrl from '../api/axiosBaseUrl';

const addTask = async (task) => {
  try {
    const response = await axiosBaseUrl.post('/api/task', {
      task,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to add task. ${error?.response?.data?.message || error?.message}`
    );
  }
};

export const useAddTask = ({ onSuccess, onError }) => {
  return useMutation(addTask, { onSuccess, onError });
};
