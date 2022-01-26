import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({
  docId, comments, setComments, commentInput
}) {
  const [comment, setComment] = useState('');
  const { firestore } = useContext(FirebaseContext);

  const { user: { displayName } } = useContext(UserContext);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setComments([...comments, { displayName, comment }]);
    setComment('');

    const photoDocRef = doc(firestore, 'photos', docId);
    return updateDoc(photoDocRef, {
      comments: arrayUnion({ displayName, comment })
    });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) => (comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault())}
      >
        <input
          aria-label="add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 outline-gray-200"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && ' opacity-25'}`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
