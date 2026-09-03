import React from 'react';
import Gallery from '../components/home/Gallery';

const Images = () => {
  return (
    <div className="pt-24 bg-brand-black min-h-screen">
      <Gallery showViewAll={false} />
    </div>
  );
};

export default Images;
