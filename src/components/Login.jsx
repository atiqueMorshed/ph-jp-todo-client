import React from 'react';

const Login = () => {
  return (
    <div className="mt-36 sm:mt-20">
      <div className="w-[300px] max-w-11/12 sm:w-[400px] mx-auto sm:px-10 sm:py-20 sm:border sm:rounded">
        <form className="flex flex-col justify-center">
          <h1 className="text-3xl font-medium mb-4 text-center">Login Now</h1>
          <p className="text-xs text-center mb-4">
            Must be logged in to see the todo list.
          </p>
          {/* Email Field */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs rounded"
            />
            {/* <label className="label">
            <span className="label-text-alt">Alt label1</span>
          </label> */}
          </div>

          {/* Password Field */}
          <div className="form-control w-full max-w-xs mt-8">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full max-w-xs rounded"
            />
            {/* <label className="label">
            <span className="label-text-alt">Alt label1</span>
          </label> */}
          </div>

          <button className="btn mt-10 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
