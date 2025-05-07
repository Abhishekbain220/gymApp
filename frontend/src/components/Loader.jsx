import React from 'react';

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white z-100">
      <div className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin 
                      w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
      </div>
    </div>
  );
};

export default Loader;
