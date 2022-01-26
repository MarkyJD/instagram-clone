/* eslint-disable */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../pages/login';
import FirebaseContext from '../../context/firebase';
import * as ROUTES from '../../constants/routes';
import { act } from 'react-dom/test-utils';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => ({
    navigate: mockedNavigate
  })
}));

describe('<Login />', () => {
  it('Renders the login page with a form submission and logs the user in', async () => {
    
    const succeededToLogin = jest.fn(() => Promise.resolve('I am logged in!'));
    
    const getAuth = jest.fn(() => ({
      currentUser: {
        getIdToken: () => 32,
      }
    }));

    const signInWithEmailAndPassword = jest.fn(() => ({succeededToLogin}));


    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
    <Router>
      <FirebaseContext.Provider value={{getAuth, signInWithEmailAndPassword}}> 
        <Login />
      </FirebaseContext.Provider> 
    </Router>
    );
    
    await act(async () => {
      
      expect(document.title).toEqual('Login - Instagram');
      
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'marky.dodson@gmail.com' }
      });
      
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'test-password' }
      });
      
      await fireEvent.submit(getByTestId('login'));
      
      expect(succeededToLogin).toHaveBeenCalled();
      expect(succeededToLogin).toHaveBeenCalledWith('marky.dodson@gmail.com', 'test-password');
      expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD);
      
    });

  });
    
});
