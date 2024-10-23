"use client";
import Coupon from "@/components/ui/Coupon";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { getCouponsbyScan } from "@/lib/api";
import { getRandomColor } from "@/lib/helperFunctions";
import { Coupontype, Vendor } from "@/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  return (
    <main className="w-full mx-auto">
      <CouponsList />
    </main>
  );
}

// filters code
// const [selectedTags, setSelectedTags] = useState<string[]>([]);
// const handleTagClick = (tagName: string) => {
//   setSelectedTags((prev) =>
//     prev.includes(tagName) ? prev.filter((tag) => tag !== tagName) : [...prev, tagName]
//   );
// };

const CouponsList = () => {
  const { id } = useParams();

  const [coupons, setCoupons] = useState<Coupontype[]>([]);
  const [issuer, setIssuer] = useState<Vendor>();
  const [loading, setLoading] = useState(true);

  const dataFetch = async () => {
    try {
      const response = await getCouponsbyScan(id as string);
      localStorage.setItem("IssuerId", JSON.stringify(id));
      setCoupons(response.data.coupons);
      setIssuer(response.data.vendor);
      setLoading(false);
    } catch (error) {
      throw new Error(
        `Error in fetching data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  // const { isLoading, data } = useQuery({
  //   queryKey: ["GetAllCoupons"],
  //   queryFn: dataFetch,
  // });

  // const coupons = data?.coupons || [];

  return (
    <>
      {/* filters */}
      {/* <div className="filter tag">
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
        </div> */}
      {issuer && (
        <div className="w-[90%] mx-auto text-center flex justify-center">
          <h1 className="text-xl font-semibold">
            {issuer?.name}&apos;s Coupons
          </h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center w-[95vw] pt-6 mx-auto pb-40">
        {coupons &&
          coupons.map((coupon: Coupontype, index: number) => (
            <Link
              href={`/coupon/${coupon._id}?vendor=${coupon.floaterID._id}`}
              className="flex justify-center "
              key={index}
            >
              <Coupon
                brandName={coupon.floaterID.name}
                ImgUrl={coupon.floaterID.img}
                offerText={coupon.offerTitle}
                Validity={coupon.validityCriteria}
                bgColor={getRandomColor()}
                className="hover:filter hover:brightness-110 hover:transition hover:scale-95"
              />
            </Link>
          ))}
        {loading && (
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
        )}
      </div>
    </>
  );
};
