import React from 'react';
import { Home, Ticket } from 'lucide-react';
import Link from 'next/link';

export default function AppBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full  border-t-2 drop-shadow-xl bg-pink-400/25 bg-white shadow-pink-500 border-pink-600 rounded-t-2xl">
      <div className="flex justify-center gap-x-14 items-center  py-2">
        {/* Tab 1: Home */}
        <Link href={'/'} className="flex flex-col items-center">
          <Home className="w-6 h-6 text-pink-600 " />
          <span className="text-sm font-bold text-pink-600">Home</span>
        </Link>
        <div className='h-10 border-l-2 border-pink-600 mx-2'></div>
        {/* Tab 2: User */}
        <Link href={'/mycoupon'} className="flex flex-col  items-center">
          <Ticket  className="w-6 h-6 text-pink-600 " />
          <span className="text-sm font-bold text-pink-600">My Coupans</span>
        </Link>
      </div>
    </div>
  );
}
