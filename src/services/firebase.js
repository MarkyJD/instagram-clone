import {
  collection, query, where, getDocs, getDoc, limit, arrayRemove, doc, arrayUnion, updateDoc,
} from 'firebase/firestore';
import { firestore } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const userRefs = collection(firestore, 'users');

  const q = query(userRefs, where('username', '==', username));

  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

export async function getUserByUsername(username) {
  const userRefs = collection(firestore, 'users');

  const q = query(userRefs, where('username', '==', username));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return false;
  }

  const results = [];

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      docId: doc.id
    });
  });
  return results;
}

export async function getUserByUserId(userId) {
  const userRefs = collection(firestore, 'users');
  const q = query(userRefs, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  let user = {};

  querySnapshot.forEach((doc) => {
    user = {
      ...doc.data(),
      docId: doc.id,
    };
  });

  return user;
}

export async function getSuggestions(userId, following) {
  const userRefs = collection(firestore, 'users');
  const q = query(userRefs, where('userId', '!=', userId), limit(10));

  const querySnapshot = await getDocs(q);

  const results = [];

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      docId: doc.id
    });
  });

  return results.filter((profile) => !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowingProfile) {
  const loggedInUserDocRef = doc(firestore, 'users', loggedInUserDocId);

  return updateDoc(loggedInUserDocRef, {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId)
  });
}

export async function updateFollowedUserFollowers(spDocId, loggedInUserDocId, isAFollower) {
  const spUserDocRef = doc(firestore, 'users', spDocId);

  return updateDoc(spUserDocRef, {
    followers: isAFollower
      ? arrayRemove(loggedInUserDocId)
      : arrayUnion(loggedInUserDocId)
  });
}

export async function getPhotos(userId, following) {
  const photoRefs = collection(firestore, 'photos');
  const q = query(photoRefs, where('userId', 'in', following));
  const querySnapshot = await getDocs(q);
  const userFollowedPhotos = [];

  querySnapshot.forEach((photo) => {
    userFollowedPhotos.push({
      ...photo.data(),
      docId: photo.id
    });
  });

  const photosWithUserDetails = await Promise.all(userFollowedPhotos.map(async (photo) => {
    let userLikedPhoto = false;
    if (photo.likes.includes(userId)) {
      userLikedPhoto = true;
    }
    const user = await getUserByUserId(photo.userId);
    const { username } = user;
    return { username, ...photo, userLikedPhoto };
  }));

  return photosWithUserDetails;
}

export async function updateLikes(photoDocId, userId, isLiked) {
  const photoDocRef = doc(firestore, 'photos', photoDocId);

  return updateDoc(photoDocRef, {
    likes: isLiked ? arrayRemove(userId) : arrayUnion(userId)
  });
}

export async function getUserIdByUsername(username) {
  const userRefs = collection(firestore, 'users');

  const q = query(userRefs, where('username', '==', username));

  const querySnapshot = await getDocs(q);

  const results = [];

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data()
    });
  });

  const [{ userId }] = results;

  return userId;
}

export async function getUserPhotosByUserId(userId) {
  const photosRef = collection(firestore, 'photos');

  const q = query(photosRef, where('userId', '==', userId));

  const querySnapshot = await getDocs(q);

  const results = [];

  querySnapshot.forEach((doc) => {
    results.push({
      ...doc.data(),
      docId: doc.id
    });
  });
  return results;
}

export async function isUserFollowingProfile(loggedInUserId, profileDocId) {
  const profileDocRef = doc(firestore, 'users', profileDocId);
  const docSnapshot = await getDoc(profileDocRef);

  const { followers } = docSnapshot.data();

  return followers.includes(loggedInUserId);
}

export async function toggleFollow(activeDocId, profileDocId, activeUserId, profileUserId, isActiveUserFollowingProfile) {
  const activeUserDocRef = doc(firestore, 'users', activeDocId);
  const profileDocRef = doc(firestore, 'users', profileDocId);

  await updateDoc(activeUserDocRef, {
    following: !isActiveUserFollowingProfile
      ? arrayUnion(profileUserId)
      : arrayRemove(profileUserId)
  });

  await updateDoc(profileDocRef, {
    followers: !isActiveUserFollowingProfile
      ? arrayUnion(activeUserId)
      : arrayRemove(activeUserId)
  });
}
