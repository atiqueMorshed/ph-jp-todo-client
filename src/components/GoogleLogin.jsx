import React from 'react';
import googleIcon from '../Assets/icons/google.png';
const GoogleLogin = () => {
  return (
    <button className="btn btn-outline rounded w-full flex items-center gap-3">
      <img className="w-6 h-6" src={googleIcon} alt="Google" />
      Login with Google
    </button>
  );
};

export default GoogleLogin;
