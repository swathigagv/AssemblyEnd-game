import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

// Import your downloaded Lottie JSON files
import winAnimationData from '../assets/Trophy.json'; // Adjust path as needed
import loseAnimationData from '../assets/Try Again.json'; // Adjust path as needed

export default function GameAnimation({ isGameWon, isGameLost }) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Used to force Lottie re-render

  useEffect(() => {
    if (isGameWon || isGameLost) {
      setShowAnimation(true);
      setAnimationKey(prevKey => prevKey + 1); // Increment key to force animation replay

      // Hide animation after a set duration
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 4000); // Adjust this duration to match your Lottie animation length

      return () => clearTimeout(timer); // Cleanup timer on unmount or re-render
    } else {
      setShowAnimation(false); // Hide if game is not won/lost
    }
  }, [isGameWon, isGameLost]); // Re-run effect when game status changes

  if (!showAnimation) {
    return null; // Don't render anything if animation shouldn't be shown
  }

  // Determine which animation and message to display
  const animationToPlay = isGameWon ? winAnimationData : loseAnimationData;
  const message = isGameWon ? "Yahoo! You Win!" : "Have another day, don't worry!";

  return (
    <div className="game-animation-overlay">
      <div className="lottie-wrapper">
        <Lottie
          key={animationKey} // Use key to re-mount/replay animation
          animationData={animationToPlay}
          loop={false} // Play animation once
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p className="animation-message">{message}</p>
    </div>
  );
}