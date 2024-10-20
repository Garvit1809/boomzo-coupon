"use client";
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, Copy, Smartphone } from 'lucide-react';
import { useQuery } from 'react-query';
import { couponsAvailedReqest, signUp } from '@/lib/api'; 
import Image from 'next/image';
import Coupon from '@/components/ui/Coupon';

const SuccessComponent = () => {
  const userString = localStorage.getItem('validatedUser');
  const user = userString ? JSON.parse(userString) : null;


  return (
    <div className='flex justify-center items-center flex-col'>
      <h1 className='text-2xl font-bold text-green-500'>Validation Successful!</h1>
      <p className='text-gray-700'>Your coupon is ready for use!</p>
      <div className="flex justify-center my-4 flex-col items-center mx-4">
          <Coupon
            brandName="The Raymond"
            bgColor="#f99fb4"
            offerText="100% off"
            Validity="Valid till 31st Dec"
            CouponCount="001"
            ImgUrl="/logo.jpg"
          />
          <Image
            src="/congrats.png"
            alt="special"
            className="overflow-visible"
            width={300}
            height={200}
          />
          <h1 className={`font-bold text-2xl text-lime-500 text-center`}>
          Enjoy your coupon!
          </h1>
          <h1 className='text-center  font-bold text-xl uppercase  '>{user?.name}</h1>
          <h1 className='text-center  font-bold  flex items-center gap-x-1 text-sm  bg-black p-1 px-2 rounded-md text-white  '> <Copy size={18} />Coupon Id #001 </h1>
          <h1 className='text-center  font-bold  flex gap-x-1 items-center py-3  '>Take a screenshot of this screen!<Smartphone size={20} /></h1>
        </div>
    </div>
  );
};

export default function Page() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const vendor = searchParams.get('vendor') || 'defaultVendor';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidated, setIsValidated] = useState(false); 
  const dataFetch = async () => {
    try {
      const response = await signUp(name, phone);
      return response.data; 
    } catch (error) {
      throw new Error(`Error in fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }


  const { isLoading, data, isError, refetch } = useQuery(
    ["SignUp", name, phone],
    dataFetch,
    {
      enabled: false,
      onSuccess: async (data) => { 
        const issuerId =  localStorage.getItem('IssuerId');
        console.log(data)
        const res =  await couponsAvailedReqest(data._id, id,issuerId, vendor )
        localStorage.setItem('validatedUser', JSON.stringify(data));
        if(res.status === 200){
          setIsValidated(true); 
        }
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault(); 
    refetch(); 
  };

  return (
    <div className="p-2 flex justify-center pb-40 mx-auto w-full ">
      <div className=''>
        <div className='w-[95vw] border-2 px-2 border-black max-w-md rounded-xl'>  
          {!isValidated ? (<>
          <div className='flex justify-center my-4 flex-col items-center'>
            <h1 className={`font-bold text-2xl text-center`}>Verify Your Details</h1>
            <p className='text-gray-700'>Yep, Coupon Almost Yours!!!</p>
          </div>        
            <form onSubmit={handleSubmit} className='flex justify-center flex-col items-center'>
              <Input
                type="text"
                placeholder="Enter Your Name"
                className='bg-gray-200 my-2 rounded-2xl text-center py-4 w-60'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Enter Your 10 Digit Phone Number"
                className='bg-gray-200 my-2 rounded-2xl px-2 text-center py-4 w-[90%]'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button type="submit" className={`my-2 bg-[#a2225a] py-4 flex gap-x-2 rounded-2xl text-lg font-bold`}>
                Validate <span className='bg-white rounded-full'><ChevronRight color='#a2225a'/></span>
              </Button>
              {isLoading && <p className="text-gray-500">Validating...</p>}
              {isError && <p className="text-red-500">An error occurred. Please try again.</p>}
              {data && <p className="text-green-500">Please wait! Your coupon is almost ready.</p>}
              <h1 className='text-gray-700 my-2 text-center'>Ask your Vendor for your Registration & Try Again.</h1>
            </form>
            </>) : (
            <SuccessComponent /> 
              )}
        </div>
      </div>
    </div>
  );
}
