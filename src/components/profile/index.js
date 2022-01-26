import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUserPhotosByUserId } from '../../services/firebase';
import Photos from './Photos';

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }

    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    fullname: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};
