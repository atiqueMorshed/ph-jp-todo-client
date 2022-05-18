import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import auth from '../../firebase.init';
import Spinner from './Spinner';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [authUser, authLoading] = useAuthState(auth);

  if (authLoading) {
    return (
      <div className="min-h-[calc(100vh-217px)] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border-b shadow">
      <div className="navbar bg-base-100 w-[11/12] sm:w-[80%] mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            whatTODO
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              {authUser ? (
                <div
                  onClick={() => signOut(auth)}
                  className="flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h1>Logout</h1>
                </div>
              ) : (
                <Link to="/login" className="flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h1>Login</h1>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
