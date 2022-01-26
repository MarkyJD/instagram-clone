import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';

export default function Comments({
  docId, comments: allComments, posted, commentInput
}) {
  const [comments, setComments] = useState(allComments);
  const [numberOfComments, setNumberOfComments] = useState(3);

  const toggleComments = () => {
    if (numberOfComments > 3) {
      setNumberOfComments(3);
    } else {
      setNumberOfComments(comments.length);
    }
  };
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length > 3 && (
          <button
            type="button"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                toggleComments();
              }
            }}
            onClick={toggleComments}
            className="text-sm text-gray-base mb-1 cursor-pointer"
          >
            {`View all ${comments.length} comments`}
          </button>
        )}
        {comments.slice(0, numberOfComments).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs">
          {formatDistance(posted, new Date())}
          {' '}
          ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />

    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired
};
