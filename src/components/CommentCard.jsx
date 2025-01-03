import PropTypes from "prop-types";
import { ROBOHASH_URL } from "../configs";
import ImageWithFallback from "./ImageWithFallback";

const CommentCard = ({ comment }) => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
      <ImageWithFallback
        src={`${ROBOHASH_URL}/${comment.email}`}
        alt={`Avatar for ${comment.email}`}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="font-medium text-gray-900">{comment.email}</h3>
        </div>
        <p className="mt-1 text-gray-600">{comment.body}</p>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  comment: PropTypes.shape({
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentCard;
