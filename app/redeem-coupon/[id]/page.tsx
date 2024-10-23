"use client";
import { CouponRecord } from "@/app/mycoupon/page";
import CouponNotFound from "@/components/CouponNotFound";
import { Button } from "@/components/ui/button";
import Coupon from "@/components/ui/Coupon";
import CouponSkeleton from "@/components/ui/CouponSkeleton";
import { getIssuanceRequest, redeemCouponRequest } from "@/lib/api";
import { CUSTOMER_DATA } from "@/lib/storage";
import { Customer } from "@/types/types";
import { ChevronRight, MapPin, Phone, Store } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const RedeemCouponDetails = () => {
  const { id } = useParams();

  //   checking local storagecustomer data
  const [customer, setCustomer] = useState<Customer>();

  function getCustomerData() {
    const customerData = localStorage.getItem(CUSTOMER_DATA);
    if (customerData) {
      const parsedData = JSON.parse(customerData);
      setCustomer(parsedData);
    }
  }

  useEffect(() => {
    getCustomerData();
  }, []);

  //   getting coupons
  //   const [selectedCoupon, setSelectedCoupon] = useState<Coupontype>();
  const [issuanceLoading, setIssuanceLoading] = useState<boolean>(true);
  const [issuanceRequest, setIssuanceRequest] = useState<CouponRecord>();

  //   fetch issuance request instead of coupon
  async function fetchIssuance() {
    await getIssuanceRequest(id as string)
      .then(({ data }) => {
        console.log(data);
        setIssuanceRequest(data.issuanceRequest);
        setIssuanceLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIssuanceLoading(false);
      });
  }

  useEffect(() => {
    fetchIssuance();
  }, []);

  //   redeem request
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function redeemCouponHandler() {
    if (customer) {
      setIsLoading(true);
      await redeemCouponRequest(id as string)
        .then(({ data }) => {
          console.log(data);
          setIsLoading(false);
          toast("Redeem request sent to issuer!", {
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }

  return (
    <div
      className={`px-2 pt-2 w-[95vw] flex items-center justify-center flex-col pb-40 `}
    >
      <div className="flex justify-center w-[100%] mb-3">
        {issuanceLoading ? (
          <CouponSkeleton />
        ) : issuanceRequest ? (
          <Coupon
            brandName={issuanceRequest.couponID.floaterID.name}
            ImgUrl={issuanceRequest.couponID.floaterID.img}
            offerText={issuanceRequest.couponID.offerTitle}
            Validity={issuanceRequest.couponID.validityCriteria}
            bgColor={"#FFD483"}
          />
        ) : (
          <div className="flex items-center justify-center flex-col pb-40 ">
            <CouponNotFound />
          </div>
        )}
      </div>
      <div className="w-full border-2  px-2 border-black max-w-md  rounded-xl ">
        <div className="flex items-center gap-x-2 px-2">
          <Store size={34} />
          <div className="flex  my-4 flex-col ">
            <h1 className={`font-bold  `}>
              {issuanceRequest?.couponID.floaterID?.name}{" "}
            </h1>
            <p className="text-gray-700">
              (Category - {issuanceRequest?.couponID.category})
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 px-2">
          <MapPin size={34} />
          <div className="flex  my-4 flex-col w-72 ">
            <p className="text-gray-700  underline">
              {issuanceRequest?.couponID.floaterID?.address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 px-1">
          <Image src={"/special.png"} alt="speac" width={50} height={50} />
          <div className="flex  my-4 flex-col w-80 ">
            <h1 className={`font-bold  `}>
              {issuanceRequest?.couponID.offerTitle}
            </h1>
            <p className="text-gray-700 text-sm text-nowrap">
              {issuanceRequest?.couponID.validityCriteria}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2 px-2">
          <Phone color="green" size={34} />
          <div className="flex  my-4 flex-col w-72 ">
            <p className="  font-bold ">
              Store Number: +91 {issuanceRequest?.couponID.floaterID?.phone}
            </p>
          </div>
        </div>
        {/* avail logic */}
        {issuanceRequest?.hasAskedRedemption && !issuanceRequest.isRedeemed && (
          <Button
            onClick={redeemCouponHandler}
            disabled={isLoading}
            size={"lg"}
            className={` my-2 bg-[#a2225a] hover:bg-pink-600 hover:scale-95 hover:transition p-4 flex gap-x-2 rounded-2xl text-lg  font-bold`}
          >
            {" "}
            Redeem Offer{" "}
            <span className="bg-white rounded-full">
              {" "}
              <ChevronRight color="#a2225a" />
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default RedeemCouponDetails;
