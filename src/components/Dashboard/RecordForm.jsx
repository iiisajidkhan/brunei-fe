import React, { useEffect, useState } from 'react';
import * as yup from 'yup'; // Import Yup for validation

// Shadcn Component
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { PrinterCheckIcon, Save, X } from 'lucide-react';

function RecordForm({ open, onClose, onPrint, onSubmit, initialData = {}, purpose }) {
  const [formData, setFormData] = useState({
    // Initialize all fields with proper defaults
    name: '',
    phoneNumber: '',
    address: '',
    length: '',
    arm: '',
    shoulder: '',
    neck: '',
    chest: '',
    width: '',
    pant: '',
    pancha: '',
    collarType: 'toPices',
    patiType: 'upperPati',
    patiWidth: 'pati1inch',
    pocket: false,
    pocketType: 'doubleSidePocket',
    chotaPlate: false,
    GotyKeyBaghair: false,
    sehdaGhera: false,
    golAsteen: false,
    rangeenButton: false,
    kafType: 'golKaf',
    Kaf: '',
  });

  const [errors, setErrors] = useState({});

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .required('Phone number is required'),
    address: yup.string().required('Address is required'),
    length: yup.number().typeError('Length must be a number').required(),
    arm: yup.number().typeError('Arm must be a number').required(),
    shoulder: yup.number().typeError('Shoulder must be a number').required(),
    neck: yup.number().typeError('Neck must be a number').required(),
    chest: yup.number().typeError('Chest must be a number').required(),
    width: yup.number().typeError('Width must be a number').required(),
    pant: yup.number().typeError('Pant must be a number').required(),
    pancha: yup.number().typeError('Pancha must be a number').required(),
    Kaf: yup.number().typeError('Kaf must be a number').required('Kaf is required'),
    collarType: yup.string().required(),
    patiType: yup.string().required(),
    patiWidth: yup.string().required(),
    pocket: yup.boolean(),
    // Make pocketType independent of pocket checkbox
    pocketType: yup.string().required('Pocket type is required'),
    chotaPlate: yup.boolean(),
    GotyKeyBaghair: yup.boolean(),
    sehdaGhera: yup.boolean(),
    golAsteen: yup.boolean(),
    rangeenButton: yup.boolean(),
    kafType: yup.string().required('Kaf type is required'),
  });

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    // Populate form with initialData if available
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prevData => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: '', // Clear error for the field being edited
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '', // Clear error for the field being edited
    }));
  };

  // Handle checkbox change to toggle boolean
  const handleCheckboxChange = (id, checked) => {
    setFormData(prev => ({
      ...prev,
      [id]: checked,
      // Remove the dependency between pocket and pocketType
    }));
  };

  // Submit handler ensures validation before submission
  const handleSubmitForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(formData); // Submit all data including defaults
    } catch (err) {
      const newErrors = {};
      if (err.inner && Array.isArray(err.inner)) {
        err.inner.forEach(e => {
          newErrors[e.path] = e.message;
        });
      } else {
        // Handle unexpected error structure
        console.error('Validation error:', err);
        newErrors.general = 'Form validation failed. Please check your entries.';
      }
      setErrors(newErrors);
    }
  };

  const handlePrintForm = () => {
    onPrint(formData);
  };

  if (!open) return null;

  return (
    <div onClick={() => onClose?.()} className='fixed inset-0 flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 bg-black/30'></div>
      <div
        onClick={e => e.stopPropagation()}
        className='relative w-full max-w-5xl h-full max-h-[760px] overflow-y-auto bg-white p-4 rounded'
      >
        <h1 className='font-semibold text-xl border-b pb-2'>
          {initialData && Object.keys(initialData).length > 0 ? 'Edit Customer' : 'Add Customer'}
        </h1>

        <div className='grid grid-cols-2 gap-4 border-b py-6'>
          {/* <div className='flex flex-col gap-2'>
            <Label htmlFor='registerNumber'>Register Number / رجسٹر نمبر</Label>
            <Input
              id='registerNumber'
              placeholder='Register Number'
              className='rounded'
              value={formData.registerNumber}
              onChange={handleChange}
            />
          </div> */}
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Name / نام </Label>
            <Input
              id='name'
              placeholder='Enter Name'
              className='rounded'
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='phoneNumber'>Phone /موبائل نمبر</Label>
            <Input
              id='phoneNumber'
              placeholder='Enter Phone Number'
              className='rounded'
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className='text-red-500 text-sm'>{errors.phoneNumber}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='address'>Address / پتہ </Label>
            <Input
              id='address'
              placeholder='Enter Address'
              className='rounded'
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className='text-red-500 text-sm'>{errors.address}</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 gap-4 border-b py-6'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='length'>Length / لمبائی</Label>
            <Input
              id='length'
              placeholder='Enter Length'
              className='rounded'
              value={formData.length}
              onChange={handleChange}
            />
            {errors.length && <p className='text-red-500 text-sm'>{errors.length}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='arm'>Arm / بازو</Label>
            <Input id='arm' placeholder='Enter Arm' className='rounded' value={formData.arm} onChange={handleChange} />
            {errors.arm && <p className='text-red-500 text-sm'>{errors.arm}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='shoulder'>Shoulder / تیرہ </Label>
            <Input
              id='shoulder'
              placeholder='Enter Shoulder'
              className='rounded'
              value={formData.shoulder}
              onChange={handleChange}
            />
            {errors.shoulder && <p className='text-red-500 text-sm'>{errors.shoulder}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='neck'>Neck / گلہ</Label>
            <Input
              id='neck'
              placeholder='Enter Neck'
              className='rounded'
              value={formData.neck}
              onChange={handleChange}
            />
            {errors.neck && <p className='text-red-500 text-sm'>{errors.neck}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='chest'>Chest / چھا تی </Label>
            <Input
              id='chest'
              placeholder='Register Chest'
              className='rounded'
              value={formData.chest}
              onChange={handleChange}
            />
            {errors.chest && <p className='text-red-500 text-sm'>{errors.chest}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='width'>Width / گیرہ / چوڑائی</Label>
            <Input
              id='width'
              placeholder='Enter Width'
              className='rounded'
              value={formData.width}
              onChange={handleChange}
            />
            {errors.width && <p className='text-red-500 text-sm'>{errors.width}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='pant'>Pant / شلوار</Label>
            <Input
              id='pant'
              placeholder='Enter Pant'
              className='rounded'
              value={formData.pant}
              onChange={handleChange}
            />
            {errors.pant && <p className='text-red-500 text-sm'>{errors.pant}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='pancha'>Pancha / پانچہ</Label>
            <Input
              id='pancha'
              placeholder='Enter Pancha'
              className='rounded'
              value={formData.pancha}
              onChange={handleChange}
            />
            {errors.pancha && <p className='text-red-500 text-sm'>{errors.pancha}</p>}
          </div>
        </div>

        <div className='grid grid-cols-4 gap-4 border-b py-6'>
          <div className='border-r'>
            <RadioGroup value={formData.collarType} onValueChange={value => handleRadioChange('collarType', value)}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='toPices' id='toPices' />
                <Label htmlFor='toPices'>ٹو پیس کلر</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='halfBanGool' id='halfBanGool' />
                <Label htmlFor='halfBanGool'>ہاف بین گول</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='halfBanNook' id='halfBanNook' />
                <Label htmlFor='halfBanNook'>ہاف بین نوکدار</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='fullBanGool' id='fullBanGool' />
                <Label htmlFor='fullBanGool'>فول بین گول</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='fullBanNook' id='fullBanNook' />
                <Label htmlFor='fullBanNook'>فول بین نوکدار</Label>
              </div>
            </RadioGroup>
            {errors.collarType && <p className='text-red-500 text-sm'>{errors.collarType}</p>}
          </div>

          <div className='border-r'>
            <RadioGroup value={formData.patiType} onValueChange={value => handleRadioChange('patiType', value)}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='upperPati' id='upperPati' />
                <Label htmlFor='upperPati'>اوپر پٹی</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='sadaPati' id='sadaPati' />
                <Label htmlFor='sadaPati'>سادہ پٹی بیک صاف</Label>
              </div>
            </RadioGroup>
            {errors.patiType && <p className='text-red-500 text-sm'>{errors.patiType}</p>}

            <div className='border-b w-[90%] my-4'></div>

            <RadioGroup value={formData.patiWidth} onValueChange={value => handleRadioChange('patiWidth', value)}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='pati1inch' id='pati1inch' />
                <Label htmlFor='pati1inch'>پٹی ایک انچ </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='patiSawa1inch' id='patiSawa1inch' />
                <Label htmlFor='patiSawa1inch'>پٹی سوا ایک انچ </Label>
              </div>
            </RadioGroup>
            {errors.patiWidth && <p className='text-red-500 text-sm'>{errors.patiWidth}</p>}
          </div>

          <div className='border-r'>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='pocket'
                checked={formData.pocket}
                onCheckedChange={checked => handleCheckboxChange('pocket', checked)}
              />
              <Label htmlFor='pocket'>سامنے پاکٹ</Label>
            </div>
            {errors.pocket && <p className='text-red-500 text-sm'>{errors.pocket}</p>}

            <div className='border-b w-[90%] my-2'></div>

            {/* Radio Group section for pocket type - make it independent */}
            <RadioGroup value={formData.pocketType} onValueChange={val => handleRadioChange('pocketType', val)}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='sidePocket' id='sidePocket' />
                <Label htmlFor='sidePocket'>سائیڈ پاکٹ</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='doubleSidePocket' id='doubleSidePocket' />
                <Label htmlFor='doubleSidePocket'>ڈبل سائیڈ پاکٹ</Label>
              </div>
            </RadioGroup>

            <div className='border-b w-[90%] my-2'></div>

            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='chotaPlate'
                  checked={formData.chotaPlate}
                  onCheckedChange={checked => handleCheckboxChange('chotaPlate', checked)}
                />
                <Label htmlFor='chotaPlate'>چھوٹا پلیٹ</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='GotyKeyBaghair'
                  checked={formData.GotyKeyBaghair}
                  onCheckedChange={checked => handleCheckboxChange('GotyKeyBaghair', checked)}
                />
                <Label htmlFor='GotyKeyBaghair'>گوٹے کے بغیر</Label>
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='sehdaGhera'
                  checked={formData.sehdaGhera}
                  onCheckedChange={checked => handleCheckboxChange('sehdaGhera', checked)}
                />
                <Label htmlFor='sehdaGhera'>سیدہ گیرہ</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='golAsteen'
                  checked={formData.golAsteen}
                  onCheckedChange={checked => handleCheckboxChange('golAsteen', checked)}
                />
                <Label htmlFor='golAsteen'>گول استین</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='rangeenButton'
                  checked={formData.rangeenButton}
                  onCheckedChange={checked => handleCheckboxChange('rangeenButton', checked)}
                />
                <Label htmlFor='rangeenButton'>رینگ بٹن</Label>
              </div>

              <div className='border-b w-[90%] my-2'></div>

              <RadioGroup value={formData.kafType} onValueChange={value => handleRadioChange('kafType', value)}>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='golKaf' id='golKaf' />
                  <Label htmlFor='golKaf'>گول کف</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='katKaf' id='katKaf' />
                  <Label htmlFor='katKaf'> کٹ کف</Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='chorasKaf' id='chorasKaf' />
                  <Label htmlFor='chorasKaf'>چورس کف</Label>
                </div>
              </RadioGroup>

              <div className='w-full mt-2'>
                <Input
                  id='Kaf'
                  placeholder='10'
                  className='h-8 w-28 rounded-[5px]'
                  value={formData.Kaf}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2 mt-2'>
          <Button
            onClick={() => onClose?.()}
            className='w-1/2 h-12 rounded-sm cursor-pointer bg-red-500 hover:bg-red-500'
          >
            <X className='' size={20} />
            Cancel
          </Button>
          {/* <Button
            onClick={handlePrintForm}
            className='w-1/3 h-12 rounded-sm cursor-pointer bg-green-500 hover:bg-green-500'
          >
            <PrinterCheckIcon className='' size={20} />
            Print & Save
          </Button> */}
          <Button
            onClick={handleSubmitForm}
            className='w-1/2 h-12 rounded-sm cursor-pointer bg-[#003049] hover:bg-[#003049]'
          >
            <Save className='' size={20} />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecordForm;
