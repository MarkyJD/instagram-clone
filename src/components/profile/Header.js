import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username,
    fullname,
    followers = [],
    following = []
  }
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== username;
  const handleToggleFollow = async () => {
    setIsFollowingProfile((prev) => !prev);

    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(user.docId, profileDocId, user.userId, profileUserId, isFollowingProfile);
  };

  useEffect(() => {
    async function isLoggedInUserFollowingProfile() {
      const isFollowing = await isUserFollowingProfile(user.userId, profileDocId);

      setIsFollowingProfile(!!isFollowing);
    }
    if (user.userId && profileDocId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.userId, profileDocId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        { profileDocId ? (
          <img
            className="rounded-full h-40 w-40 shadow-md flex"
            alt={`${username} profile`}
            src={`/images/avatars/${username}.jpg`}
          />
        ) : (
          <Skeleton
            count={1}
            className="h-40 w-40 rounded-full flex"
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4 ">{username}</p>
          {activeBtnFollow && (
            <button
              type="button"
              className="bg-blue-medium font-bold text-sm rounded shadow-sm text-white w-20 h-8"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">
                  {photosCount}
                  {' '}
                </span>
                photos
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {followerCount}
                  {' '}
                </span>
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">
                  {following.length}
                  {' '}
                </span>
                following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullname ? (
              <Skeleton height={24} count={1} />
            ) : (
              fullname
            )}
          </p>
        </div>
      </div>

    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullname: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array
  }).isRequired
};
