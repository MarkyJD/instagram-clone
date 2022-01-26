import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/profile';

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const result = await getUserByUsername(username);
      if (result.length > 0) {
        setUser(result[0]);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate]);

  return user ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
