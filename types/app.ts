import { Document } from 'mongoose';

export interface CustomerDoc extends Document {
  name: string;
  phone: string;
  couponsRedeemed: [RedemptionRequestDoc["_id"]];
  couponsAvailable: [IssuanceRequestDoc["_id"]];
}

export interface CouponDoc extends Document {
  floaterID: VendorDoc["_id"];
  offerTitle: string;
  validityCriteria: string;
  issuedTo: [IssuanceRequestDoc["_id"]];
  redeemedBy: [RedemptionRequestDoc["_id"]];
  isCouponActive: boolean;
  category: VendorCategory;
}

export interface IssuanceRequestDoc extends Document {
  couponID: CouponDoc["_id"]; // Reference to Coupon
  customerID: CustomerDoc["_id"]; // Reference to Customer
  issuerID: VendorDoc["_id"]; // Reference to Issuer Vendor
  floaterID: VendorDoc["_id"]; // Reference to Floater Vendor
  isAccepted: boolean;
  issuedOn: Date;
}

export interface RedemptionRequestDoc extends Document {
  couponID: CouponDoc["_id"]; // Reference to Coupon
  customerID: CustomerDoc["_id"]; // Reference to Customer
  issuerID: VendorDoc["_id"]; // Reference to Issuer Vendor
  floaterID: VendorDoc["_id"]; // Reference to Floater Vendor
  isAccepted: boolean;
  redeemedOn: Date;
}

export interface VendorDoc extends Document {
  name: string;
  img: string;
  phone: string;
  address: string;
  category: VendorCategory;
  coupons: [CouponDoc];
  isDistributingCoupon: boolean;
  issuanceLimit: number;
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
