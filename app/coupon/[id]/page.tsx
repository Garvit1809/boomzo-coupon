"use client";
import { ChevronRight, MapPin, Phone, Store } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Manrope } from "next/font/google";
import { Button } from "@/components/ui/button";
import Coupon from "@/components/ui/Coupon";
import { useParams, useSearchParams } from "next/navigation";
import { couponsAvailedReqest, getCouponDetails } from "@/lib/api";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import CouponNotFound from "@/components/CouponNotFound";
import { CUSTOMER_DATA } from "@/lib/storage";
import { Coupontype, Customer } from "@/types/types";
import { toast } from "sonner";
import LoginPrompt from "@/components/LoginPrompt";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});
export default function Page() {
  // const navigate = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const vendor = searchParams.get("vendor") || "defaultVendor";

  const [customer, setCustomer] = useState<Customer>();
  // search for local storage customer data, if not, ask for login/signup. IF signup or logged in, then avail coupon
  function getCustomerData() {
    const customerData = localStorage.getItem(CUSTOMER_DATA);
    console.log(customerData);

    if (customerData) {
      const parsedData = JSON.parse(customerData);
      setCustomer(parsedData);
    }
  }

  useEffect(() => {
    getCustomerData();
  }, []);

  const [coupon, setcoupon] = useState<Coupontype>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dataFetch = async () => {
    try {
      const response = await getCouponDetails(vendor, id as string);
      setcoupon(response.data.coupon);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

  async function availCoupon() {
    if (customer && coupon) {
      await couponsAvailedReqest(
        customer?._id,
        coupon._id,
        vendor,
        coupon.floaterID._id
      )
        .then(({ data }) => {
          console.log(data);
          toast("Issue request sent to issuer!", {
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
          // navigate.push("/mycoupon");
          // navigate to my coupons pages or create a new page
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div
      className={` ${manrope.className} flex items-center justify-center flex-col pb-40 `}
    >
      {/* <h1 className="text-center font-bold texl-lg">Coupon View </h1> */}
      <div className="p-2 w-[95vw] flex items-center flex-col">
        <div className="flex justify-center w-[100%] mb-3">
          {isLoading ? (
            <CouponSkeleton />
          ) : coupon ? (
            <Coupon
              brandName={coupon.floaterID.name}
              ImgUrl={coupon.floaterID.img}
              offerText={coupon.offerTitle}
              Validity={coupon.validityCriteria}
              bgColor={"#FFD483"}
            />
          ) : (
            <div className="flex items-center justify-center flex-col pb-40 ">
              <CouponNotFound />
            </div>
          )}
        </div>
        {!isLoading && coupon && (
          <div className="w-full border-2  px-2 border-black max-w-md  rounded-xl ">
            <div className="flex items-center gap-x-2 px-2">
              <Store size={34} />
              <div className="flex  my-4 flex-col ">
                <h1 className={`font-bold  `}>{coupon?.floaterID?.name} </h1>
                <p className="text-gray-700">(Category - {coupon?.category})</p>
              </div>
            </div>
            <div className="flex items-center gap-x-2 px-2">
              <MapPin size={34} />
              <div className="flex  my-4 flex-col w-72 ">
                <p className="text-gray-700  underline">
                  {coupon?.floaterID?.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-2 px-1">
              <Image src={"/special.png"} alt="speac" width={50} height={50} />
              <div className="flex  my-4 flex-col w-80 ">
                <h1 className={`font-bold  `}>{coupon?.offerTitle}</h1>
                <p className="text-gray-700 text-sm text-nowrap">
                  {coupon?.validityCriteria}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-2 px-2">
              <Phone color="green" size={34} />
              <div className="flex  my-4 flex-col w-72 ">
                <p className="  font-bold ">
                  Store Number: +91 {coupon?.floaterID?.phone}
                </p>
              </div>
            </div>
            {/* avail logic */}
            {customer ? (
              <div className="flex items-center justify-center mb-4 gap-x-2 px-2">
                <Button
                  onClick={availCoupon}
                  size={"lg"}
                  className={`my-2 bg-[#a2225a] hover:bg-pink-600 hover:scale-95 hover:transition p-4 flex gap-x-2 ${manrope.className} rounded-2xl text-lg  font-bold`}
                >
                  {" "}
                  Avail Offer{" "}
                  <span className="bg-white rounded-full">
                    {" "}
                    <ChevronRight color="#a2225a" />
                  </span>
                </Button>
              </div>
            ) : (
              <div className="w-[100%] flex items-center justify-center mb-4">
                <LoginPrompt
                  triggerButton={
                    <div className="w-fit flex items-center justify-center gap-x-2 px-2">
                      <Button
                        size={"lg"}
                        className={`my-2 bg-[#a2225a] hover:bg-pink-600 hover:scale-95 hover:transition p-4 flex gap-x-2 ${manrope.className} rounded-2xl text-lg  font-bold`}
                      >
                        {" "}
                        Avail Offer{" "}
                        <span className="bg-white rounded-full">
                          {" "}
                          <ChevronRight color="#a2225a" />
                        </span>
                      </Button>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
