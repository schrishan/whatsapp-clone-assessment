import React, { useState, useRef } from 'react';
import { LoginType } from "../types/type";
import { ErrorAlert} from '../components';
import '../styles/login-form.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginFrom = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<LoginType>({ email: '', password: '' });
  const [error, setError] = useState("");
  const [userAvailable, setUserAvailable] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null);

  const elOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const userDataFetch = async () => {
    await axios
      .get(`http://localhost:3001/userLogins`)
      .then(res => {
        console.log(res.data);
        const userAvailable = res.data.some((el: LoginType) => (el.email === data.email && el.password === data.password));
        if (userAvailable) {
          navigate("/chat-room", { replace: true });
          localStorage.setItem('userLoggedIn', JSON.stringify(true));
        } else {
          setError("Couldn't find your account.");
          if (emailInputRef.current != null) emailInputRef.current.focus();
          emailInputRef.current?.select()
        }
      }).catch(err => {
        setError('Something went wrong. Please try again later.')
      });
  }

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userDataFetch();
  };
  
  return (
    <form
      onSubmit={formSubmit}
      className={`login-form ${!userAvailable && error !== '' ? 'invalid-state' : ''}`}
    >
      <div className="field">
        <label htmlFor='email' className="inlineBlock">Email</label>
        <input
          name="email"
          ref={emailInputRef}
          onChange={elOnChange}
        />
      </div>
      <div className="field">
        <label htmlFor="password" className="inlineBlock">Password</label>
        <input
          type={"password"}
          name="password"
          onChange={elOnChange}
        />
      </div>
      {error && error !== '' &&
        <ErrorAlert caption={error} />
      }
      <button
        type={"submit"}
        className="btn-login btn"
      >
        Login
      </button>
    </form>
  );
}

export default LoginFrom;