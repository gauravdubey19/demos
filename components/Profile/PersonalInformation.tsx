"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { InputFieldProps } from "@/lib/types";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useGlobalContext } from "@/context/GlobalProvider";
import { BiSolidEditAlt } from "react-icons/bi";

interface SessionExtended extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface User {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  profile?: string;
  dateOfBirth?: Date;
  gender?: string;
  cart?: string[];
  orders?: string[];
}
interface DropdownProps {
  id: string;
  label: string;
  value: string | undefined;
  options: string[];
  isDisabled: boolean;
  setValue: (value: string) => void;
}
const PersonalInformation = () => {
  const {data:session} = useSession();
  const handleDeleteAccount = async () => {
    if (!session) {
      alert("You need to be logged in to delete your account.");
      return;
    }

    const extendedSession = session as SessionExtended;
    const userId = extendedSession.user.id;

    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (!confirmDelete) {
      return;
    }

      try {
      const response = await fetch(`/api/users/${extendedSession.user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
        signOut();
        alert('Account deleted successfully.');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while deleting your account. Please try again later.');
    }
  };

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
          }}
        >
          Logout
        </Button>
        <Button
          variant="destructive"
          className="font-bold text-sm md:text-base rounded-none active:translate-y-0.5 hover:bg-red-600 "
          onClick={handleDeleteAccount}
        >
          Delete your Account
        </Button>
      </div>
    </>
  );
};

export default PersonalInformation;

const PersonalSection = () => {
  const {error,isProfileEditing,setProfileEditing,userData, setUserData} = useGlobalContext();
  const {data:session} = useSession();
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleEditProfile = async () => {
    if (!userData) {
      return;
    }
    if(userData.phone && userData.phone.length < 10 && userData.phone.length > 0){
      alert('Phone number must be 10 digits');
      return;
    }
    if(!userData.firstName){
      alert('First Name is required');
      return;
    }
    if(!userData.lastName){
      alert('Last Name is required');
      return;
    }

    const extendedSession = session as SessionExtended;
    const response = await fetch(`/api/users/${extendedSession.user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
 
    if (response.ok) {
      console.log('userData:', userData);
      
      alert('Profile updated successfully.');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
    setProfileEditing(false);
  };
   const handleInputChange = (field: keyof User, value: string) => {
    setUserData((prevData: User | null) => {
      if (!prevData) {
        return prevData; // Return the previous data if it's null
      }
      return {
        ...prevData,
        [field]: value,
      };
    });
  };
 return (
  <section className="">
    <div className="justify-between flex flex-row  items-center mb-6">
    <h3 className="text-xl font-semibold ">Personal Information</h3>
    { isProfileEditing ? (
            <Button className="bg-primary text-white border border-primary rounded-none active:translate-y-0.5 hover:bg-transparent hover:text-primary"
              onClick={handleEditProfile}
            >
              Save
            </Button>
          ) :
          <Button className="bg-transparent text-primary rounded-none active:translate-y-0.5  hover:bg-yellow-500 hover:text-white"
          onClick={() => setProfileEditing(true)}
          >
            <BiSolidEditAlt size={24} />
          </Button>
        }
        </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <InputField
          id="firstName"
          label="First Name"
          value={userData?.firstName}
          isDisabled={!isProfileEditing}
          capitalize
          setValue={(value) => {
            const noSpacesValue = value.replace(/\s+/g, '');
            handleInputChange('firstName', noSpacesValue);
          }}
        />
        <InputField
          id="lastName"
          label="Last Name"
          value={userData?.lastName}
          isDisabled={!isProfileEditing}
          capitalize
          setValue={(value) => handleInputChange('lastName', value)}
        />
        <InputField
          id="email"
          label="Email"
          type="email"
          isDisabled
          value={userData?.email}
        />
        <InputField
          id="phone"
          label="Phone"
          type="tel"
          value={userData?.phone}
          isDisabled={!isProfileEditing}
          setValue={(value) => {
            let numericValue = value.replace(/[^0-9]/g, '');
            if (numericValue.length > 10) {
              numericValue = numericValue.slice(0, 10);
            }
            
            handleInputChange('phone', numericValue);
          }}
        />
        <Dropdown
          id="gender"
          label="Gender"
          value={userData?.gender}
          options={['male', 'female', 'other']}
          isDisabled={!isProfileEditing}
          setValue={(value) => {
            handleInputChange('gender', value);
          }}
        />
    </div>
  </section>
)}

const ContactSection = () => {
  const {user,error,isContactEditing, setContactEditing} = useGlobalContext();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
  <section className="">
    <div className="justify-between flex flex-row  items-center mb-6">
    <h3 className="text-xl font-semibold ">Contact Information</h3>
    { isContactEditing ? (
            <Button className="bg-primary text-white border border-primary rounded-none active:translate-y-0.5 hover:bg-transparent hover:text-primary"
              onClick={() => setContactEditing(false)}
            >
              Save
            </Button>
          ) :
          <Button className="bg-transparent text-primary rounded-none active:translate-y-0.5  hover:bg-yellow-500 hover:text-white"
          onClick={() => setContactEditing(true)}
          >
            <BiSolidEditAlt size={24} />
          </Button>
        }
        </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <InputField isDisabled={!isContactEditing}  id="address1" label="Address 1" />
      <InputField isDisabled={!isContactEditing}  id="address2" label="Address 2" />
      <InputField isDisabled={!isContactEditing}  id="city" label="City" />
      <InputField isDisabled={!isContactEditing}  id="state" label="State" />
      <InputField isDisabled={!isContactEditing}  id="zip" label="Zip" />
      <InputField isDisabled={!isContactEditing}  id="country" label="Country" />
    </div>
  </section>
)}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  defaultValue,
  type = "text",
  isDisabled = false,
  capitalize = false,
  value,
  setValue,
  formValidation,
}) => (
  <input
    id={id}
    type={type}
    disabled={isDisabled}
    placeholder={label}
    defaultValue={defaultValue}
    value={value}
    onChange={
      setValue ? (e) => {
        let newValue = e.target.value;
        setValue(newValue);
      } : () => {}
    }
    className={`text-md p-2 px-4 bg-transparent border-b hover:border-b-primary focus:border-b-primary outline-none ${isDisabled ? "text-gray-600": "text-black border-b-primary"}  ${capitalize ? "capitalize" : ""}`}
  />
);

const Dropdown: React.FC<DropdownProps> = ({ id, label, value, options, isDisabled, setValue }) => {
  return (
    <div className="dropdown">
      <select
        id={id}
        value={value}
        disabled={isDisabled}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-3 text-base focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};