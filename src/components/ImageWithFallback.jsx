import { useState } from "react";
import PropTypes from "prop-types";

const ImageWithFallback = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
          <div className="w-4 h-4 border-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={error ? `${src}?retry` : src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ImageWithFallback;
