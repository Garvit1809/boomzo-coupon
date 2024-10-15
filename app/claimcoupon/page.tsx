import React from 'react';
import Image from 'next/image';
import Coupon from '@/components/ui/Coupon';
import { Copy, Smartphone } from 'lucide-react';

export default function Page() {
  return (
    <div className="p-2 flex justify-center pb-40 mx-auto w-[95vw]">
      <div  className="w-full border-2 px-2 bg-white border-black max-w-md rounded-xl">
        <div className="flex justify-center my-4 flex-col items-center mx-4">
          <Coupon
            brandName="The Raymond shop"
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
          <h1 className='text-center  font-bold text-xl  '>Kunal Shah</h1>
          <h1 className='text-center  font-bold  flex items-center gap-x-1 text-sm  bg-black p-1 px-2 rounded-md text-white  '> <Copy size={18} />Coupon Id #001 </h1>
          <h1 className='text-center  font-bold  flex gap-x-1 items-center py-3  '>Take a screenshot of this screen!<Smartphone size={20} /></h1>
        </div>
      </div>
    </div>
  );
}
