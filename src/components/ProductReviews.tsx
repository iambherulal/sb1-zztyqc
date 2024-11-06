import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ProductReviewsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'userId' | 'date'>) => void;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews, onAddReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview({
      userName,
      rating,
      comment
    });
    setRating(5);
    setComment('');
    setUserName('');
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <span className="font-medium">{review.userName}</span>
              <span className="text-gray-500 text-sm">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <h4 className="font-medium">Write a Review</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <div className="flex space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    value <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};