export interface Floater {
  _id: string;
  name: string;
  img: string;
  phone: string;
  address: string;
}

export interface Coupontype {
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

export interface Customer {
  name: string;
  phone: string;
  coupons: string[]; // Assuming coupons are an array of strings (IDs or codes)
  _id: string;
  createdAt: string; // Using string since it's an ISO date string
  updatedAt: string; // Using string since it's an ISO date string
}

export interface IssuanceRequest {
  couponID: string; // Reference to Coupon ID
  customerID: string; // Reference to Customer ID
  issuerID: string; // Reference to Issuer Vendor ID
  floaterID: string; // Reference to Floater Vendor ID
  isAccepted: boolean;
  issuedOn: Date;
  hasAskedRedemption: boolean;
  isRedeemed: boolean;
  redeemedOn: Date;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface Vendor {
  name: string;
  img: string;
  phone: string;
  address: string;
  category: VendorCategory;
  coupons: Coupontype[]; // Array of Coupon objects
  isDistributingCoupon: boolean;
  issuanceLimit: number;
  password: string; // For internal use only
  salt: string; // For internal use only
}

export enum VendorCategory {
  HotelRestaurant = "Hotel/Restaurant",
  Cafe = "Cafe",
  Tiles = "Tiles",
  GeneralStore = "General Store",
  ShoppingMall = "Shopping Mall",
  Medicine = "Medicine",
  HealthCheckupUnit = "Health Checkup Unit",
  Salon = "Salon",
  BeautyParlor = "Beauty Parlor",
  Gyms = "Gyms",
  AutomobileRepair = "Automobile Repair",
  ShoesStore = "Shoes Store",
  KidsClothesShoes = "Kids Clothes & Shoes",
  VideoPhotoShoot = "Video/Photo Shoot",
  GiftItemShop = "Gift Item Shop",
  SweetShop = "Sweet Shop",
  Furniture = "Furniture",
}
