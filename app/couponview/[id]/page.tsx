"use client";
import { BadgeCheckIcon, ChevronRight, Info, MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Manrope } from '@next/font/google';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import Coupon from '@/components/ui/Coupon';
import { coupons } from '@/data/coupons';
import { useRouter } from 'next/navigation'

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['200', '400', '600', '800'], // Specify the weights you want to include
});
export default function Page() {
    const router = useRouter()
    const { id } = useParams();
    const coupon = coupons.find(c => c.couponId === id);

    if (!coupon) {
        return <h1 className="text-center">Coupon not found</h1>;
    }
    return (
        <div className={` ${manrope.className} flex items-center flex-col pb-40 `}>
            <h1 className='text-center font-bold texl-lg'>Coupon View {id}</h1>
            <div className='p-2 w-[95vw]'>
                {/* <Coupon /> */}
                <div className="flex justify-center mb-3" key={coupon.couponId}>
                    <Coupon
                        brandName={coupon.brandName}
                        ImgUrl={coupon.ImgUrl}
                        CouponCount={coupon.CouponCount}
                        offerText={coupon.offerText}
                        Validity={coupon.Validity}
                        bgColor={coupon.bgColor}

                    />
                </div>
                <div className='w-full border-2  px-2 border-black max-w-md  rounded-xl '>
                    <div className='flex items-center gap-x-2 px-2'>
                        <Info size={34} />
                        <div className='flex  my-4 flex-col '>
                            <h1 className={`font-bold  `}>Serving Good Food  & Good Mood </h1>
                            <p className='text-gray-700' >(Brewbakes Cafe - Restaurant/Cafe)</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 px-2'>
                        <MapPin size={34} />
                        <div className='flex  my-4 flex-col w-72 '>
                            <p className='text-gray-700  underline' >Ghandhi Eye Hospital, V Mart In front, NKRV complex, Ramghat Rd, Aligarh</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 px-1'>
                        <Image src={'/special.png'} alt='speac' width={50} height={50} />
                        <div className='flex  my-4 flex-col w-80 '>
                            <h1 className={`font-bold  `}>{coupon.offerText}</h1>
                            <p className='text-gray-700 text-sm text-nowrap' >(Valid on bill above ₹5000 at BrewBakes Cafe)</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 px-2'>
                        <BadgeCheckIcon color='green' size={34} />
                        <div className='flex  my-4 flex-col w-72 '>
                            <p className='  font-bold ' >Use by {coupon.Validity}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center mb-4 gap-x-2 px-2'>
                        <Button size={'lg'} onClick={() => router.push(`/claimcoupon`)} className={`my-2 bg-[#a2225a] hover:bg-pink-600 hover:scale-95 hover:transition p-4 flex gap-x-2 ${manrope.className} rounded-2xl text-lg  font-bold`}> Avail Offer <span className='bg-white rounded-full'> <ChevronRight color='#a2225a' /></span></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
