import React, { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Check, PrinterIcon, X } from 'lucide-react';

import kanchi from '@/assets/svg/kanchi.svg';

function PrintRecord({ open, onClose, data }) {
  const printRef = useRef();

  console.log('PrintRecord data:', data);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (!open || !data) return null;

  return (
    <div onClick={() => onClose?.()} className="fixed inset-0 flex items-center justify-center overflow-hidden z-50">
      <div className="absolute inset-0 bg-black/30"></div>
      <div onClick={e => e.stopPropagation()} className="relative w-[556px] overflow-y-auto bg-white p-8 rounded">
        <div ref={printRef}>
          <div className="flex items-center justify-center w-full">
            <h2 className="font-semibold text-[32px]">BRUNEI TAILOR & CLOTH HOUSE</h2>
          </div>
          <div className="flex items-center justify-between w-full border-b">
            <div className="text-[10px] flex items-center font-semibold">0336-9197612, 0316-1229990</div>
            <h1 className="text-[10px] flex gap-2 font-semibold">
              Address: <span className="font-normal">Lakki Gate Bilal Market Near Jafar Masjid Bannu</span>
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4 ">
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Name / نام</h1>
              <h1 className="text-[12px]">{data.name || '-'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Number / نمبر</h1>
              <h1 className="text-[12px]">{data.registerNumber || '-'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Phone / موبائل نمبر</h1>
              <h1 className="text-[12px]">{data.phoneNumber || '-'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Address / پتہ</h1>
              <h1 className="text-[12px]">{data.address || '-'}</h1>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-[12px] font-semibold">_________ سوٹ</h1>
            <h1 className="text-[12px] font-semibold">_________ بقایا رقم</h1>
            <h1 className="text-[12px] font-semibold">_________ وصول شدہ رقم</h1>
            <h1 className="text-[12px] font-semibold">_________ کل رقم</h1>
          </div>

          <div className="flex items-center mt-4">
            <img src={kanchi} alt="kanchi" className="w-[20px] h-[20px]" />
            <h1 className="text-gray-300">
              ---------------------------------------------------------------
            </h1>
          </div>

          <div className="flex items-center justify-center w-full">
            <h2 className="font-semibold text-[32px]">BRUNEI TAILOR & CLOTH HOUSE</h2>
          </div>
          <div className="flex items-center justify-between w-full border-b">
            <div className="text-[10px] flex items-center font-semibold">0336-9197612, 0316-1229990</div>
            <h1 className="text-[10px] flex gap-2 font-semibold">
              Address: <span className="font-normal">Lakki Gate Bilal Market Near Jafar Masjid Bannu</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Name / نام</h1>
              <h1 className="text-[12px]">{data.name || '-'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Number / نمبر</h1>
              <h1 className="text-[12px]">{data.registerNumber || '-'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Phone / موبائل نمبر</h1>
              <h1 className="text-[12px]">{data.phoneNumber || '-'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[12px] font-semibold">Address / پتہ</h1>
              <h1 className="text-[12px]">{data.address || '-'}</h1>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <h1 className="text-[12px] font-semibold">_________ سوٹ</h1>
            <h1 className="text-[12px] font-semibold">_________ بقایا رقم</h1>
            <h1 className="text-[12px] font-semibold">_________ وصول شدہ رقم</h1>
            <h1 className="text-[12px] font-semibold">_________ کل رقم</h1>
          </div>

          <div className="w-full flex border border-black rounded overflow-hidden mt-2">
            {/* Swapped sides: Features on left, Measurements on right */}
            <div className="w-1/2 border-r border-black">
              {[
                'ٹو پیس کلر',
                'اوپر پٹی',
                'پٹی ایک انچ',
                'چورس کف : 10',
                'سائیڈ پاکٹ',
                'چھوٹا پلیٹ',
                'گوٹے کے بغیر',
                'سیدہ گیرہ',
                'گول استین',
                'رینگ بٹن',
              ].map((feature, idx, arr) => (
                <div
                  key={feature}
                  className={`flex items-center gap-2 px-4 py-2 text-[12px] font-semibold border-b border-black ${
                    idx === arr.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <Check size={16} className="text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="w-1/2 font-mono border-l border-black">
  {[
    { label: 'Length / لمبائی', value: data.length },
    { label: 'Arm / بازو', value: data.arm },
    { label: 'Shoulder / تیرہ', value: data.shoulder },
    { label: 'Neck / گلہ', value: data.neck },
    { label: 'Chest / چھاتی', value: data.chest },
    { label: 'Width / گیرہ / چوڑائی', value: data.width },
    { label: 'Pant / شلوار', value: data.pant },
    { label: 'Pancha / پانچہ', value: data.pancha },
  ].map(({ label, value }, idx, arr) => (
    <div
      key={label}
      className={`px-4 py-2 text-[12px] border-b border-black ${
        idx === arr.length - 1 ? 'border-b-0' : ''
      }`}
    >
      <span className="inline-block w-[60px] text-right mr-2">
        {String(value || '-').padStart(4, ' ')}
      </span>
      : {label}
    </div>
  ))}
</div>


          </div>
        </div>

        <div className="flex gap-2 w-full mt-2">
          <Button
            onClick={() => onClose?.()}
            className="w-1/2 h-12 rounded-sm cursor-pointer bg-red-500 hover:bg-red-500"
          >
            <X size={20} />
            Close
          </Button>
          <Button
            onClick={handlePrint}
            className="w-1/2 h-12 rounded-sm cursor-pointer bg-green-600 hover:bg-green-700"
          >
            <PrinterIcon size={20} />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PrintRecord;













/* import React, { useEffect, useRef } from 'react';

// Shadcn Component
import { Button } from '@/components/ui/button';
import { Check, PrinterIcon, X } from 'lucide-react';

import kanchi from '@/assets/svg/kanchi.svg';

function PrintRecord({ open, onClose, data }) {
  const printRef = useRef();

  console.log('PrintRecord data:', data);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  if (!open || !data) return null;

  return (
    <div onClick={() => onClose?.()} className='fixed inset-0 flex items-center justify-center overflow-hidden z-50'>
      <div className='absolute inset-0 bg-black/30'></div>
      <div onClick={e => e.stopPropagation()} className='relative  w-[556px] overflow-y-auto bg-white p-8 rounded'>
        <div ref={printRef}>
          <div className='flex items-center justify-center w-full'>
            <h2 className='font-semibold text-[32px]'>BRUNEI TAILOR & CLOTH HOUSE</h2>
          </div>
          <div className='flex items-center justify-between w-full border-b'>
            <div className='text-[10px] flex items-center font-semibold'>0336-9197612, 0316-1229990</div>
            <h1 className='text-[10px] flex gap-2 font-semibold'>
              Address: <span className='font-normal'>Lakki Gate Bilal Market Near Jafar Masjid Bannu</span>
            </h1>
          </div>
          <div className='grid grid-cols-2 gap-4 py-4 '>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Name / نام</h1>
              <h1 className='text-[12px]'>{data.name || '-'}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Number / نمبر</h1>
              <h1 className='text-[12px]'>{data.registerNumber || '-'}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Phone /موبائل نمبر</h1>
              <h1 className='text-[12px]'>{data.phoneNumber || '-'}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Address / پتہ</h1>
              <h1 className='text-[12px]'>{data.address || '-'}</h1>
            </div>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <h1 className='text-[12px] font-semibold'>_________ سوٹ</h1>
            <h1 className='text-[12px] font-semibold'>_________ بقایا رقم</h1>
            <h1 className='text-[12px] font-semibold'>_________ وصول شدہ رقم</h1>
            <h1 className='text-[12px] font-semibold'>_________ کل رقم</h1>
          </div>

          <div className='flex items-center mt-4'>
            <img src={kanchi} alt='kanchi' className='w-[20px] h-[20px]' />
            <h1 className='text-gray-300'> ---------------------------------------------------------------</h1>
          </div>

          <div className='flex items-center justify-center w-full'>
            <h2 className='font-semibold text-[32px]'>BRUNEI TAILOR & CLOTH HOUSE</h2>
          </div>
          <div className='flex items-center justify-between w-full border-b'>
            <div className='text-[10px] flex items-center font-semibold'>0336-9197612, 0316-1229990</div>
            <h1 className='text-[10px] flex gap-2 font-semibold'>
              Address: <span className='font-normal'>Lakki Gate Bilal Market Near Jafar Masjid Bannu</span>
            </h1>
          </div>
          <div className='grid grid-cols-2 gap-4 py-4 '>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Name / نام</h1>
              <h1 className='text-[12px]'>{data.name || '-'}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Number / نمبر</h1>
              <h1 className='text-[12px]'>{data.registerNumber || '-'}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Phone /موبائل نمبر</h1>
              <h1 className='text-[12px]'>{data.phoneNumber || '-'}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <h1 className='text-[12px] font-semibold'>Address / پتہ</h1>
              <h1 className='text-[12px]'>{data.address || '-'}</h1>
            </div>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <h1 className='text-[12px] font-semibold'>_________ سوٹ</h1>
            <h1 className='text-[12px] font-semibold'>_________ بقایا رقم</h1>
            <h1 className='text-[12px] font-semibold'>_________ وصول شدہ رقم</h1>
            <h1 className='text-[12px] font-semibold'>_________ کل رقم</h1>
          </div>

          <div className='border-b py-2'></div>

          <div className='w-full flex items-start justify-between'>
            <div className='w-1/2 py-4 flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Length / لمبائی :</h1>
                <h1 className='text-[12px]'>{data.length || '-'}</h1>
              </div>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Arm / بازو :</h1>
                <h1 className='text-[12px]'>{data.arm || '-'}</h1>
              </div>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Shoulder / تیرہ :</h1>
                <h1 className='text-[12px]'>{data.shoulder || '-'}</h1>
              </div>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Neck / گلہ :</h1>
                <h1 className='text-[12px]'>{data.neck || '-'}</h1>
              </div>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Chest / چھاتی :</h1>
                <h1 className='text-[12px]'>{data.chest || '-'}</h1>
              </div>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Width / گیرہ / چوڑائی :</h1>
                <h1 className='text-[12px]'>{data.width || '-'}</h1>
              </div>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Pant / شلوار :</h1>
                <h1 className='text-[12px]'>{data.pant || '-'}</h1>
              </div>
              <div className='flex items-center gap-2'>
                <h1 className='text-[12px] font-semibold'>Pancha / پانچہ :</h1>
                <h1 className='text-[12px]'>{data.pancha || '-'}</h1>
              </div>
            </div>

            <div className='w-1/2 py-4'>
              <div className='flex items-center gap-2 border-b pb-2'>
                {data.collarType && (
                  <>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>
                      {data.collarType === 'toPices' && 'ٹو پیس کلر'}
                      {data.collarType === 'halfBanGool' && 'ہاف بین گول'}
                      {data.collarType === 'halfBanNook' && 'ہاف بین نوکدار'}
                      {data.collarType === 'fullBanGool' && 'فول بین گول'}
                      {data.collarType === 'fullBanNook' && 'فول بین نوکدار'}
                    </h1>
                  </>
                )}
              </div>

              <div className='flex items-center gap-2 border-b py-2'>
                {data.patiType && (
                  <>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>
                      {data.patiType === 'upperPati' && 'اوپر پٹی'}
                      {data.patiType === 'sadaPati' && 'سادہ پٹی بیک صاف'}
                    </h1>
                  </>
                )}
              </div>

              <div className='flex items-center gap-2 border-b py-2'>
                {data.patiWidth && (
                  <>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>
                      {data.patiWidth === 'pati1inch' && 'پٹی ایک انچ'}
                      {data.patiWidth === 'patiSawa1inch' && 'پٹی سوا ایک انچ'}
                    </h1>
                  </>
                )}
              </div>

              <div className='flex items-center gap-2 border-b py-2'>
                {data.kafType && (
                  <>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>
                      {data.kafType === 'golKaf'
                        ? 'گول کف'
                        : data.kafType === 'katKaf'
                          ? 'کٹ کف'
                          : data.kafType === 'chorasKaf'
                            ? 'چورس کف'
                            : 'کف'}
                      {data.Kaf ? ` : ${data.Kaf}` : ''}
                    </h1>
                  </>
                )}
              </div>

              <div className='w-full flex items-center gap-2 border-b py-2'>
                {data.pocket && (
                  <div className='flex items-center gap-2'>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>سامنے پاکٹ</h1>
                  </div>
                )}
                {data.pocketType && (
                  <div className='flex items-center gap-2 ml-2'>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>
                      {data.pocketType === 'sidePocket' && 'سائیڈ پاکٹ'}
                      {data.pocketType === 'doubleSidePocket' && 'ڈبل سائیڈ پاکٹ'}
                    </h1>
                  </div>
                )}
              </div>

              <div className='w-full flex items-center gap-2 border-b py-2'>
                {data.chotaPlate && (
                  <div className='flex items-center gap-2 '>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>چھوٹا پلیٹ</h1>
                  </div>
                )}
                {data.GotyKeyBaghair && (
                  <div className='flex items-center gap-2 ml-2'>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>گوٹے کے بغیر</h1>
                  </div>
                )}
              </div>
              <div className='w-full flex items-center gap-2 border-b py-2'>
                {data.sehdaGhera && (
                  <div className='flex items-center gap-2 '>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>سیدہ گیرہ</h1>
                  </div>
                )}
                {data.golAsteen && (
                  <div className='flex items-center gap-2 ml-2'>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>گول استین</h1>
                  </div>
                )}
                {data.rangeenButton && (
                  <div className='flex items-center gap-2 ml-2'>
                    <Check className='' size={16} />
                    <h1 className='text-[12px] font-semibold'>رینگ بٹن</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 w-full mt-2'>
          <Button
            onClick={() => onClose?.()}
            className='w-1/2 h-12 rounded-sm cursor-pointer bg-red-500 hover:bg-red-500'
          >
            <X className='' size={20} />
            Close
          </Button>
          <Button
            onClick={handlePrint}
            className='w-1/2 h-12 rounded-sm cursor-pointer bg-green-500 hover:bg-green-500'
          >
            <PrinterIcon className='' size={20} />
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PrintRecord; */


