import React from 'react'
import Image from 'next/image';

export default function Bannner() {
    return (
        <div className=''>
            <div style={{
                backgroundImage: "url('/bg.jpg')",
            }}
                className="Banner  h-56 w-full bg-top bg-no-repeat bg-cover mb-4 flex justify-center items-center bg-gradient-to-r rounded-b-2xl from-rose-400 to-red-500">
                <Image src='/bgart.gif' className='relative  bottom-0 overflow-hidden' height={400} width={300} alt={'logo'} />
            </div>
        </div>
    )
}
