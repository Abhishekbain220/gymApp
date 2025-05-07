import React from 'react';

const Loader = () => {
  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-white z-50"
      aria-label="Loading"
      role="status"
    >
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 
                   border-4 border-blue-500 border-t-transparent 
                   rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Loader;
