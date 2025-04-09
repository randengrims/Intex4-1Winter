import { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ fontSize: '2rem', color: '#FFD700', cursor: 'pointer', userSelect: 'none' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{ marginRight: 4 }}
        >
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
