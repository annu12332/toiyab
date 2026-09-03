import React from 'react';
import Films from '../components/home/Films';

const Videos = () => {
  return (
    <div className="pt-24 bg-brand-black min-h-screen">
      <Films showViewAll={false} />
    </div>
  );
};

export default Videos;
