import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { ChevronRight } from "lucide-react";


export default function DeatailsForm() {
  return (
   <div className='p-2'>
     <div className='w-full border-2  px-2 border-black max-w-md  rounded-xl '>
     <div className='flex justify-center my-4 flex-col items-center'>
     <h1 className={`font-bold text-2xl  text-center  `}>Verify Your Deatails</h1>
     <p className='text-gray-700' >Yepp, Coupon Almost Yours!!!</p>
     </div>
        <form action="" className='flex justify-center flex-col items-center '>
            <Input type="text" placeholder="Enter Your Name" className='bg-gray-200 my-2 rounded-2xl text-center py-4 w-60' />
            <Input type="text" placeholder="Enter Your 10 Digit Phone Number" className='bg-gray-200 my-2 rounded-2xl text-center py-4 w-60' />
            <Button className={`my-2 bg-[#a2225a] py-4 flex gap-x-2  rounded-2xl text-lg  font-bold`}> Validate <span className='bg-white rounded-full'> <ChevronRight  color='#a2225a'/></span></Button>
            <h1 className='text-gray-700 my-2 text-center text-pretty' >Ask your Vendor for your Registration
            & Try Again.</h1>
        </form>
        
    </div>
   </div>
  )
}
