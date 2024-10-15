"use client";
import React from 'react';
import { Home, Ticket,  } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function AppBottomBar() {
  const router = useRouter();
  const currentPath = usePathname(); 

  return (
    <div className="fixed bottom-0 left-0 w-full border-t-2 drop-shadow-xl bg-pink-400/25 bg-white shadow-pink-500 border-pink-600 rounded-t-2xl">
      <div className="flex justify-center gap-x-14 items-center py-2">
        {/* Tab 1: Home */}
        <div
          onClick={() => router.push('/')}
          className={`flex flex-col hover:bg-pink-600/20 items-center p-1 px-4 rounded-2xl ${currentPath === '/' ? 'bg-pink-600/20' : 'bg-transparent'}`}
        >
          <Home className="w-6 h-6 text-pink-600" strokeWidth={`${currentPath === '/' ? 3 : 2}`} />
          <span className={`text-sm  text-pink-600 ${currentPath === '/' ? 'font-extrabold' : 'font-semibold'}`}>Home</span>
        </div>
        <div className="h-10 border-l-2 border-pink-600 mx-2"></div>
        {/* Tab 2: My Coupons */}
        <div
          onClick={() => router.push('/mycoupon')}
          className={`flex flex-col hover:bg-pink-600/20 items-center p-1 px-4 rounded-2xl ${currentPath === '/mycoupon' ? 'bg-pink-600/20' : 'bg-transparent'}`}
        >
          <Ticket className="w-6 h-6 text-pink-600"  strokeWidth={`${currentPath === '/mycoupon' ? 3 : 2}`}  />
          <span className={`text-sm  text-pink-600 ${currentPath === '/mycoupon' ? 'font-extrabold' : 'font-semibold'}`}>My Coupons</span>
        </div>
      </div>
    </div>
  );
}