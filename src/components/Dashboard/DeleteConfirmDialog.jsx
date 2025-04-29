import React from 'react';
import { AlertTriangleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

function DeleteConfirmDialog({ open, onClose, onConfirm, item }) {
  if (!open) return null;

  return (
    <>
      {/* Separate backdrop with opacity */}
      <div className='fixed inset-0 z-40 bg-black/50'></div>

      {/* Dialog content without inherited opacity */}
      <div className='fixed inset-0 z-50 flex items-center justify-center pointer-events-none'>
        <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in pointer-events-auto'>
          <div className='flex items-center gap-3 mb-5'>
            <div className='bg-red-100 p-2 rounded-full'>
              <AlertTriangleIcon className='h-6 w-6 text-red-600' />
            </div>
            <h2 className='text-xl font-semibold'>Confirm Deletion</h2>
          </div>

          <p className='text-gray-600 mb-6'>
            Are you sure you want to delete {item?.name || 'this item'}? This action cannot be undone.
          </p>

          <div className='flex justify-end gap-3'>
            <Button variant='outline' onClick={onClose} className='rounded cursor-pointer'>
              Cancel
            </Button>
            <Button variant='destructive' onClick={() => onConfirm(item)} className='rounded cursor-pointer'>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmDialog;
