import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestions } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

export default function Suggestions({ loggedInUserDocId, following, userId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const results = await getSuggestions(userId, following);
      setProfiles(results);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  if (!profiles) {
    return (<Skeleton count={10} height={150} />);
  }

  if (profiles.length > 0) {
    return (
      <div className="rounded flex flex-col">
        <div className="text-sm flex items-center align-items justify-between mb-2">
          <p className="font-bold text-gray-base">Suggestions for you</p>
        </div>
        <div className="mt-4 grid gap-5">
          {profiles.map((profile) => (
            <SuggestedProfile
              key={profile.docId}
              spDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              loggedInUserDocId={loggedInUserDocId}
              userId={userId}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};
