import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { useAddTask } from '../../Hooks/useAddTask';
import ErrorPreview from '../shared/ErrorPreview';
import Spinner from '../shared/Spinner';

const AddTask = ({ refetch }) => {
  const [showModal, setShowModal] = useState(false);

  const [authUser, authLoading] = useAuthState(auth);

  const onError = (error) => {
    const message = error?.message || 'Failed to add task.';
    toast.error(message);
  };
  const onSuccess = () => {
    toast.success('Successfully added task.');
    setShowModal(false);
    refetch();
  };

  const { isLoading, mutateAsync } = useAddTask({ onError, onSuccess });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const { name, description } = data;
    const email = authUser.email;

    if (!email) {
      toast.error('Error fetching user email.');
    }

    if (name && description) {
      await mutateAsync({ name, description, email });
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-[20vh] w-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-[calc(100vh-217px)] flex justify-center items-center">
        <h1 className="text-3xl font-medium text-center">
          User fetching error
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <label
        htmlFor="addTaskModal"
        className="btn modal-button"
        onClick={() => setShowModal((prev) => !prev)}
      >
        Add a New Task
      </label>

      {showModal && (
        <>
          {' '}
          <input type="checkbox" id="addTaskModal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="addTaskModal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowModal((prev) => !prev)}
              >
                ✕
              </label>
              <div className="flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold">Task Information</h3>

                {/* Add Task Form */}
                <form
                  className="w-9/12"
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                >
                  {/* Task Name */}
                  <div className="form-control w-full max-w-xs mt-8">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs rounded"
                      placeholder="Enter task name."
                      name="name"
                      {...register('name', {
                        required: 'Task name is required.',

                        minLength: {
                          value: 2,
                          message: 'Minimum 2 characters.',
                        },
                        validate: (val) => {
                          if (val.startsWith(' ') || val.endsWith(' ')) {
                            return 'Cannot contain empty space in the beginning or end.';
                          }
                        },
                      })}
                    />
                    {errors?.name?.message && (
                      <ErrorPreview error={errors.name.message} />
                    )}
                  </div>

                  {/* Task Description */}
                  <div className="form-control w-full max-w-xs mt-6">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      type="text"
                      rows={4}
                      className="textarea textarea-bordered w-full max-w-xs rounded"
                      placeholder="Enter task description."
                      name="description"
                      {...register('description', {
                        required: 'Task description is required.',

                        minLength: {
                          value: 2,
                          message: 'Minimum 2 characters.',
                        },
                        validate: (val) => {
                          if (val.startsWith(' ') || val.endsWith(' ')) {
                            return 'Cannot contain empty space in the beginning or end.';
                          }
                        },
                      })}
                    ></textarea>
                    {errors?.description?.message && (
                      <ErrorPreview error={errors.description.message} />
                    )}
                  </div>

                  <button className="btn mt-10 rounded hover:bg-opacity-90 w-full max-w-xs">
                    Add Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddTask;
