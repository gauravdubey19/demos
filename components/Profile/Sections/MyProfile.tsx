"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { State, City } from "country-state-city";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Button } from "@/components/ui/button";
import { BiSolidEditAlt } from "react-icons/bi";
import { Session } from "next-auth";
import { InputField } from "../ProfileComponents/InputFields";
import { Dropdown } from "../ProfileComponents/DropDown";
import {  IoCheckmarkOutline } from "react-icons/io5";
import VerifyDialog from "../ProfileComponents/VerifyDialog";
import { set } from "mongoose";

interface SessionExtended extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    phone_number?: string | null;
  };
}

interface User {
  firstName: string;
  lastName?: string;
  email: string;
  phone_number?: string;
  profile?: string;
  dateOfBirth?: Date;
  gender?: string;
  cart?: string[];
  orders?: string[];
  address?: string;
  city?: {
    name?: string;
    code?: string;
  };
  state?: {
    name?: string;
    code?: string;
  };
  zipCode?: string;
  country?: string;
}

const MyProfile = () => {
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
            localStorage.removeItem("jwt");
            signOut();
          }}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default MyProfile;

export const PersonalSection = () => {
  const { error, isProfileEditing, setProfileEditing, userData, setUserData } =
  useGlobalContext();
const { data: session } = useSession();
const [isPhoneVerified, setIsPhoneVerified] = useState(false);
const [isEmailVerified, setIsEmailVerified] = useState(false);
const [userDataCopy, setUserDataCopy] = useState<User | null>(userData ?? null);
const [saveDisabled, setSaveDisabled] = useState(false);
const [saving, setSaving] = useState(false);
const [isPhoneLogin, setIsPhoneLogin] = useState(false);
const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

useEffect(() => {
  const exSession = session as SessionExtended;
  if (exSession?.user?.phone_number) {
    setIsPhoneLogin(true);
  }
}, [session]);

useEffect(() => {
  if (!userDataCopy && userData) {
    console.log("userDataCopy is empty and userData is not empty");
    setUserDataCopy(userData);
  }
}, [userData, userDataCopy]);

useEffect(() => {
  const handleSaveDisabled = () => {
    console.log("Checking if save is disabled: ", saving, isPhoneLogin, userData?.phone_number, userDataCopy?.phone_number);
    if (saving) {
      setSaveDisabled(true);
      return;
    }
    if (!isPhoneLogin) {
      console.log("Phone number changed so need to verify");
      if (!userData?.phone_number) {
        setSaveDisabled(false);
        return;
      }
      if (userData?.phone_number !== userDataCopy?.phone_number && !isPhoneVerified) {
        setSaveDisabled(true);
        return;
      }
    }

    if (isPhoneLogin && userData?.email !== userDataCopy?.email && !isEmailVerified) {
      console.log("Email changed so need to verify");
      setSaveDisabled(true);
      return;
    }

    setSaveDisabled(false);
    return;
  };
  handleSaveDisabled();
}, [saving, isPhoneLogin, userData, userDataCopy, isPhoneVerified, isEmailVerified]);

useEffect(() => {
  setIsCancelDialogOpen(false);
}, [userData]);

const handleEditProfile = async () => {
  if (!userData) {
    return;
  }
  if (
    userData.phone_number &&
    userData.phone_number.length < 10 &&
    userData.phone_number.length > 0
  ) {
    alert("Phone number must be 10 digits");
    return;
  }
  const userDataObj = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone_number: userData.phone_number,
    gender: userData.gender,
    email: userData.email,
  };

  if (
    userData.firstName === userDataCopy?.firstName &&
    userData.lastName === userDataCopy?.lastName &&
    userData.phone_number === userDataCopy?.phone_number &&
    userData.gender === userData?.gender &&
    userData.email === userDataCopy?.email
  ) {
    setProfileEditing(false);
    return;
  }
  try {
    setSaving(true);
    const extendedSession = session as SessionExtended;
    console.log("userDataObj: ", userDataObj);
    const response = await fetch(`/api/users/${extendedSession.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDataObj),
    });

    if (response.ok) {
      setUserDataCopy(userData);
      setProfileEditing(false);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    alert(
      "An error occurred while updating user information. Please try again later."
    );
  } finally {
    setSaving(false);
    setSaveDisabled(false);
    setIsPhoneVerified(false);
    setIsEmailVerified(false);
  }
};

const handleInputChange = (field: keyof User, value: string) => {
  setUserData((prevData: any) => {
    if (!prevData) {
      return prevData; // Return the previous data if it's null
    }
    return {
      ...prevData,
      [field]: value,
    };
  });
};

const handleResetValues = () => {
  if (userDataCopy) {
    setUserData(userDataCopy);
    setProfileEditing(false);
    setSaveDisabled(false);
    setIsPhoneVerified(false);
    setIsEmailVerified(false);
  }
};

if (error) {
  return <div>Error: {error}</div>;
}

if (!userData) {
  return <div>Loading...</div>;
}

return (
  <section className="">
    {isCancelDialogOpen &&
      <VerifyDialog
        onClose={() => setIsCancelDialogOpen(false)}
        setIsPhoneVerified={setIsPhoneVerified}
        setIsEmailVerified={setIsEmailVerified}
        phoneNumberToVerify={userData?.phone_number}
        emailToVerify={userData?.email}
        verifyType={!isPhoneLogin ? "phone" : "email"}
        setIsCancelDialogOpen={setIsCancelDialogOpen}
      />
    }
    <div className="justify-between flex flex-row  items-center mb-6">
      <h3 className="text-xl font-semibold ">Personal Information</h3>
      {isProfileEditing ? (
        <div className="flex gap-x-2">
          <Button
            className="bg-white text-red-500 border border-red-500 rounded-none active:translate-y-0.5 hover:bg-red-500 hover:text-white
          disabled:opacity-80 disabled:cursor-not-allowed
          "
            onClick={handleResetValues}
          >
            Cancel
          </Button>
          <Button
            className="bg-primary text-white border border-primary rounded-none active:translate-y-0.5 hover:bg-transparent hover:text-primary
          disabled:opacity-70 disabled:cursor-not-allowed
          "
            onClick={handleEditProfile}
            disabled={saveDisabled}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      ) : (
        <Button
          className="bg-transparent text-primary rounded-none active:translate-y-0.5  hover:bg-yellow-500 hover:text-white"
          onClick={() => setProfileEditing(true)}
        >
          <BiSolidEditAlt size={24} />
        </Button>
      )}
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <InputField
        id="firstName"
        label="First Name"
        value={userData?.firstName}
        isDisabled={!isProfileEditing}
        capitalize
        setValue={(value) => {
          const noSpacesValue = value.replace(/\s+/g, "");
          handleInputChange("firstName", noSpacesValue);
        }}
      />
      <InputField
        id="lastName"
        label="Last Name"
        value={userData?.lastName}
        isDisabled={!isProfileEditing}
        capitalize
        setValue={(value) => handleInputChange("lastName", value)}
      />
      <div className="flex flex-row gap-2 items-end justify-end">
        <InputField
          id="email"
          label="Email"
          type="email"
          isDisabled={!isPhoneLogin ? true : !isProfileEditing}
          value={userData?.email}
          setValue={(value) => handleInputChange("email", value)}
        />
        <Button
          disabled={(!userData?.email || isEmailVerified) || (!isProfileEditing || userData?.email === userDataCopy?.email || !isPhoneLogin)}
          className={`hover:opacity-70 ${(!isProfileEditing || userData?.email === userDataCopy?.email || !isPhoneLogin) && "hidden"} ${isEmailVerified && "bg-green cursor-not-allowed px-3"}`}
          onClick={() => setIsCancelDialogOpen(true)}
        >
          {isEmailVerified ? <IoCheckmarkOutline color="#fff" size={22} /> : "Verify"}
        </Button>
      </div>
      <div className="flex flex-row gap-2 items-end justify-end">
        <InputField
          id="phone"
          label="Phone"
          type="tel"
          value={userData?.phone_number}
          isDisabled={isPhoneLogin ? true : !isProfileEditing}
          setValue={(value) => {
            let numericValue = value.replace(/[^0-9]/g, "");
            if (numericValue.length > 10) {
              numericValue = numericValue.slice(0, 10);
            }

            handleInputChange("phone_number", numericValue);
          }}
        />
        <Button
          disabled={(!userData?.phone_number || userData?.phone_number?.length !== 10) || (isPhoneLogin ? isEmailVerified : isPhoneVerified)}
          className={`hover:opacity-70 ${(!isProfileEditing || userData?.phone_number === userDataCopy?.phone_number || isPhoneLogin) && "hidden"} ${isPhoneVerified && "bg-green cursor-not-allowed px-3"}`}
          onClick={() => setIsCancelDialogOpen(true)}
        >
          {isPhoneVerified ? <IoCheckmarkOutline color="#fff" size={22} /> : "Verify"}
        </Button>
      </div>
      <Dropdown
        id="gender"
        label="Gender"
        value={userData?.gender}
        options={["male", "female", "other"]}
        isDisabled={!isProfileEditing}
        setValue={(value) => {
          handleInputChange("gender", value);
        }}
      />
    </div>
  </section>
);
};

export const ContactSection = () => {
  const { userData, error, isContactEditing, setContactEditing, setUserData } =
    useGlobalContext();
  const [userDataCopy, setUserDataCopy] = useState<User | null>(
    userData ?? null
  );
  useEffect(() => {
    if (!userDataCopy && userData) {
      console.log("userDataCopy is empty and userData is not empty");
      setUserDataCopy(userData);
    }
  }, [userData, userDataCopy]);
  const [saving, setSaving] = useState(false);
  const { data: session } = useSession();
  const [states, setStates] = useState<{ name: string; code: string }[]>([]);
  const [cities, setCities] = useState<{ name: string; code: string }[]>([]);
  useEffect(() => {
    // Fetch all cities of India
    const indianStates = State.getStatesOfCountry("IN");
    if (indianStates) {
      const stateNames = indianStates.map((state) => {
        return {
          name: state.name,
          code: state.isoCode,
        };
      });
      setStates([
        {
          name: "Select a state",
          code: "",
        },
        ...stateNames,
      ]);
    } else {
      console.error("No cities found for the given country code.");
    }
  }, []);

  useEffect(() => {
    if (!userData) {
      return;
    }
    if (!userData.state) {
      setUserData({
        ...userData,
        state: {
          name: "Select a state",
          code: "",
        },
      });
      return;
    }
    if (userData.state.code) {
      const cities = City.getCitiesOfState("IN", userData.state.code);
      if (cities) {
        const cityNames = cities.map((city) => {
          return {
            name: city.name,
            code: city.stateCode,
          };
        });
        setCities([
          {
            name: "Select a city",
            code: "",
          },
          ...cityNames,
        ]);
      } else {
        console.error("No cities found for the given state code.");
        setCities([
          {
            name: "Select a city",
            code: "",
          },
        ]);
      }
    } else {
      setCities([
        {
          name: "Select a city",
          code: "",
        },
      ]);
    }
  }, [setUserData, userData]);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleEditContact = async () => {
    if (!userData) {
      return;
    }
    const contactObj = {
      address: userData.address,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      country: userData.country,
    };
    if (
      userData.address === userDataCopy?.address &&
      userData.city === userDataCopy?.city &&
      userData.state === userDataCopy?.state &&
      userData.zipCode === userDataCopy?.zipCode
    ) {
      // alert("No changes made to the contact information");
      setContactEditing(false);
      return;
    }
    try {
      setSaving(true);

      const extendedSession = session as SessionExtended;
      const response = await fetch(
        `/api/contact/${extendedSession.user.id}/PutContact`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactObj),
        }
      );

      if (response.ok) {
        setUserDataCopy(userData);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      alert(
        "An error occurred while updating contact information. Please try again later."
      );
    } finally {
      setContactEditing(false);
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof User, value: any) => {
    setUserData((prevData: any) => {
      if (!prevData) {
        return prevData;
      }
      return {
        ...prevData,
        [field]: value,
      };
    });
  };
  const handleResetValues = () => {
    if (userDataCopy) {
      setUserData(userDataCopy);
    }
  };
  return (
    <section className="">
      <div className="justify-between flex flex-row items-center mb-6">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        {isContactEditing ? (
          <div className="flex gap-x-2">
            <Button
              className="bg-white text-red-500 border border-red-500 rounded-none active:translate-y-0.5 hover:bg-red-500 hover:text-white
            disabled:opacity-80 disabled:cursor-not-allowed
            "
              onClick={handleResetValues}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-white border border-primary rounded-none active:translate-y-0.5 hover:bg-transparent hover:text-primary
            disabled:opacity-80 disabled:cursor-not-allowed
            "
              onClick={handleEditContact}
              disabled={saving }
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        ) : (
          <Button
            className="bg-transparent text-primary rounded-none active:translate-y-0.5 hover:bg-yellow-500 hover:text-white"
            onClick={() => setContactEditing(true)}
          >
            <BiSolidEditAlt size={24} />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <InputField
          id="address"
          label="Address 1"
          value={userData?.address}
          isDisabled={!isContactEditing}
          setValue={(value) => handleInputChange("address", value)}
        />

        <Dropdown
          id="state"
          label="State"
          value={userData?.state?.name}
          options={states.map((state) => state.name)}
          isDisabled={!isContactEditing}
          setValue={(value) => {
            const selectedState = states.find((state) => state.name === value);
            if (selectedState) {
              handleInputChange("state", selectedState);
            }
          }}
        />
        <Dropdown
          id="city"
          label="City"
          value={userData?.city?.name}
          options={cities.map((city) => city.name)}
          isDisabled={!isContactEditing}
          setValue={(value) => {
            const selectedCity = cities.find((city) => city.name === value);
            if (selectedCity) {
              handleInputChange("city", selectedCity);
            }
          }}
        />
        <InputField
          id="zip"
          label="Zip"
          value={userData?.zipCode}
          isDisabled={!isContactEditing}
          setValue={(value) => {
            let numericValue = value.replace(/[^0-9]/g, "");
            if (numericValue.length > 6) {
              numericValue = numericValue.slice(0, 6);
            }
            handleInputChange("zipCode", numericValue);
          }}
        />
      </div>
    </section>
  );
};
