import { useMutation } from 'react-query';
import axiosBaseUrl from '../api/axiosBaseUrl';

const updateTask = async (updateData) => {
  try {
    const response = await axiosBaseUrl.put('/api/task', {
      data: updateData,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to update task. ${
        error?.response?.data?.message || error?.message
      }`
    );
  }
};

export const useUpdateTask = ({ onSuccess, onError }) => {
  return useMutation(updateTask, { onSuccess, onError });
};
