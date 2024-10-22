"use client";
import LoginPrompt from "@/components/LoginPrompt";
import { Button } from "@/components/ui/button";
import Coupon from "@/components/ui/Coupon";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { getCustomerCoupons } from "@/lib/api";
import { getRandomColor } from "@/lib/helperFunctions";
import { CUSTOMER_DATA } from "@/lib/storage";
import { Coupontype, Customer } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyCoupons = () => {
  const [customer, setCustomer] = useState<Customer>();
  const [customerLoading, setCustomerLoading] = useState(true);

  function getCustomFromStorage() {
    const customerData = localStorage.getItem(CUSTOMER_DATA);
    console.log(customerData);

    if (customerData) {
      const parsedData = JSON.parse(customerData);
      setCustomer(parsedData);
    }
    setCustomerLoading(false);
  }

  useEffect(() => {
    getCustomFromStorage();
  }, []);

  const [coupons, setCoupons] = useState<Coupontype[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dataFetch = async () => {
    if (customer) {
      try {
        const response = await getCustomerCoupons(customer?.phone);
        setCoupons(response.data.coupon);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error(
          `Error in fetching data: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    }
  };

  useEffect(() => {
    dataFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  return !customerLoading ? (
    !customer ? (
      <div className="flex flex-col items-center pt-4 mx-auto gap-y-2 w-[90%]">
        <div>Please sign in to check your coupons</div>
        <LoginPrompt triggerButton={<Button>Login to account</Button>} />
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-center items-center w-[95vw] pt-6 mx-auto pb-40">
        {coupons && coupons.length == 0 ? (
          <div className="flex flex-col items-center pt-4 mx-auto gap-y-2 w-[90%]">
            <h1 className="pt-6 text-2xl font-boldx">No coupons issued yet</h1>
          </div>
        ) : (
          coupons.map((coupon: Coupontype, index: number) => (
            <Link
              href={`/coupon/${coupon._id}?vendor=${coupon.floaterID._id}`}
              className="flex justify-center "
              key={coupon._id}
            >
              <Coupon
                brandName={coupon.floaterID.name}
                ImgUrl={coupon.floaterID.img}
                CouponCount={`#${index}`}
                offerText={coupon.offerTitle}
                Validity={coupon.validityCriteria}
                bgColor={getRandomColor()}
                className="hover:filter hover:brightness-110 hover:transition hover:scale-95"
              />
            </Link>
          ))
        )}
        {isLoading && (
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
    )
  ) : null;
};

export default MyCoupons;
