import React, { useState } from 'react';
import loginImage from '../assets/svg/login_image.svg';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showToast } from '@/utils/Toast';
import Cookies from 'js-cookie';
import api from '@/api/api';

// Fields
const InputFields = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  isPassword,
  togglePasswordVisibility,
  passwordHide,
}) => {
  return (
    <div>
      <Label htmlFor={label} className='text-sm font-medium text-gray-900 dark:text-gray-300 mb-1'>
        {label}
      </Label>
      <div className='w-full relative'>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          className='w-full h-12 mr-4 '
        />
        {isPassword && (
          <div className='absolute right-4 top-3 text-gray-400 cursor-pointer' onClick={togglePasswordVisibility}>
            {passwordHide ? <EyeOff /> : <Eye />}
          </div>
        )}
      </div>
    </div>
  );
};

// Initial State
const INITIAL_STATE = {
  email: '',
  password: '',
  passwordHide: true,
  loading: false,
};

function Login() {
  const navigate = useNavigate();
  const [fields, setFields] = useState(INITIAL_STATE);

  const handleSubmit = async () => {
    if (fields.email === '' || fields.password === '') {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setFields(prevState => ({
      ...prevState,
      loading: true,
    }));

    try {
      const response = await api.post('/login', {
        email: fields.email,
        password: fields.password,
      });

      console.log(response);
      if (response.status === 200) {
        Cookies.set('token', response.data.token, { expires: 30 });
        showToast('Login successful', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error(error);

      showToast('Invalid email or password', 'error');
    } finally {
      setFields(prevState => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setFields(prevState => ({
      ...prevState,
      passwordHide: !prevState.passwordHide,
    }));
  };

  return (
    <div className='w-full h-screen bg-[#FAFAFA] overflow-hidden flex items-center justify-center gap-12 px-10'>
      <div className='hidden md:block w-1/2'>
        <img src={loginImage} alt='login_image' />
      </div>
      <div className='w-1/3 h-[60%] bg-[#FFFFFF] flex items-start justify-center flex-col gap-8 px-8 shadow rounded-xl'>
        <div className='flex flex-col gap-1 mt-4 '>
          <h1 className='text-2xl font-bold text-[#19191B]'>Welcome Back</h1>
          <p className='text-sm font-normal text-[#999BA1]'>Please Enter Your Email & Password</p>
        </div>
        <div className='w-full flex flex-col gap-4'>
          <InputFields
            label='Email'
            type='email'
            placeholder='Enter your email'
            onChange={e => setFields({ ...fields, email: e })}
            value={fields.email}
          />
          <InputFields
            label='Password'
            type={fields.passwordHide ? 'password' : 'text'}
            placeholder='Enter your password'
            isPassword={true}
            passwordHide={fields.passwordHide}
            togglePasswordVisibility={togglePasswordVisibility}
            onChange={e => setFields({ ...fields, password: e })}
            value={fields.password}
          />
        </div>

        <div className='w-full flex items-center justify-center'>
          <Button
            onClick={handleSubmit}
            className='w-full h-12 bg-[#003049] text-white font-semibold rounded-md hover:bg-[#003049] select-none'
          >
            {fields.loading ? (
              <div className='flex items-center justify-center'>
                <svg
                  className='animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full'
                  viewBox='0 0 24 24'
                ></svg>
              </div>
            ) : (
              'Login'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
