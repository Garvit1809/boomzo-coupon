import React from 'react'
import CouponRequest from '@/components/CouponRequest';
import { Manrope } from 'next/font/google';
// import Coupon from '@/components/ui/Coupon'
// import CouponNotFound from '@/components/CouponNotFound';
// import CouponVerify from '@/components/CouponVerify';
// import CouponVerifyForm from '@/components/CouponVerifyForm';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'], 
});

export default function page() {
  return (
    <>
    <div >
        <div>
            <h1 className={`text-3xl font-bold text-center ${manrope.className} pb-4`}>My Coupons</h1>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
          <div className="flex justify-center">
            <Coupon
              brandName="The Raymond shop"
              bgColor="#f9c3c4"
              offerText="100% off"
              Validity="Valid till 31st Dec"
              CouponCount="001"
              ImgUrl="/logo.jpg"
            />
          </div>
        </div> */}
         <CouponRequest />
    </div>
    </>
  )
}
