import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={16}
        className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : star - 0.5 <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ))}
    <span className="text-sm text-gray-600 ml-1">{reviews}</span>
  </div>
);

export default StarRating;