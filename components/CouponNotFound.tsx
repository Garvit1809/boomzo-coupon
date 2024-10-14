"use client"
import React from 'react';
import Lottie from 'lottie-react';
import ErrorAnimation from '@/assets/errorAnimation.json';
import { Ticket } from 'lucide-react';

export default function CouponNotFound() {
 

  return (
    <div className='p-2 '>
      <div className='w-full border-2 flex flex-col items-center px-2 border-black max-w-md rounded-xl'>
       <div className='w-28 h-28 pt-4'>
       <Lottie animationData={ErrorAnimation} loop={true}  />
       </div>
        <div className='pt-10'>
          <h1 className='text-center font-bold text-4xl py-5 flex gap-x-2 items-center '><span><Ticket size={40} /></span>Coupon not valid!</h1>
          <h1 className='text-center font-bold text-xl '>Reason</h1>
          <h1 className='text-center text-gray-600 text-xl  pb-10'>(Invaild Person/Coupon Expired)</h1>
        </div>
      </div>
    </div>
  );
}

