"use client";
import LoginPrompt from "@/components/LoginPrompt";
import { Button } from "@/components/ui/button";
import Coupon from "@/components/ui/Coupon";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { getCustomerCoupons } from "@/lib/api";
import { getRandomColor } from "@/lib/helperFunctions";
import { CUSTOMER_DATA } from "@/lib/storage";
import { Customer } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define interface for Floater details
interface Floater {
  _id: string;
  name: string;
  img: string;
  phone: string;
  address: string;
}

// Define interface for Coupon details
interface Coupon {
  _id: string;
  floaterID: Floater;
  category: string;
  offerTitle: string;
  validityCriteria: string;
  issuedTo: string[];
  isCouponActive: boolean;
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

// Define interface for the main Coupon Record
export interface CouponRecord {
  _id: string;
  couponID: Coupon;
  customerID: string;
  issuerID: string;
  floaterID: string;
  isAccepted: boolean;
  hasAskedRedemption: boolean;
  isRedeemed: boolean;
  createdAt: string;
  updatedAt: string;
  issuedOn: string;
}

const MyCoupons = () => {
  const [customer, setCustomer] = useState<Customer>();
  const [customerLoading, setCustomerLoading] = useState(true);

  // fetching from local storage
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

  // fetching from
  const [coupons, setCoupons] = useState<CouponRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dataFetch = async () => {
    if (customer) {
      try {
        const response = await getCustomerCoupons(customer?.phone);
        console.log("jvh,ctyxtgrxj");

        console.log(response.data);
        setCoupons(response.data.customer.coupons);
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

  const navigation = useRouter();

  function navigationhandler(coupon: CouponRecord) {
    navigation.push(`/redeem-coupon/${coupon._id}`);
  }

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
          coupons.map((coupon: CouponRecord, index: number) => (
            <div key={index} onClick={() => navigationhandler(coupon)}>
              <Coupon
                brandName={coupon.couponID.floaterID.name}
                ImgUrl={coupon.couponID.floaterID.img}
                offerText={coupon.couponID.offerTitle}
                Validity={coupon.couponID.validityCriteria}
                bgColor={getRandomColor()}
                className="hover:filter hover:brightness-110 hover:transition hover:scale-95"
              />
            </div>
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
