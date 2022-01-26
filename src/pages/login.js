import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function login() {
  const navigate = useNavigate();
  const { getAuth, signInWithEmailAndPassword } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setPassword('');
      setEmailAddress('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  return (

    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col bg-white items-center p-4 border border-gray-primary rounded">
          <h1 className="flex justify-center w-full">
            <img src="./images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />

          </h1>
          {error && <p data-testid="error" className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogin} method="POST" data-testid="login">
            <input
              type="email"
              aria-label="Enter your email address"
              value={emailAddress}
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-primary"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              aria-label="Enter your password"
              value={password}
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-primary"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded font-bold h-8 ${isInvalid && 'opacity-50'}`}
              data-testid="sign-up"
            >
              Log In

            </button>

          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary mt-3">
          <p className="text-sm">
            Don't have an account?
            {' '}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">Sign up</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
