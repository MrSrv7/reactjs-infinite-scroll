import { useState, useCallback, useEffect } from "react";
import { fetchComments } from "../api";
import { useInfiniteScroll } from "../hooks";
import CommentCard from "./CommentCard";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreComments = useCallback(
    async (signal) => {
      try {
        const newComments = await fetchComments(page, signal);
        if (newComments.length === 0) {
          setHasMore(false);
          return;
        }
        setComments((prev) => [...prev, ...newComments]);
        setPage((prev) => prev + 1);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        setError("Failed to load comments. Please try again later.");
        throw err;
      }
    },
    [page]
  );

  // Load initial data
  useEffect(() => {

    const abortController = new AbortController(); // To prevent useEffect from firing the API call twice on initial render due to strict mode
    loadMoreComments(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { targetRef, loading } = useInfiniteScroll(() => loadMoreComments());

  if (error && comments.length === 0) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-4">
      {comments.length === 0 && loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              ref={index === comments.length - 1 ? targetRef : null}
            >
              <CommentCard comment={comment} />
            </div>
          ))}
          {loading && <LoadingSpinner />}
          {!hasMore && (
            <p className="text-center text-gray-500 py-4">
              No more comments to load.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CommentList;
