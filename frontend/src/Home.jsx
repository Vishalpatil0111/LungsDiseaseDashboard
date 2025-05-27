import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import RightPanel from './RightPanel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { FaHeartbeat } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const formRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out', delay: 0.3 }
    );
  }, []);

  const onSubmit = async (data) => {
    const processed = {
      AGE: Number(data.AGE),
      GENDER: Number(data.GENDER),
      SMOKING: data.SMOKING ? 1 : 0,
      FINGER_DISCOLORATION: data.FINGER_DISCOLORATION ? 1 : 0,
      MENTAL_STRESS: data.MENTAL_STRESS ? 1 : 0,
      EXPOSURE_TO_POLLUTION: data.EXPOSURE_TO_POLLUTION ? 1 : 0,
      LONG_TERM_ILLNESS: data.LONG_TERM_ILLNESS ? 1 : 0,
      ENERGY_LEVEL: Number(data.ENERGY_LEVEL),
      IMMUNE_WEAKNESS: data.IMMUNE_WEAKNESS ? 1 : 0,
      BREATHING_ISSUE: data.BREATHING_ISSUE ? 1 : 0,
      ALCOHOL_CONSUMPTION: data.ALCOHOL_CONSUMPTION ? 1 : 0,
      THROAT_DISCOMFORT: data.THROAT_DISCOMFORT ? 1 : 0,
      OXYGEN_SATURATION: parseFloat(data.OXYGEN_SATURATION),
      CHEST_TIGHTNESS: data.CHEST_TIGHTNESS ? 1 : 0,
      FAMILY_HISTORY: data.FAMILY_HISTORY ? 1 : 0,
      SMOKING_FAMILY_HISTORY: data.SMOKING_FAMILY_HISTORY ? 1 : 0,
      STRESS_IMMUNE: Number(data.STRESS_IMMUNE),
      Name: data.Name || ''
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', processed);
      navigate('/dashboard', { state: { result: response.data, name: processed.Name } });
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col md:flex-row overflow-hidden bg-gradient-to-bl from-black via-gray-900 to-black relative'>
      <div className='absolute top-10 left-5 text-pink-500 text-4xl animate-pulse'>
        <FaHeartbeat />
      </div>

      <div className='md:w-1/2 w-full h-full overflow-y-auto p-6 md:p-10 text-white scrollbar-hide' ref={formRef}>
        <h1 ref={headingRef} className='text-4xl font-extrabold text-center mb-6 text-orange-400 tracking-wide'>
          Pulmonary Risk Prediction
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 bg-white/5 backdrop-blur p-6 rounded-lg shadow-lg'>
          <input {...register('Name')} type='text' placeholder='Full Name' className='w-full p-2 rounded bg-black/50 border border-zinc-600 text-white' />
          <input {...register('AGE', { required: true })} type='number' placeholder='Age' className='w-full p-2 rounded bg-black/50 border border-zinc-600 text-white' />

          <select {...register('GENDER', { required: true })} className='w-full p-2 rounded bg-black/50 border border-zinc-600 text-white'>
            <option value=''>Select Gender</option>
            <option value='0'>Male</option>
            <option value='1'>Female</option>
            <option value='2'>Other</option>
          </select>

          {["SMOKING", "FINGER_DISCOLORATION", "MENTAL_STRESS", "EXPOSURE_TO_POLLUTION", "LONG_TERM_ILLNESS", "IMMUNE_WEAKNESS", "BREATHING_ISSUE", "ALCOHOL_CONSUMPTION", "THROAT_DISCOMFORT", "CHEST_TIGHTNESS", "FAMILY_HISTORY", "SMOKING_FAMILY_HISTORY"].map((field) => (
            <label key={field} className='block text-sm'>
              <input type='checkbox' {...register(field)} className='mr-2' />
              {field.replace(/_/g, ' ')}
            </label>
          ))}

          <input {...register('ENERGY_LEVEL', { required: true })} type='number' placeholder='Energy Level (0–100)' className='w-full p-2 rounded bg-black/50 border border-zinc-600 text-white' />
          <input {...register('OXYGEN_SATURATION', { required: true })} type='number' step='0.01' placeholder='Oxygen Saturation (%)' className='w-full p-2 rounded bg-black/50 border border-zinc-600 text-white' />

          <select {...register('STRESS_IMMUNE', { required: true })} className='w-full p-2 rounded bg-black/50 border border-zinc-600 text-white'>
            <option value=''>Stress Immunity</option>
            <option value='0'>Weak</option>
            <option value='1'>Moderate</option>
            <option value='2'>Strong</option>
          </select>

          <button type='submit' className='w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'>
            Predict
          </button>
        </form>
      </div>

      <RightPanel />
    </div>
  );
}

export default Home;