
export interface CouponProps {
    coupon: {
        couponId: string;
        brandName: string;
        bgColor: string;
        offerText: string;
        Validity: string;
        CouponCount: string;
        ImgUrl: string;
    };
}

export const coupons = [ 
    {
        couponId: "1",
        brandName: "The Raymond shop",
        bgColor: "#f9c3c4",
        offerText: "₹10,000 off",
        Validity: "Valid on Bill Above ₹1 Lakh",
        CouponCount: "001",
        ImgUrl: "/logo.jpg",
    },
    {
        couponId: "2",
        brandName: "BREWBAKES COURTYARD",
        bgColor: "#f99fb4",
        offerText: "₹1000 off",
        Validity: "Valid on Bill Above ₹5000/-",
        CouponCount: "001",
        ImgUrl: "/brewbakes.png",
    },
    {
        couponId: "3",
        brandName: "CAFFEINE CAFE",
        bgColor: "#ffd483",
        offerText: "1 Coffee Free",
        Validity: "Valid on  MON / TUE / WED",
        CouponCount: "001",
        ImgUrl: "/caffeine.png",
    },
   
];


