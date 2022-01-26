import useUser from '../../hooks/useUser';
import User from './User';
import Suggestions from './Suggestions';

export default function Sidebar() {
  const {
    user: {
      username, fullname, userId, following, docId
    }
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullname={fullname} />
      <Suggestions loggedInUserDocId={docId} following={following} userId={userId} />
    </div>
  );
}
