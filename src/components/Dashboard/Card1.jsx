import React from 'react';

// Icons
import { Users } from 'lucide-react';

function Card1({ total }) {
  return (
    <div className='w-full max-w-1/2 h-32 bg-[#003049] rounded-sm text-white p-4 flex items-start justify-center flex-col gap-4'>
      <Users className='w-6 h-6 text-white' />
      <div className=''>
        <p className='text-lg font-bold'>{total}</p>
        <p className='text-sm text-gray-200'>Total Customer</p>
      </div>
    </div>
  );
}

export default Card1;
