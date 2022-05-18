import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';

import auth from '../firebase.init';

import Spinner from './Spinner';
import ErrorPreview from './ErrorPreview';
import GoogleLogin from './GoogleLogin';
import { toast } from 'react-toastify';

const Register = () => {
  const [emailUserCreationError, setEmailUserCreationError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  const [authUser, authLoading] = useAuthState(auth);

  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  // Resets form on success
  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    if (email && password && name) {
      try {
        await createUserWithEmailAndPassword(email, password);
        if (!emailError) await updateProfile({ displayName: name });
        if (emailUser) {
          toast.success('Registration Successful, Please verify your email.');
        }
      } catch (error) {
        setEmailUserCreationError(error?.message);
      }
    }
  };

  if (emailLoading || updating || authLoading) {
    return (
      <div className="min-h-[calc(100vh-217px)] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-217px)] my-20">
      <div className="w-[300px] max-w-[90%] sm:w-[400px] mx-auto sm:px-10 sm:py-20 sm:border sm:rounded">
        <form
          className="flex flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <h1 className="text-3xl font-medium mb-4 text-center">
            Register Now
          </h1>

          {/* Name */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>

            <input
              type="text"
              className="input input-bordered w-full max-w-xs rounded"
              placeholder="Enter your name"
              name="name"
              {...register('name', {
                required: 'Name is required.',
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: 'Only alphabets and space.',
                },
                minLength: {
                  value: 5,
                  message: 'Minimum 5 characters.',
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

          {/* Email */}
          <div className="form-control w-full max-w-xs mt-6">
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

          {/* Password */}
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

          {/* Confirm password */}
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="input input-bordered w-full max-w-xs rounded"
              name="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm password is required.',

                validate: (val) => {
                  if (watch('password') !== val) {
                    return 'Passwords must match.';
                  }
                  if (val.startsWith(' ') || val.endsWith(' ')) {
                    return 'Cannot contain empty space in the beginning or end.';
                  }
                },
              })}
            />
            {errors?.confirmPassword?.message && (
              <ErrorPreview error={errors.confirmPassword.message} />
            )}
          </div>

          <button className="btn mt-10 rounded hover:bg-opacity-90">
            Register
          </button>

          {emailUserCreationError && (
            <ErrorPreview error={emailUserCreationError} />
          )}
          {emailError?.message && <ErrorPreview error={emailError.message} />}
          {updateError?.message && <ErrorPreview error={updateError.message} />}

          <p className="text-xs font-medium mt-8">
            Already have an account?{' '}
            <Link className="underline hover:text-gray-600" to="/login">
              Login
            </Link>
          </p>
        </form>
        <div className="divider">OR</div>
        <div className="mt-6">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
