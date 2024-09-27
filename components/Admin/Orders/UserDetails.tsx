import Image from 'next/image'
import React from 'react'
import { SquareArrowOutUpRight } from 'lucide-react';

const UserDetails = () => {
  return (

          <div className="bg-white w-full p-6 rounded-lg border border-gray-400  ">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Customer details</h2>
                    <SquareArrowOutUpRight className=" text-yellow-500"  />
              </div>
              <div className="flex flex-col items-center mb-4">
               <Image height={100} width={100} src="https://static.vecteezy.com/system/resources/previews/019/896/008/large_2x/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" alt="Customer profile picture" className="rounded-full w-24 h-24 mb-2" />
                  <h3 className="text-lg font-semibold">Gojo Satoru</h3>
                  <a href="mailto:gojosatoru@gmail.com" className="text-blue-600">
                      gojosatoru@gmail.com
                  </a>
                  <p className="text-gray-600">+91 01234 56789</p>
              </div>
              <hr className="my-4" />
              <div>
                  <h4 className="font-semibold">Shipping Address</h4>
                  <p>
                      Street no.1, vijaynagar
                      <br />
                      hyderabad, UP
                  </p>
                  <h4 className="font-semibold mt-2">Pincode</h4>
                  <p>012928</p>
              </div>
      </div>
  )
}

export default UserDetails