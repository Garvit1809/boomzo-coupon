export interface Coupon {
  floaterID: string; // Vendor ID
  category: VendorCategory;
  offerTitle: string;
  validityCriteria: string;
  issuedTo: string[]; // Array of IssuanceRequest IDs
  isCouponActive: boolean;
  impressions: number;
  clicks: number;
}

export interface Customer {
  name: string;
  phone: string;
  coupons: string[]; // Array of IssuanceRequest IDs
}

export interface IssuanceRequest {
  couponID: string; // Reference to Coupon ID
  customerID: string; // Reference to Customer ID
  issuerID: string; // Reference to Issuer Vendor ID
  floaterID: string; // Reference to Floater Vendor ID
  isAccepted: boolean;
  issuedOn: Date;
  isRedeemed: boolean;
  redeemedOn: Date;
}

export interface Vendor {
  name: string;
  img: string;
  phone: string;
  address: string;
  category: VendorCategory;
  coupons: Coupon[]; // Array of Coupon objects
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
