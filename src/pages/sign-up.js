/* eslint-disable */

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function signup() {
  let navigate = useNavigate();
  const { getAuth, updateProfile, firestore } = useContext(FirebaseContext);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let isInvalid = password.length < 8 || !fullname || !username || !emailAddress;

  const handleSignup = async (event) => {
    event.preventDefault();
    
    const usernameExists = await doesUsernameExist(username);
    
    if (!usernameExists) {

      try {
        
        const auth = getAuth();
        
        const createdUser = await createUserWithEmailAndPassword(auth, emailAddress, password);
        const user = createdUser.user;
      
        updateProfile(user, {
          displayName: username
        }).then(() => console.log('Profile updated'))
          .catch((error) => console.log(error.message));
            
        await setDoc(doc(firestore, 'users', user.uid), {
          userId: user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: emailAddress.toLowerCase(),
          followers: [],
          following: [],
          dateCreated: Date.now()
        });

        navigate(ROUTES.DASHBOARD);

      } catch (error) {
        setError(error.message);
      }
      
    } else {
      setUsername('');
      setError('Sorry that username already exists');
    }
    
  }
    

  useEffect(() => {
    document.title = 'Sign up - Instagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      {/* <div className="flex w-3/5">
        <img src='/images/iphone-with-profile.jpg' alt='iPhone with Instagram' />
      </div> */}
      <div className="flex flex-col w-2/5 mx-auto">
        <div className="flex flex-col bg-white items-center p-4 border border-gray-primary rounded">
        <h1 className='flex justify-center w-full'>
          <img src='./images/logo.png' alt='Instagram' className='mt-2 w-6/12 mb-4'/>
        </h1>
        <h2 className='w-full text-center mb-4 text-gray-500'>
        Sign up to see photos and videos from your friends.
        </h2>
        {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}
        <form onSubmit={handleSignup} method='POST'>
          <input 
            type="email" 
            aria-label="Enter your email address" 
            value={emailAddress}
            placeholder='Email address'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-primary'
            onChange={({target}) => setEmailAddress(target.value)}
          />
          <input 
            type="text" 
            aria-label="Full Name" 
            value={fullname}
            placeholder='Full Name'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-primary'
            onChange={({target}) => setFullname(target.value)}
          />
          <input 
            type="text" 
            aria-label="Username" 
            value={username}
            placeholder='Username'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-primary'
            onChange={({target}) => setUsername(target.value)}
          />
          <input 
            type="password" 
            aria-label="Enter your password" 
            value={password}
            placeholder='Password'
            className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border rounded mb-2 border-gray-primary'
            onChange={({target}) => setPassword(target.value)}
          />
          <button
            disabled={isInvalid}
            type='submit'
            className={`bg-blue-medium text-white w-full rounded font-bold h-8 ${isInvalid && 'opacity-50'}` }
          >Sign up</button>

        </form>
      </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary mt-3">
          <p className="text-sm">Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>Login</Link>
          </p>
        </div>
      </div>
      
    </div>
  );
}
