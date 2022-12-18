import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { ErrorAlert } from '../components';

const LoginWithGoogle = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const onSuccess = (res: any) => {
    /* recieved  the res.profileObj */
    navigate("/chat-room", { replace: true });
    localStorage.setItem('userLoggedIn', JSON.stringify(true));
  };

  const onFailure = (res: any) => {
    /* recieved  the failed res */
    setError('Failed to login. Please try again later.')
  };

  return (
    <>
      <div className='btn-google-login'>
        <GoogleLogin
          clientId="707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      {error && error !== '' &&
        <ErrorAlert caption={error} />
      }
    </>
  );
}

export default LoginWithGoogle;
