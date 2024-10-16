"use client";
import { useState } from "react";
// import DeatailsForm from "@/components/DeatailsForm";
import Coupon from "@/components/ui/Coupon";
import { coupons } from "@/data/coupons";
import Link from "next/link";
import { filter } from "@/data/filter-data";
// import CouponSkeleton from "@/components/ui/CouponSkeleton";


const Home: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [loding, setLoding] = useState<boolean>(true);
  const handleTagClick = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]
    );
  };

  return (
    <div>
      <main className="w-full mx-auto">
        {/* Filter Tag */}
        <div className="filter tag">
          <div className="flex justify-start md:justify-center gap-x-2 overflow-x-scroll py-2  px-3">
            {filter.map((item, index) => {
              const isSelected = selectedTags.includes(item.name);
              return (
                <div
                  key={index}
                  className={`filter-tag p-2 px-4 flex gap-x-1 font-semibold text-pink-600 border-2 border-pink-600 pb-2 rounded-3xl cursor-pointer ${isSelected? "bg-pink-600/10": "bg-pink-600/20" } hover:scale-95  `}
                  onClick={() => handleTagClick(item.name)}
                >
                  <span className="text-pink-600">{item.Icon}</span>
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center w-[95vw] pt-6 mx-auto pb-40">
          {coupons.map((coupon) => (
            <Link href={`/couponview/${coupon.couponId}`} className="flex justify-center " key={coupon.couponId}>
              <Coupon
                brandName={coupon.brandName}
                ImgUrl={coupon.ImgUrl}
                CouponCount={coupon.CouponCount}
                offerText={coupon.offerText}
                Validity={coupon.Validity}
                bgColor={coupon.bgColor}
                className="hover:filter hover:brightness-110 hover:transition hover:scale-95"

              />
            </Link>
          ))}
          {/* {loding &&
            <>
            <div onClick={()=> setLoding(false)} className="flex justify-center items-center px-5 ">
              <CouponSkeleton />
            </div>
             <div className="flex justify-center items-center px-5 ">
             <CouponSkeleton />
           </div>
            <div className="flex justify-center items-center px-5 ">
            <CouponSkeleton />
          </div>
            </>
          } */}
        </div>
          
      </main>
    </div>
  );
};

export default Home;
