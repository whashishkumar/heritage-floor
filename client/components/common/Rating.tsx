import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  rating: number; // 0 to 5
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {/* {[rating].map((star) => (
        <FaStar
          key={star}
          size={16}
          color={star <= rating ? "#FFC107" : "#FFFFFF"} // yellow if rated, white otherwise
        />
      ))} */}
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        // Full star
        if (rating >= starValue) {
          return <FaStar key={index} size={16} color="#FFC107" />;
        }
        // Half star
        if (rating >= starValue - 0.5) {
          return <FaStarHalfAlt key={index} size={16} color="#FFC107" />;
        }

        // Empty star
        return <FaRegStar key={index} size={16} color="#d1d1d1" />;
      })}
    </div>
  );
};

export default Rating;
