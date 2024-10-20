"use client";
import React  from 'react'
import { Manrope } from 'next/font/google';
import Coupon from '@/components/ui/Coupon';


const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
});

export default function page() {
  const userString = localStorage.getItem('validatedUser');
  const user = userString ? JSON.parse(userString) : null;
  console.log(user)

  if (user === null) {
    return (
      <div>
        <h1 className='text-lg'>You dont Have a coupon Reqest</h1>
      </div>)
  }
  return (
    <>
      <div>
        <div>
          <h1 className={`text-3xl font-bold text-center ${manrope.className} pb-4`}>My Coupons</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
          <div className="flex justify-center">
            <Coupon
              brandName="The Raymond "
              bgColor="#f9c3c4"
              offerText="100% off"
              Validity="Valid till 31st Dec"
              CouponCount="001"
              ImgUrl="/logo.jpg"
            />
          </div>
        </div>

      </div>
    </>
  )
}
