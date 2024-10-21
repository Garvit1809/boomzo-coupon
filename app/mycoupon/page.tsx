"use client";
import React, { useState } from 'react';
import Coupon from '@/components/ui/Coupon';
import { getCustomerCoupons, signUp } from '@/lib/api';
import { useQuery } from 'react-query';
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Coupontype } from '@/types/app';
import { toast } from 'sonner';

const colors = ['#CDFF83', '#FFD483', '#F99FB4', '#F9C3C4', '#82c6d1', '#9cabdf'];

export default function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const userString = localStorage.getItem('validatedUser');
  const user = userString ? JSON.parse(userString) : null;
  

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex]
  };

  const getCoupons = async () => {
    try {
      const response = await getCustomerCoupons(user.phone);
      return response;
    } catch (error) {
      console.error("Error fetching coupons:", error);
      throw new Error('Failed to fetch coupons.');
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['GetCustomerCoupons'],
    queryFn: getCoupons,
    enabled: !!user, 
  });
 

  const handleSignUp = async () => {
    if (!name || !phone || phone.length !== 10) {
      setSignUpError('Please enter a valid name and 10-digit phone number.');
      return;
    }
    setIsSigningUp(true);
    setSignUpError('');

    try {
      const response = await signUp(name, phone);
      const fetchedUser = response.data;
      localStorage.setItem('validatedUser', JSON.stringify(fetchedUser));
      toast.success("Login Successful");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Sign-up error:", error);
      setSignUpError('Sign-up failed. Please try again later.');
    } finally {
      setIsSigningUp(false);
    }
  };

 
  if (!user) {
    return (
      <div>
        <h1 className='text-lg text-center my-4'>You dont have any coupon requests.</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="mx-auto block font-semibold">
          Sign Up to Get Coupons
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className='flex flex-col items-center rounded-lg'>
            <DialogTitle>Sign Up / Login</DialogTitle>
            <div className="flex flex-col gap-4 justify-center">
            <Input
                  type="text"
                  placeholder="Enter Your Name"
                  className='bg-gray-200 my-1 rounded-2xl text-center py-4 w-full'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Enter Your 10 Digit Phone Number"
                  className='bg-gray-200 my-1 rounded-2xl px-2 text-center py-4 w-full'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              {signUpError && <p className="text-red-500">{signUpError}</p>}
            </div>
            <DialogFooter>
              <Button onClick={handleSignUp} disabled={isSigningUp} className={`my-2 bg-[#a2225a] py-4 flex gap-x-2 rounded-2xl text-lg font-bold`}>
                {isSigningUp ? 'loging...' : 'Login'} 
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className={`text-3xl font-bold text-center `}>My Coupons </h1>
        <h1 className={` font-bold text-center pb-4 `}>Name : {data?.customer?.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
        {isLoading ? (
          <p className="text-center">Loading coupons...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load coupons. Please try again later.</p>
        ) : data ? (
          data?.customer?.coupons.map((coupon:Coupontype, index :number) => (
            <div className="flex justify-center " key={index}>
              <Coupon
                brandName={coupon?.floaterID?.name || 'Unknown Brand'}
                bgColor={getRandomColor()}
                offerText={coupon.offerTitle || 'No Offer'}
                Validity={coupon.validityCriteria || 'No Expiry'}
                CouponCount={`#${index}` || 'No Count'}
                ImgUrl={coupon?.floaterID?.img || '/logo.jpg'}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No coupons available.</p>
        )}
      </div>
    </div>
  );
}
