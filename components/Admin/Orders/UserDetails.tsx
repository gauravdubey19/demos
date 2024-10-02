import Image from 'next/image'
import React from 'react'
import { SquareArrowOutUpRight } from 'lucide-react';
import { UserDataAddress, UserDataAdmin } from '@/context/GlobalProvider';

interface UserDetailsProps {
    userData: UserDataAdmin;
    address: UserDataAddress;
  }
  
  const UserDetails = ({ userData, address }: UserDetailsProps) => {
  return (

          <div className="bg-white w-full p-6 rounded-lg border border-gray-400  ">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Customer details</h2>
                    <SquareArrowOutUpRight className=" text-yellow-500"  />
              </div>
              <div className="flex flex-col items-center mb-4">
               <Image height={100} width={100} src={userData?.profile??"https://static.vecteezy.com/system/resources/previews/019/896/008/large_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"} alt="Customer profile picture" className="rounded-full w-24 h-24 mb-2" />
                  <h3 className="text-lg font-semibold">
                        {userData.firstName?? "User"} {userData.lastName ?? "Name"}
                  </h3>
                  <a href="mailto:gojosatoru@gmail.com" className="text-blue-600">
                        {userData.email ??"No email"}
                  </a>
                  <p className="text-gray-600">{userData.phone_number ? "+91 " + userData.phone_number : "No phone number"}</p>
              </div>
              <hr className="my-4" />
              <div>
                  <h4 className="font-semibold">Shipping Address</h4>
                  <p>
                      {address.shippingAddress ?? "No address"}
                  </p>
                  <h4 className="font-semibold mt-2">Pincode</h4>
                  <p>{
                        address.zipCode ?? "No pincode"
                    }</p>
              </div>
      </div>
  )
}

export default UserDetails