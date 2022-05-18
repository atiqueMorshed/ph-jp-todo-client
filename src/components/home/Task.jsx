import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteTask } from '../../Hooks/useDeleteTask';
import { useUpdateTask } from '../../Hooks/useUpdateStatus';

const Task = ({ task: { name, description, completed, _id }, refetch }) => {
  const [isCompleted, setIsCompleted] = useState(completed || false);

  const onError = (error) => {
    const message = error?.message || 'Failed to delete task.';
    toast.error(message);
  };
  const onSuccess = () => {
    toast.success('Successfully deleted task.');
    refetch();
  };

  const { isLoading, mutateAsync } = useDeleteTask({ onError, onSuccess });

  const updateError = (error) => {
    const message = error?.message || 'Failed to update task in DB.';
    toast.error(message);
  };
  const updateSuccess = () => {
    toast.success('Successfully updated task status in DB.');
  };
  const updateStatus = useUpdateTask({
    onError: updateError,
    onSuccess: updateSuccess,
  });

  const handleCompleted = async (e) => {
    const checked = e.target.checked;
    setIsCompleted(checked);
    if (checked) toast.success(`Completed ${name}`);
    await updateStatus.mutateAsync({ id: _id, completed: checked });
  };

  return (
    <tr>
      <th>
        <label>
          <input
            disabled={updateStatus?.isLoading || false}
            type="checkbox"
            className="checkbox"
            onClick={handleCompleted}
          />
        </label>
      </th>
      <td
        className={`${
          isCompleted || completed ? 'line-through' : ''
        } flex flex-col`}
      >
        <h1 className="text-xl font-bold uppercase">{name}</h1>

        <p className="truncate">{description}</p>
      </td>
      <th>
        <button
          disabled={isLoading || false}
          className="btn btn-ghost btn-xs"
          onClick={() => mutateAsync(_id)}
        >
          X
        </button>
      </th>
    </tr>
  );
};

export default Task;
