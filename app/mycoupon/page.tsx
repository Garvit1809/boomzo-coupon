"use client";
import React  from 'react'
import Coupon from '@/components/ui/Coupon';
import { getCustomerCoupons } from '@/lib/api'
import { useQuery } from 'react-query';

export default function Page() {
  // const userString = localStorage.getItem('validatedUser');
  // const user = userString ? JSON.parse(userString) : null;

  const getCoupons = async () => {
    try {
      const response = await getCustomerCoupons('');
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  const { data, isLoading } = useQuery({
    queryKey: ['GetCustomerCoupons'],
    queryFn: getCoupons
  });
  console.log(data, isLoading);

  // if (user === null) {
  //   return (
  //     <div>
  //       <h1 className='text-lg'>You dont Have a coupon Reqest</h1>
  //     </div>)
  // }
  return (
    <>
      <div>
        <div>
          <h1 className={`text-3xl font-bold text-center pb-4`}>My Coupons</h1>
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
