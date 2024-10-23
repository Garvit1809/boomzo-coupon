import axios from "axios";

const baseURL = "http://localhost:8000/";

export const apiInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = async (name: string, phone: string) => {
  const response = await apiInstance.post("/api/v1/customer/signup", {
    name,
    phone,
  });
  return response;
};

export const getCustomerCoupons = async (phone: string) => {
  const response = await apiInstance.post(`/api/v1/customer/my-coupons`, {
    phone,
  });
  return response;
};

export const getCouponsbyScan = async (vendorId: string) => {
  const response = await apiInstance.get(
    `/api/v1/customer/vendors/${vendorId}/coupons`
  );
  return response;
};

export const getCouponDetails = async (vendorId: string, couponId: string) => {
  const response = await apiInstance.get(
    `/api/v1/customer/vendors/${vendorId}/coupons/${couponId}`
  );
  return response;
};

export const couponsAvailedReqest = async (
  customerID: string,
  couponID: string,
  issuerID: string,
  floaterID: string
) => {
  const response = await apiInstance.post(
    `/api/v1/customer/vendors/${issuerID}/issue`,
    {
      customerID,
      couponID,
      issuerID,
      floaterID,
    }
  );
  return response;
};

export const redeemCouponRequest = async (issuanceRequestID: string) => {
  const response = await apiInstance.post(
    `/api/v1/customer/redeem/${issuanceRequestID}`,
    {}
  );
  return response;
};

export const getIssuanceRequest = async (issuanceRequestID: string) => {
  const response = await apiInstance.get(
    `/api/v1/customer/issuance-request/${issuanceRequestID}`
  );
  return response;
};
