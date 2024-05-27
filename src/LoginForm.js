import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './App.css'; 
import n from './assets/n.png';
import one from './assets/one.png';
import two from './assets/two.png';
import three from './assets/three.png';
import four from './assets/four.png';
import showImg from './assets/showImg.png';
import hideImg from './assets/hideImg.png';
import passshow from './assets/passshow.png';
import passhide from './assets/passhide.png';
import bg1 from './assets/bg1.png';
import bg2 from './assets/bg2.png';
import mailicon from './assets/mailicon.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!isEmailValid(e.target.value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setPasswordError('Please enter a password');
    } else {
      setPasswordError('');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    passwordRef.current.focus();
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const getEmoji = () => {
    if (passwordVisible) return showImg;
    if (passwordFocused) return hideImg;
    if (email.length === 0) return n;
    if (email.length < 15) return one;
    if (email.length < 20) return two;
    if (email.length < 28) return three;
    if (email.length < 35) return four;
    return four;
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = email.length > 0 && password.length > 0 && isEmailValid(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert('Login Successful');
    }
  };

  const { ref: bg1Ref, inView: bg1InView } = useInView();
  const { ref: bg2Ref, inView: bg2InView } = useInView();

  return (
    <div className="min-h-screen flex justify-center bg-[#A5A6F6]">
      <div className="bg-white pb-8 rounded-[14px] mt-[70px] shadow-lg w-[544px] relative h-[563px] grid gap- justify-center items-center lg:scale-100 md:scale-100 scale-90">
        <h1 className='text-center text-[#5D5FEF] text-[24px] font-bold'>Login</h1>
        <div className="text-6xl text-center relative">
          <div className="emoji">
            <img ref={bg1Ref} className='w-[157px] h-[143px] ml-[14px]' src={bg1InView ? bg1 : ''} alt='M' loading="lazy" />
            <img ref={bg2Ref} className='w-[186px] h-[127px] mt-[-133px] ml-[25px]' src={bg2InView ? bg2 : ''} alt='M' loading="lazy" />
            <img src={getEmoji()} alt="emoji" className="mt-[-118px] w-[108px] h-[108px] mx-auto" loading="lazy" />
          </div>
        </div>
        <form className="space-y-4 grid justify-center" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-[300px] px-3 pl-[20px] text-[#4D4D4D] text-[14px] font-semibold py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={handleEmailChange}
              ref={emailRef}
            />
            <img className='h-[24px] w-[24px] mt-[-32px] ml-[263px]' src={mailicon} alt='M' loading="lazy" />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 block w-[300px] px-3 pl-[20px] py-2 border text-[#4D4D4D] text-[14px] font-semibold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              ref={passwordRef}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {passwordVisible ? (
                <img className='h-[24px] w-[24px] mt-[22px]' src={passshow} alt='M' loading="lazy" />
              ) : (
                <img className='h-[24px] w-[24px] mt-[22px]' src={passhide} alt='M' loading="lazy" />
              )}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          <button
            type="submit"
            className={`w-full py-3 px-4 border border-transparent rounded-[8px] shadow-sm text-sm font-medium text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-[#A5A6F6]'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            disabled={!isFormValid}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
