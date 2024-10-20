"use client";
import { useState } from "react";
// import DeatailsForm from "@/components/DeatailsForm";
import Coupon from "@/components/ui/Coupon";
import Link from "next/link";
import { filter } from "@/data/filter-data";
// import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { getCouponsbyScan } from "@/lib/api";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { Coupontype } from "@/types/app";
import { useQuery } from "react-query";


const Home: React.FC = () => {
  const baseURL = process.env.BACKEND_BASE_URL_DEV
  console.log(baseURL)
  return (
    <div>
        <main className="w-full mx-auto">
          <CouponsList />
        </main>
    </div>
  );
};

export default Home;

const CouponsList = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [loding, setLoding] = useState<boolean>(true);
  const handleTagClick = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]
    );
  };
  const dataFetch = async () => {
    try {
      const response = await getCouponsbyScan('67124e1dbfea585abfc7a8bb'); 
      localStorage.setItem('IssuerId', JSON.stringify(response.data.coupons[0].floaterID._id));
      return response.data;
    } catch (error) {
      throw new Error(`Error in fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  const { isLoading, data } = useQuery({
    queryKey: ["GetAllCoupons"],
    queryFn: dataFetch,
  });
  const coupons = data?.coupons || [];
  console.log(coupons)

  return (
    <>
      <div className="filter tag">
        <div className="flex justify-start md:justify-center gap-x-2 overflow-x-scroll py-2  px-3">
          {filter.map((item, index) => {
            const isSelected = selectedTags.includes(item.name);
            return (
              <div
                key={index}
                className={`filter-tag p-2 px-4 flex gap-x-1 font-semibold text-pink-600 border-2 border-pink-600 pb-2 rounded-3xl cursor-pointer ${isSelected ? "bg-pink-600 text-white" : "bg-pink-600/20"} hover:scale-95  `}
                onClick={() => handleTagClick(item.name)}
              >
                <span className={`text-pink-600 ${isSelected ? "text-white" : " "} `}>{item.Icon}</span>
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center w-[95vw] pt-6 mx-auto pb-40">
        {coupons && coupons.map((coupon: Coupontype) => (
          <Link href={`/couponview/${coupon._id}?vendor=${coupon.floaterID._id}`} className="flex justify-center " key={coupon._id}>
            <Coupon
              brandName={coupon.floaterID.name}
              ImgUrl={coupon.floaterID.img}
              CouponCount={"1"}
              offerText={coupon.offerTitle}
              Validity={coupon.validityCriteria}
              bgColor={"#f99fb4"}
              className="hover:filter hover:brightness-110 hover:transition hover:scale-95"

            />
          </Link>
        ))}
        {isLoading &&
          <>
            <div className="flex justify-center items-center px-5 ">
              <CouponSkeleton />
            </div>
            <div className="flex justify-center items-center px-5 ">
              <CouponSkeleton />
            </div>
            <div className="flex justify-center items-center px-5 ">
              <CouponSkeleton />
            </div>
          </>
        }
      </div>
    </>
  )
}