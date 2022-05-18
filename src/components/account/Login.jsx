import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';

import auth from '../../firebase.init';
import GoogleLogin from './GoogleLogin';
import Spinner from '../shared/Spinner';
import ErrorPreview from '../shared/ErrorPreview';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const [authUser, authLoading] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);

  // Redirects if user exists
  useEffect(() => {
    if (authUser) {
      navigate(from, { replace: true });
    }
  }, [authUser, navigate, from]);

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    if (email && password) {
      signInWithEmailAndPassword(email, password);
    }
  };

  if (emailLoading || authLoading) {
    return (
      <div className="min-h-[calc(100vh-217px)] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="my-20">
      <div className="w-[300px] max-w-[90%] sm:w-[400px] mx-auto sm:px-10 sm:py-20 sm:border sm:rounded">
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
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
              name="email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Enter valid email.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />

            {errors?.email?.message && (
              <ErrorPreview error={errors.email.message} />
            )}
          </div>

          {/* Password Field */}
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full max-w-xs rounded"
              name="password"
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 5,
                  message: 'Minimum 5 characters long.',
                },
                maxLength: {
                  value: 12,
                  message: 'Maximum 12 characters long.',
                },
                pattern: {
                  value: /(\D*\d){2,}/,
                  message: 'Minimum 2 digits.',
                },
                validate: (val) => {
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.password?.message && (
              <ErrorPreview error={errors.password.message} />
            )}
          </div>

          <button className="btn mt-10 rounded hover:bg-opacity-90">
            Login
          </button>
          {emailError?.message && <ErrorPreview error={emailError.message} />}

          <p className="text-xs font-medium mt-8">
            Don't have an account?{' '}
            <Link className="underline hover:text-gray-600" to="/register">
              Register
            </Link>
          </p>
        </form>
        <div className="divider">OR</div>
        <GoogleLogin from={from} />
      </div>
    </div>
  );
};

export default Login;
