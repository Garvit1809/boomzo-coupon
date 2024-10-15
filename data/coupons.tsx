
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
        offerText: "100% off",
        Validity: "Valid till 31st Dec",
        CouponCount: "001",
        ImgUrl: "/logo.jpg",
    },
    {
        couponId: "2",
        brandName: "The Raymond shop",
        bgColor: "#f99fb4",
        offerText: "100% off",
        Validity: "Valid till 31st Dec",
        CouponCount: "001",
        ImgUrl: "/logo.jpg",
    },
    {
        couponId: "3",
        brandName: "The Raymond shop",
        bgColor: "#ffd483",
        offerText: "100% off",
        Validity: "Valid till 31st Dec",
        CouponCount: "001",
        ImgUrl: "/logo.jpg",
    },
   
];


