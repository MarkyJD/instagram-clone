/* eslint-disable react/jsx-no-constructed-context-values */
import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import * as ROUTE from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

import ProtectedRoute from './helpers/protectedRoute';
import IsLoggedInRoute from './helpers/isLoggedInRoute';

const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Profile = lazy(() => import('./pages/profile'));

export default function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading</p>}>
          <Routes>
            <Route
              path={ROUTE.DASHBOARD}
              exact
              element={(
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              )}
            />

            <Route
              path={ROUTE.LOGIN}
              exact
              element={(
                <IsLoggedInRoute isLoggedInPath={ROUTE.DASHBOARD} user={user}>
                  <Login />
                </IsLoggedInRoute>
              )}
            />

            <Route
              path={ROUTE.SIGN_UP}
              exact
              element={(
                <IsLoggedInRoute isLoggedInPath={ROUTE.DASHBOARD} user={user}>
                  <Signup />
                </IsLoggedInRoute>
              )}
            />
            <Route path={ROUTE.PROFILE} element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
