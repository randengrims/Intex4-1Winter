import React from 'react';
import './magnific-popup.css'; // Your existing popup styles
import './moviePopup.css'; // New animation + layout enhancements
type MoviePopupProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const MoviePopup: React.FC<MoviePopupProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <>
      <div className="mfp-bg" onClick={onClose}></div>
      <div className="mfp-wrap" onClick={onClose}>
        <div
          className="mfp-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mfp-content movie-popup animate-popup">
            <button className="mfp-close" onClick={onClose}>
              ✕
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default MoviePopup;





