'use client';

import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/components/ui/button';
import { Manrope } from '@next/font/google';
import Image from 'next/image';
import Coupon from '@/components/ui/Coupon';
import { Copy, Download, Smartphone } from 'lucide-react';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
});

export default function Page() {
  const captureRef = useRef(null);

  // Handle download image
  const handleDownloadImage = async () => {
    if (captureRef.current === null) return;

    try {
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2, 
      });

      // Create a download link
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'screenshot.png';

      // For iOS, we simulate a click event to prompt download
      link.click();

    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  return (
    <div className="p-2">
      <div ref={captureRef} className="w-full border-2 px-2 bg-white border-black max-w-md rounded-xl">
        <div className="flex justify-center my-4 flex-col items-center">
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
          <h1 className={`font-bold text-2xl text-lime-500 text-center ${manrope.className}`}>
          Enjoy your coupon!
          </h1>
          <h1 className='text-center  font-bold text-xl  '>Kunal Shah</h1>
          <h1 className='text-center  font-bold  flex items-center gap-x-1 text-sm  bg-black p-1 px-2 rounded-md text-white  '> <Copy size={18} />Coupon Id #001 </h1>
          <h1 className='text-center  font-bold  flex gap-x-1 items-center py-3  '>Take a screenshot of this screen!<Smartphone size={20} /></h1>
          <Button className='bg-[#a2225a] p-4 font-bold text-lg my-5 flex gap-x-1 rounded-2xl items-center hover:bg-[#a2225a]/70 ' onClick={handleDownloadImage}>Download Coupon <Download size={20} /></Button>
        </div>
      </div>
    </div>
  );
}
