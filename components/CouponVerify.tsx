"use client"
import React from 'react';
import Lottie from 'lottie-react';
import VerifyTickAnimation from '@/assets/verifyTickAnimation.json';
import { Ticket } from 'lucide-react';

export default function CouponVerify() {
 

  return (
    <div className='p-2 '>
      <div className='w-full border-2 flex flex-col items-center px-2 border-black max-w-md rounded-xl'>
       <div className='w-32 h-32 pt-4'>
       <Lottie animationData={VerifyTickAnimation} loop={true}  />
       </div>
        <div className='pt-10 flex flex-col justify-center'>
        <h1 className='text-center  font-bold text-xl  bg-black p-1 text-white rounded-2xl '>Coupon code #001</h1>
          <h1 className='text-center font-bold text-4xl py-5 flex gap-x-2 items-center '><span><Ticket size={40} /></span>Coupon Verify</h1>
          <h1 className='text-center font-bold text-xl text-[#a2225a] '>Availed By</h1>
          <h1 className='text-center  font-bold text-3xl  '>Kunal Shah</h1>
          <h1 className='text-center  font-bold text-xl  '>9876543210</h1>
          <h1 className='text-center  font-bold text-xl text-gray-600  pb-5'>Valid till - 10th Dec 2024</h1>
          <div className=' mb-10 p-2 bg-transparent border-2 font-bold text-green-600 flex justify-center rounded-2xl border-green-600'>Successful Redeemed!</div>
        </div>
      </div>
    </div>
  );
}

