"use client";
import { ChevronRight, MapPin, Phone, Store } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Manrope } from 'next/font/google';
import { Button } from '@/components/ui/button';
import Coupon from '@/components/ui/Coupon';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import { getCouponDetails } from '@/lib/api';
import CouponSkeleton from '@/components/ui/CouponSkeleton';
import CouponNotFound from '@/components/CouponNotFound';

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['200', '400', '600', '800'], // Specify the weights you want to include
});
export default function Page() {
    const router = useRouter();
    const { id } = useParams();
    const searchParams = useSearchParams();
    const vendor = searchParams.get('vendor') || 'defaultVendor';
    console.log(vendor, id);
    const dataFetch = async () => {
        try {
            const response = await getCouponDetails(vendor, id as string);
            return response.data;
        } catch (error) {
            throw new Error(`Error in fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    const { isLoading, error, data } = useQuery({
        queryKey: ["GetDetails"],
        queryFn: dataFetch,
    });
    console.log(data, isLoading)
    const coupon = data?.coupon || {};

    if (error) {
        return (
            <div className='flex items-center justify-center flex-col pb-40 '>
                <CouponNotFound />
            </div>
        )
    }
    return (
        <div className={` ${manrope.className} flex items-center justify-center flex-col pb-40 `}>
            <h1 className='text-center font-bold texl-lg'>Coupon View </h1>
            <div className='p-2 w-[95vw] flex items-center flex-col'>
                <div className="flex justify-center mb-3" >
                    {
                        isLoading ? <CouponSkeleton /> : <Coupon
                            brandName={coupon.floaterID.name}
                            ImgUrl={coupon.floaterID.img}
                            CouponCount={"1"}
                            offerText={coupon.offerTitle}
                            Validity={coupon.validityCriteria}
                            bgColor={"#f99fb4"}

                        />
                    }
                </div>
                <div className='w-full border-2  px-2 border-black max-w-md  rounded-xl '>
                    <div className='flex items-center gap-x-2 px-2'>
                        <Store size={34} />
                        <div className='flex  my-4 flex-col '>
                            <h1 className={`font-bold  `}>{coupon?.floaterID?.name} </h1>
                            <p className='text-gray-700' >(Category - {coupon?.category})</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 px-2'>
                        <MapPin size={34} />
                        <div className='flex  my-4 flex-col w-72 '>
                            <p className='text-gray-700  underline' >{coupon?.floaterID?.address}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 px-1'>
                        <Image src={'/special.png'} alt='speac' width={50} height={50} />
                        <div className='flex  my-4 flex-col w-80 '>
                            <h1 className={`font-bold  `}>{coupon?.offerTitle}</h1>
                            <p className='text-gray-700 text-sm text-nowrap' >{coupon?.validityCriteria}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 px-2'>
                        <Phone  color='green' size={34} />
                        <div className='flex  my-4 flex-col w-72 '>
                            <p className='  font-bold ' >Store Number: +91 {coupon?.floaterID?.phone}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center mb-4 gap-x-2 px-2'>
                        <Button onClick={() => router.push(`/claimcoupon/${coupon._id}?vendor=${coupon.floaterID._id}`)} size={'lg'} className={`my-2 bg-[#a2225a] hover:bg-pink-600 hover:scale-95 hover:transition p-4 flex gap-x-2 ${manrope.className} rounded-2xl text-lg  font-bold`}> Avail Offer <span className='bg-white rounded-full'> <ChevronRight color='#a2225a' /></span></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
