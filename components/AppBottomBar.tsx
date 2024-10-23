"use client";
import React, { useEffect, useState } from "react";
import { Home, Ticket } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function AppBottomBar() {
  const router = useRouter();
  const currentPath = usePathname();
  const [vendorID, setVendorID] = useState("");

  // Retrieve vendor ID from local storage
  useEffect(() => {
    const storedVendorID = localStorage.getItem("IssuerId");
    if (storedVendorID) {
      console.log(storedVendorID);

      setVendorID(JSON.parse(storedVendorID));
    }
  }, [localStorage.getItem("IssuerId")]);

  // Hide bottom bar on the login page
  if (currentPath === "/login") return null;

  return (
    <div className="fixed bottom-0 left-0 w-full border-t-2 drop-shadow-xl bg-pink-400/25 bg-white shadow-pink-500 border-pink-600 rounded-t-2xl">
      <div className="flex justify-center gap-x-14 items-center py-2">
        {/* Tab 1: Home */}
        <div
          onClick={() => router.push(`/vendor/${vendorID}`)}
          className={`relative flex flex-col pb-2 items-center p-1 px-3 gap-y-1 rounded-2xl`}
        >
          <div
            className={`w-14 h-8 rounded-full flex items-center justify-center ${
              currentPath === `/vendor/${vendorID}`
                ? "bg-pink-600/20"
                : "bg-transparent"
            }`}
          >
            <Home
              strokeWidth={`${currentPath === `/vendor/${vendorID}` ? 3 : 2}`}
              className={`w-6 h-6 text-pink-600`}
            />
          </div>
          <span
            className={`text-xs text-pink-600 leading-none text-center ${
              currentPath === `/vendor/${vendorID}`
                ? "font-extrabold"
                : "font-semibold"
            }`}
          >
            Home
          </span>
        </div>

        {/* divider */}
        <div className="h-10 border-l-2 border-pink-600 mx-2"></div>

        {/* Tab 2: My Coupons */}

        <div
          onClick={() => router.push(`/mycoupon`)}
          className={`relative flex flex-col pb-2 items-center p-1 px-3 gap-y-1 rounded-2xl`}
        >
          <div
            className={`w-14 h-8 rounded-full flex items-center justify-center ${
              currentPath === `/mycoupon` ? "bg-pink-600/20" : "bg-transparent"
            }`}
          >
            <Ticket
              strokeWidth={`${currentPath === `/mycoupon` ? 3 : 2}`}
              className={`w-6 h-6 text-pink-600`}
            />
          </div>
          <span
            className={`text-xs text-pink-600 leading-none text-center ${
              currentPath === `/mycoupon` ? "font-extrabold" : "font-semibold"
            }`}
          >
            My Coupons
          </span>
        </div>
      </div>
    </div>
  );
}
