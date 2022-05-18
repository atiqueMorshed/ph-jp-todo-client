import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useGetTasks } from '../../Hooks/useGetTask';
import Spinner from '../shared/Spinner';
import AddTask from './AddTask';
import Task from './Task';

const Home = () => {
  const [authUser, authLoading] = useAuthState(auth);
  const { isError, isSuccess, isLoading, isFetching, refetch, error, data } =
    useGetTasks({
      name: 'getTasks',
      email: authUser?.email,
    });

  if (authLoading || isLoading || isFetching) {
    return (
      <div className="min-h-[calc(100vh-217px)] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-[calc(100vh-217px)] flex flex-col gap-4 justify-center text-center items-center">
        <h1 className="text-3xl text-primaryBlue-500">Error fetching tasks</h1>
        <pre className="text-red-500">{error?.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div
        className={`min-h-[calc(100vh-217px)] w-[80%] max-w-11/12 mx-auto flex flex-col justify-center items-end gap-8 mb-20 ${
          data?.length === 0 ? 'flex-col-reverse items-center' : ''
        }`}
      >
        <AddTask refetch={refetch} />
        {data?.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>
                    <label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </label>
                  </th>
                  <th>Task</th>
                  {/* <th>Task Description</th> */}
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((task, index) => (
                  <Task
                    key={task._id}
                    task={task}
                    index={index}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="">
            <h1 className="text-3xl font-medium">No tasks added</h1>
          </div>
        )}
      </div>
    );
  }
};

export default Home;
