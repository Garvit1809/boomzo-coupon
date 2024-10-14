"use client";
import { useState } from "react";
// import DeatailsForm from "@/components/DeatailsForm";
import Coupon from "@/components/ui/Coupon";
import {
  GalleryHorizontalEnd,
  HeartPulse,
  Menu,
  Shirt,
  ShoppingCart,
  TicketsPlane,
  UtensilsCrossed,
  WashingMachine,
} from "lucide-react";
import { coupons } from "@/data/coupons";
import Link from "next/link";


interface FilterItem {
  name: string;
  bgColor: string;
  Icon: JSX.Element;
}

const Home: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filter: FilterItem[] = [
    {
      name: "All",
      bgColor: "#a2225a",
      Icon: <GalleryHorizontalEnd size={24} />,
    },
    {
      name: "Fashion",
      bgColor: "#a2225a",
      Icon: <Shirt size={24} />,
    },
    {
      name: "Electronics",
      bgColor: "#a2225a",
      Icon: <WashingMachine size={24} />,
    },
    {
      name: "Grocery",
      bgColor: "#a2225a",
      Icon: <ShoppingCart size={24} />,
    },
    {
      name: "Health",
      bgColor: "#a2225a",
      Icon: <HeartPulse size={24} />,
    },
    {
      name: "Travel",
      bgColor: "#a2225a",
      Icon: <TicketsPlane size={24} />,
    },
    {
      name: "Food",
      bgColor: "#a2225a",
      Icon: <UtensilsCrossed size={24} />,
    },
    {
      name: "Others",
      bgColor: "#a2225a",
      Icon: <Menu size={24} />,
    },
  ];

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
                  className={`filter-tag p-2 px-4 flex gap-x-1 font-bold text-[#ffdf29] border-2 border-[#932c2b] rounded-3xl cursor-pointer `}
                  style={{
                    backgroundColor: isSelected ? "#932c2b" : "#a2225a",
                  }}
                  onClick={() => handleTagClick(item.name)}
                >
                  <span className="text-[#ffdf29]">{item.Icon}</span>
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center w-[95vw] pt-6 mx-auto pb-40">
          {coupons.map((coupon) => (
            <Link href={`/couponview/${coupon.couponId}`} className="flex justify-center" key={coupon.couponId}>
              <Coupon
                brandName={coupon.brandName}
                ImgUrl={coupon.ImgUrl}
                CouponCount={coupon.CouponCount}
                offerText={coupon.offerText}
                Validity={coupon.Validity}
                bgColor={coupon.bgColor}

              />
            </Link>
          ))}
        </div>
        {/* <DeatailsForm /> */}
      </main>
    </div>
  );
};

export default Home;
