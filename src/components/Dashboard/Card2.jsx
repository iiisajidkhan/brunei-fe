import React from 'react';

// Icons
import { Plus } from 'lucide-react';

function Card2({ onClick }) {
  return (
    <div
      onClick={() => onClick?.()}
      className='w-full max-w-1/2 h-32 bg-[#00BC6B] rounded-sm text-white p-4 flex items-center justify-center flex-col gap-4 cursor-pointer'
    >
      <Plus className='w-8 h-8 font-semibold text-white' />
      <div className=''>
        <p className='text-sm'>Add Customer</p>
      </div>
    </div>
  );
}

export default Card2;
