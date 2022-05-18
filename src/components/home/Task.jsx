import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteTask } from '../../Hooks/useDeleteTask';

const Task = ({ task: { name, description, _id }, refetch }) => {
  const [completed, setCompleted] = useState(false);

  const onError = (error) => {
    const message = error?.message || 'Failed to delete task.';
    toast.error(message);
  };
  const onSuccess = () => {
    toast.success('Successfully deleted task.');
    refetch();
  };

  const { isLoading, mutateAsync } = useDeleteTask({ onError, onSuccess });

  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            onClick={() => setCompleted((prev) => !prev)}
          />
        </label>
      </th>
      <td className={`${completed ? 'line-through' : ''} flex flex-col`}>
        <h1 className="text-xl font-bold uppercase">{name}</h1>

        <p className="truncate">{description}</p>
      </td>
      <th>
        <button
          className={`${
            isLoading ? 'text-gray-100 pointer-events-none' : ''
          } btn btn-ghost btn-xs`}
          onClick={() => mutateAsync(_id)}
        >
          X
        </button>
      </th>
    </tr>
  );
};

export default Task;
