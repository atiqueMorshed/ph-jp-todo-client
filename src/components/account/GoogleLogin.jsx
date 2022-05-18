import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../../Assets/icons/google.png';
import auth from '../../firebase.init';
import ErrorPreview from '../shared/ErrorPreview';
import Spinner from '../shared/Spinner';
const GoogleLogin = ({ from }) => {
  const navigate = useNavigate();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  // Navigate to private route or home

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="">
      <button
        onClick={() => signInWithGoogle()}
        className="btn btn-outline rounded w-full flex items-center gap-3"
      >
        <img className="w-6 h-6" src={googleIcon} alt="Google" />
        Login with Google
      </button>
      {error?.message && <ErrorPreview error={error?.message} />}
    </div>
  );
};

export default GoogleLogin;
