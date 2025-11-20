'use client';

import { CiStar } from 'react-icons/ci';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, max = 5, className }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className={`flex items-center ${className}`}>
      {/* FULL STARS */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400 w-4 h-4 mr-1" />
      ))}

      {/* HALF STAR */}
      {hasHalf && <FaStarHalfAlt className="text-yellow-400 w-4 h-4 mr-1" />}

      {/* EMPTY STARS */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-gray-300 w-4 h-4 mr-1" />
      ))}

      {/* Rating value */}
      <span className="text-black poppins-font font-medium text-base ml-1">({rating})</span>
    </span>
  );
};

export default RatingStars;
