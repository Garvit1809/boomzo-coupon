import { CalendarDays, Clock3, Phone, Ticket, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function CouponRequest() {
    return (
        <div className='p-2 '>
            <div className='w-full border-2 flex flex-col  px-4 border-black max-w-md rounded-xl'>
                <h1 className='text-center font-bold w-fit bg-black text-white mt-4  p-1 rounded-lg px-2 flex gap-x-2 items-center '><span><Ticket color='white' size={24} /></span>#001</h1>
                <h1 className='text-start font-bold text-xl pt-4 text-[#a2225a] '>Availed By</h1>
                <div className='flex justify-center gap-x-5'>
                    <ul>
                        <li className='flex gap-x-1 items-center py-1'><span><User /></span>Name</li>
                        <li className='flex gap-x-1 items-center py-1'><span><Phone /></span>Phone No.</li>
                        <li className='flex gap-x-1 items-center py-1'><span><CalendarDays /></span>Date</li>
                        <li className='flex gap-x-1 items-center py-1'><span><Clock3 /></span>Time</li>
                    </ul>
                    <ul>
                        <li className='py-1'>Kunal Shah</li>
                        <li className='py-1'>9876543210</li>
                        <li className='py-1'>10th Oct 24</li>
                        <li className='py-1'>9:11 p.m.</li>
                    </ul>
                    <div className='flex-shrink-0'>
                        <Image src='/logo.jpg' alt='img' width={130} height={130} className='rounded-full border-2 border-black p-1' />
                    </div>
                </div>
                <div className="action flex  mb-4 mt-2 gap-x-2">
                <button className=' w-fit p-2 bg-transparent border-2 font-bold text-green-600 flex justify-center rounded-2xl border-green-600'>Accept</button>
                <button className=' w-fit p-2 bg-transparent border-2 font-bold text-red-600 flex justify-center rounded-2xl border-red-600'>Reject</button>
                </div>
                
            </div>
        </div>
    )
}
