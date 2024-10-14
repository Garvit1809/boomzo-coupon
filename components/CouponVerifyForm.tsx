import { BadgeAlert, ShieldCheck } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'

export default function CouponVerifyForm() {
    return (
        <div className='p-2 '>
            <div className='w-full border-2 flex flex-col justify-center items-center px-2 border-black max-w-md rounded-xl'>
                <h1 className='text-center font-bold text-2xl py-5 flex gap-x-2 items-center '><span><ShieldCheck color='green' size={40} /></span>Verify Your Coupon</h1>
                <div className="form flex flex-col justify-center items-center ">
                    <h1 className='text-center  font-bold '>Enter Customer’s Phone Number</h1>
                    <Input type="text" placeholder="Mobile Number" className='bg-gray-200 my-2  p-4 texl-xl rounded-2xl text-center py-4 w-60' />
                    <button className=' w-full mb-10 p-2 bg-transparent border-2 font-bold text-green-600 flex justify-center rounded-2xl border-green-600'>Verify</button>
                    <p className='flex gap-x-2 text-center pb-10 font-semibold text-red-600'><span><BadgeAlert color='red' /></span> This Is  space for  Error </p>
                </div>
            </div>
        </div>
    )
}
