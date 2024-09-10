"use client";

import React from "react";
import { Button } from "../ui/button";
import { InputFieldProps } from "@/lib/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const PersonalInformation = () => {
  const router = useRouter();
  return (
    <>
      <section className="flex-1 p-2 md:p-4 bg-gray-50 space-y-6">
        <PersonalSection />
        <ContactSection />
      </section>
      <div className="flex flex-row justify-end p-2 md:p-4 gap-x-2">
        <Button
          className="font-bold text-sm md:text-base active:translate-y-0.5 border-red-500 text-red-500 bg-white border-1 border rounded-none hover:bg-red-600 hover:text-white"
          onClick={() => {
            signOut();
            router.replace("/");
          }}
        >
          Logout
        </Button>
        <Button
          variant="destructive"
          className="font-bold text-sm md:text-base rounded-none active:translate-y-0.5 hover:bg-red-600 "
        >
          Delete your Account
        </Button>
      </div>
    </>
  );
};

export default PersonalInformation;

const PersonalSection = () => (
  <section className="">
    <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <InputField id="firstName" label="First Name" />
      <InputField id="lastName" label="Last Name" />
      <InputField id="email" label="Email" type="email" />
      <InputField id="phone" label="Phone" type="tel" />
    </div>
  </section>
);

const ContactSection = () => (
  <section className="">
    <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <InputField id="address1" label="Address 1" />
      <InputField id="address2" label="Address 2" />
      <InputField id="city" label="City" />
      <InputField id="state" label="State" />
      <InputField id="zip" label="Zip" />
      <InputField id="country" label="Country" />
    </div>
  </section>
);

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  defaultValue,
  type = "text",
}) => (
  <input
    id={id}
    type={type}
    placeholder={label}
    defaultValue={defaultValue}
    className="text-md p-2 px-4 bg-transparent border-b hover:border-b-primary focus:border-b-primary outline-none"
  />
);
